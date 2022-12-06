import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CForm,
    CFormInput,
    CFormSelect,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCardFooter,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pagination } from 'src/context/Pagination'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'
export default function EgovNoticeList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [resultList, setResultList] = useState([]); //공지사항 목록
    const [paginationInfo, setPaginationInfo] = useState({}); //페이징
    const [searchCondition, setSearchCondition] = useState(
        location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' }
    ); //검색
    const [pageButton, setPageButton] = useState(); //페이징 버튼

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 
    let timeString = hours + ':' + minutes + ':' + seconds;
    let dateString = year + '-' + month + '-' + day;
    console.log(dateString);
    console.log(timeString);

    const checkDate = (check) => {
        if (day === check.slice(-2)) {
            return '[NEW]';
        }
    }

    const retrieveList = async (searchCondition) => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/olh/ntc/selectNoticeList.do', {
                params: {
                    pageIndex: searchCondition.pageIndex,
                    searchWrd: searchCondition.searchWrd
                }
            })
            console.log(res);
            setPaginationInfo(res.data.result.paginationInfo);
            let resultListTag = [];

            let resultCnt = res.data.result.paginationInfo.totalRecordCount * 1;
            let currentPageNo = res.data.result.paginationInfo.currentPageNo;
            let pageSize = res.data.result.paginationInfo.pageSize;

            // 리스트 항목 구성
            res.data.result.resultList.forEach(function (item, index) {
                if (index === 0) resultListTag = []; // 목록 초기화
                let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                resultListTag.push(
                    <CTableRow key={listIdx} onClick={() => navigate('/community_manager/notice_manager/EgovNoticeDetail', { state: { ntcId: item.ntcId } })}>
                        <CTableDataCell>{item.topAt === '1' ? '공지' : listIdx}</CTableDataCell>
                        <CTableDataCell>{checkDate(item.frstRegisterPnttm)}{item.ntcSj}</CTableDataCell>
                        <CTableDataCell>{item.ntcNm}</CTableDataCell>
                        <CTableDataCell>{item.frstRegisterPnttm}</CTableDataCell>
                        <CTableDataCell>{item.atchFileId !== null ? 'O' : ''}</CTableDataCell>
                        <CTableDataCell>{item.inqireCo}</CTableDataCell>
                    </CTableRow>
                );
            });
            setResultList(resultListTag);
            setPageButton(
                Pagination(res.data.result.paginationInfo, searchCondition, setSearchCondition, retrieveList)
            )
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, []);
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>공지사항 목록</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3 d-flex justify-content-end">
                            <CCol md={2}>
                                <CFormSelect /* onChange={(e) => setSearchVO({ ...searchVO, searchCondition: e.target.value })} */>
                                    {/* <option value="">선택하세요</option> */}
                                    <option value="1">제목</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={5}>
                                <CFormInput name="searchWrd" type="text" size="sm"
                                    onChange={(e) => setSearchCondition({
                                        ...searchCondition, searchWrd: e.target.value
                                    })}
                                    maxLength="255" />
                            </CCol>
                            <CCol md={1}>
                                <CFormInput type="button"
                                    value="조회"
                                    onClick={() => retrieveList(searchCondition)}
                                />
                            </CCol>
                            <CCol md={1}>
                                <CFormInput type="button"
                                    value="등록"
                                    onClick={() => navigate('/community_manager/notice_manager/EgovNoticeInsert')}
                                />
                            </CCol>
                        </CForm>
                        <DocsExample >
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">작성자</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">등록일자</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">첨부</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">조회수</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {resultList}
                                </CTableBody>
                            </CTable>
                        </DocsExample>
                    </CCardBody>
                    <CCardFooter>
                        {pageButton}
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}
