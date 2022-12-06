import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CTable,
    CTableBody,
    CTableCaption,
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

export default function EgovDataList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]); //배너목록
    const [paginationInfo, setPaginationInfo] = useState({}); //페이징
    const [searchCondition, setSearchCondition] = useState(
        location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' }
    ); //검색
    const [pageButton, setPageButton] = useState();


    const retrieveList = async (searchCondition) => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/olh/dat/selectDataListAPI.do', {
                params: {
                    pageIndex: searchCondition.pageIndex,
                    searchWrd: searchCondition.searchWrd
                }
            })
            console.log(res);
            setPaginationInfo(res.data.result.paginationInfo);
            let dataListTag = [];

            let resultCnt = res.data.result.paginationInfo.totalRecordCount * 1;
            let currentPageNo = res.data.result.paginationInfo.currentPageNo;
            let pageSize = res.data.result.paginationInfo.pageSize;

            // 리스트 항목 구성
            res.data.result.resultList.forEach(function (item, index) {
                if (index === 0) dataListTag = []; // 목록 초기화
                let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                dataListTag.push(
                    <CTableRow key={listIdx} onClick={() => navigate('/community_manager/data_manager/EgovDataDetail', { state: { dataId: item.dataId } })}>
                        <CTableDataCell>{listIdx}</CTableDataCell>
                        <CTableDataCell>{item.qestnSj}</CTableDataCell>
                        <CTableDataCell>{item.frstRegisterPnttm}</CTableDataCell>
                        <CTableDataCell>{item.atchFileId!==null ? 'O':'X'}</CTableDataCell>
                        <CTableDataCell>{item.inqireCo}</CTableDataCell>
                    </CTableRow>
                );
            });
            setDataList(dataListTag);
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
                        <strong>자료실 목록</strong>
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
                                    onClick={() => navigate('/community_manager/data_manager/EgovDataInsert')}
                                />
                            </CCol>
                        </CForm>
                        <DocsExample >
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">등록일자</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">첨부</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">조회수</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {dataList}
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
