import React from 'react'
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
  CCardFooter,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as EgovNet from 'src/context/egovFetch'
import { COM013 } from 'src/context/CmmCodeDetail'
import { Pagination } from 'src/context/Pagination'
import axios from 'axios'

function EgovSysLogList() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchVO, setSearchVO] = useState(
    location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchWrd: '' }
  ) //기존 조회에서 접근 했을 시 || 신규로 접근 했을 시

  const [logs, setLogs] = useState({})
  const [resultList, setResultList] = useState();

  const [pageButton, setPageButton] = useState();

  const retrieveList = (searchVO) => {

    const url = '/sym/log/lgm/SelectSysLogList.do'
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(searchVO)
    }

    EgovNet.requestFetch(
      url,
      options,
      (resp) => {
        setLogs(resp.result.resultList);
        console.log(resp.result.resultList);
        console.log(resp.result.paginationInfo.currentPageNo);

        let mutLogList = []
        let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;
        resp.result.resultList.forEach(function (item, index) {
          if (index === 0) mutLogList = [] // 목록 초기화

          let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

          mutLogList.push(
            <CTableRow onClick={(() => navigate(''), { state: { requestId: item.requestId, searchCnd: searchCnd } })}>
              <CTableHeaderCell scope="row">
                {listIdx}
              </CTableHeaderCell>
              <CTableDataCell>{item.requstId}</CTableDataCell>
              <CTableDataCell>{item.occrrncDe}</CTableDataCell>
              <CTableDataCell>{item.methodNm}</CTableDataCell>
              <CTableDataCell>{item.processSeCodeNm}</CTableDataCell>
              <CTableDataCell>{item.processTime}</CTableDataCell>
              <CTableDataCell>{item.rqsterNm}</CTableDataCell>
              <CTableDataCell>
                <img src="/images/egovframework/com/cmm/btn/btn_search.gif" class="cursor"></img>
              </CTableDataCell>
            </CTableRow>,
          )
        })
        setResultList(mutLogList)
        setSearchVO(searchVO);
        setPageButton(Pagination(resp.result.paginationInfo, searchVO, setSearchVO, retrieveList))
      },
      function (resp) {
        console.log('err response : ' + resp)
      },
    )
  } //retrieveList

  useEffect(() => {
    retrieveList(searchVO)
    return () => {}
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>로그 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 d-flex justify-content-end"></CForm>

            <DocsExample>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">요청 ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">발생일자</CTableHeaderCell>
                    <CTableHeaderCell scope="col">메소드명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">처리구분</CTableHeaderCell>
                    <CTableHeaderCell scope="col">처리시간</CTableHeaderCell>
                    <CTableHeaderCell scope="col">요청자</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상세보기</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{resultList}</CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
          <CCardFooter>{pageButton}</CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EgovSysLogList
