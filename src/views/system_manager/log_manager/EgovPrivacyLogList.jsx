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
import 'react-datepicker/dist/react-datepicker.css'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import glass from 'src/assets/images/icon/돋보기.jpg'

import { Pagination } from 'src/context/Pagination'
import axios from 'axios'

import DatePicker from 'react-datepicker'
import { SERVER_URL } from 'src/context/config'

function EgovPravacyLogList () {

    const location = useLocation()
    const navigate = useNavigate()
    const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCondition: '0', searchWord: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    
  
    const [logs, setLogs] = useState({})
    const [resultList, setResultList] = useState()
  
    const [pageButton, setPageButton] = useState()
  
    // 달력
    const convertDate = (str) => {
      let year = str.substring(0, 2)
      let month = str.substring(2, 4)
      let date = str.substring(4, 6)
      return new Date(year, month - 1, date)
    }
  
    //날짜관련함수
    const getYYYYMMDD = (date) => {
      return (
        date.getFullYear().toString() +
        '-' +
        makeTwoDigit(Number(date.getMonth() + 1)) +
        '-' +
        makeTwoDigit(date.getDate())
      )
    }
    const makeTwoDigit = (number) => {
      return number < 10 ? '0' + number : number.toString()
    }
  
    const retrieveList = (searchVO) => {
      axios
        .get(SERVER_URL+'/sym/log/plg/SelectPrivacyLogListAPI.do', {
          params: {
            pageIndex: searchVO.pageIndex,
            searchWord: searchVO.searchWord,
            searchBeginDate: searchVO.searchBeginDate,
            searchEndDate: searchVO.searchEndDate,
          },
        })
        .then(
          (resp) => {
            console.log(resp.data.resultList)
  
            let mutLogList = []
            let resultCnt = resp.data.result.resultCnt * 1
            let currentPageNo = resp.data.result.paginationInfo.currentPageNo
            let pageSize = resp.data.result.paginationInfo.pageSize
            resp.data.result.resultList.forEach(function (item, index) {
              if (index === 0) mutLogList = [] // 목록 초기화
  
              let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1)
  
              let inquiryDatetime = item.inquiryDatetime.substring(0, 19)
              console.log(inquiryDatetime)
              mutLogList.push(
                <CTableRow>
                  <CTableHeaderCell scope="row">{listIdx}</CTableHeaderCell>
                  <CTableDataCell>{item.inquiryDatetime}</CTableDataCell>
                  <CTableDataCell>{item.serviceName}</CTableDataCell>
                  <CTableDataCell>{item.inquiryInfo}</CTableDataCell>
                  <CTableDataCell>{item.requesterName}</CTableDataCell>
                  <CTableDataCell>{item.requesterIp}</CTableDataCell>
                  <CTableDataCell
                    onClick={() =>
                      window.open('http://localhost:3000#/system_manager/log_manager/EgovPrivacyLogDetail?requestId='+
                      item.requestId,'_blank','height=800')
                    }
                  >

                    <img
                      src={glass}
                      style={{
                        maxWidth: '100%',
                        width: '30px',
                      }}
                    ></img>
                  </CTableDataCell>
                </CTableRow>,
              )
            })
            setResultList(mutLogList)
            setPageButton(
              Pagination(resp.data.result.paginationInfo, searchVO, retrieveList),
            )
          },
          function (resp) {
            console.log('err response : ' + resp)
          },
        )
    } //retrieveList
  
    useEffect(() => {
      retrieveList(searchVO)
  
      return () => {}
    }, [])
  
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>개인정보 조회로그</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 d-flex justify-content-end">
              조회일시 :
              <CCol md = {2}>
                <DatePicker
                  selected={searchVO.startDate}
                  name="searchBeginDate"
                  className="f_input"
                  dateFormat="yy-MM-dd"
                  showTimeInput
                  onChange={(date) => {
                    setSearchVO({
                      ...searchVO,
                      searchBeginDate: getYYYYMMDD(date),
                      //searchBgnDe: date,
                      startDate: date,
                    })
                  }}
                />
              </CCol>
              ~
              <CCol md = {2}>
                <DatePicker
                  selected={searchVO.endDate}
                  name="searchEndDate"
                  className="f_input"
                  dateFormat="yy-MM-dd"
                  showTimeInput
                  onChange={(date) => {
                    setSearchVO({
                      ...searchVO,
                      searchEndDate: getYYYYMMDD(date),
                      //searchEndDe: date,
                      endDate: date,
                    })
                  }}
                />
                </CCol>
                <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={2}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="1">전체</option>
              <option value="2">서비스명</option>
              <option value="3">조회정보</option>
              <option value="4">요청자</option>
            </CFormSelect>
            </CCol>
            <CCol md={5}>
            <CFormInput  name="searchWord" type="text" size="35" 
                    value={searchVO && searchVO.searchWord}
                    onChange={(e)=>setSearchVO({...searchVO,searchWord:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(searchVO)}/>
            </CCol>
          </CForm>
              </CForm>
              <DocsExample>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                      <CTableHeaderCell scope="col">조회일시</CTableHeaderCell>
                      <CTableHeaderCell scope="col">서비스명</CTableHeaderCell>
                      <CTableHeaderCell scope="col">조회정보</CTableHeaderCell>
                      <CTableHeaderCell scope="col">요청자</CTableHeaderCell>
                      <CTableHeaderCell scope="col">요청자IP</CTableHeaderCell>
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
export default EgovPravacyLogList




