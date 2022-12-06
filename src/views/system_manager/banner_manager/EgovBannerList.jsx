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
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from 'src/context/Pagination';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

export default function EgovBannerList() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bannerList, setBannerList] = useState([]); //배너목록
    const [paginationInfo, setPaginationInfo] = useState({}); //페이징
    const [searchCondition, setSearchCondition] = useState(
        location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchKeyword: '' }
    ); //검색
    const [pageButton, setPageButton] = useState();
    

    const retrieveList = async (searchCondition) => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/ion/bnr/selectBannerListAPI.do', {
                params: {
                    pageIndex: searchCondition.pageIndex,
                    searchKeyword: searchCondition.searchKeyword
                }
            })

            setPaginationInfo(res.data.result.paginationInfo);
            let bannerListTag = [];

            let resultCnt = res.data.result.paginationInfo.totalRecordCount * 1;
            let currentPageNo = res.data.result.paginationInfo.currentPageNo;
            let pageSize = res.data.result.paginationInfo.pageSize;

            // 리스트 항목 구성
            res.data.result.bannerList.forEach(function (item, index) {
                if (index === 0) bannerListTag = []; // 목록 초기화
                let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                bannerListTag.push(
                    <CTableRow key={listIdx} onClick={() => navigate('/system_manager/banner_manager/EgovBannerDetail', { state: { bannerId: item.bannerId } })}>
                        <CTableDataCell>{item.bannerNm}</CTableDataCell>
                        <CTableDataCell>{item.linkUrl}</CTableDataCell>
                        <CTableDataCell>{item.bannerDc}</CTableDataCell>
                        <CTableDataCell>{item.reflctAt}</CTableDataCell>
                    </CTableRow>
                );
            });
            setBannerList(bannerListTag);
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
                        <strong>배너 관리</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3 d-flex justify-content-end">
                            <CCol md={5}>
                                <CInputGroup>
                                    <CInputGroupText>배너명</CInputGroupText>
                                    <CFormInput name="searchKeyword" type="text" size="sm"
                                        onChange={(e) => setSearchCondition({
                                            ...searchCondition, searchKeyword: e.target.value
                                        })}
                                        maxLength="255" />
                                </CInputGroup>
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
                                    onClick={() => navigate('/system_manager/banner_manager/EgovBannerInsert')}
                                />
                            </CCol>
                        </CForm>
                        <DocsExample >
                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">배너명</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">링크 URL</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">배너 설명</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">반영여부</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {bannerList}
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
