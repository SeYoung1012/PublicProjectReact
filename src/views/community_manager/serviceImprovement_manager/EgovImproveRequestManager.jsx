import React from 'react'
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
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'src/context/egovFetch';
import {Pagination} from 'src/context/Pagination'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function EgovImproveRequestManager () {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]); //개선요청 목록
    const [paginationInfo, setPaginationInfo] = useState({}); //페이징
    const [searchCondition, setSearchCondition] = useState(
        location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' }
    ); //검색

    const [pageButton, setPageButton] = useState();
    
    const retrieveList = async (searchCondition) => {
        try {
            const res = await axios.get(SERVER_URL+'/mp/cst/irm/SelectImproveRequestList.do', {
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
                    <CTableRow key={listIdx} onClick={() => navigate('/community_manager/serviceImprovement_manager/EgovImproveRequestManagerDetail', { state: { srvcId: item.srvcId } })}>
                        <CTableDataCell>{listIdx}</CTableDataCell>
                        <CTableDataCell>{item.srvcTtl}</CTableDataCell>
                        <CTableDataCell>{item.wrtNm}</CTableDataCell>
                        <CTableDataCell>{item.wrtYmd}</CTableDataCell>
                        <CTableDataCell>{item.dmndPrcsSttsCd}</CTableDataCell>
                    </CTableRow>
                );
            });
            setDataList(dataListTag);
            setPageButton(
                Pagination(res.data.result.paginationInfo, searchCondition, retrieveList),
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

    return(
        <CRow>
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>서비스 개선요청</strong>
                </CCardHeader>
                <CCardBody>
                    
                    <CForm className="row g-3 d-flex justify-content-end">
                    <CFormSelect onChange={(e)=>setSearchCondition({...searchCondition,searchCnd:e.target.value})}>
                        <option value="0">전체</option>
                        <option value="1">제목</option>
                        <option value="2">내용</option>
                        </CFormSelect>
            <CCol md={5}>
            <CFormInput  name="searchWrd" type="text" size="35" 
                    value={searchCondition && searchCondition.searchWrd}
                    onChange={(e)=>setSearchCondition({...searchCondition,searchWrd:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(searchCondition)}/>
            </CCol>
                        <CCol md={1}>
                            <CFormInput type="button"
                                value="등록"
                                onClick={() => navigate('/community_manager/serviceImprovement_manager/EgovImproveRequestManagerRegist')}
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
                                    <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">답변여부</CTableHeaderCell>
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
export default EgovImproveRequestManager