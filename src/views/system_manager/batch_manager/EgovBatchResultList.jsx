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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';



function EgovBatchOpertList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();
  const [pickerDate1, setPickerDate1] = useState();
  const [pickerDate2, setPickerDate2] = useState();

  const retrieveList=async(searchVO)=>{
    var edeMonth1 = pickerDate1&&pickerDate1.getMonth()+1;
    if(edeMonth1<10){
      edeMonth1="0"+edeMonth1;
    }
    var edeDate1 = pickerDate1&&pickerDate1.getDate();
    if(edeDate1<10){
      edeDate1="0"+edeDate1;
    }
    var edeMonth2 = pickerDate2&&pickerDate2.getMonth()+1;
    if(edeMonth2<10){
      edeMonth2="0"+edeMonth2;
    }
    var edeDate2 = pickerDate2&&pickerDate2.getDate();
    if(edeDate2<10){
      edeDate2="0"+edeDate2;
    }

    try{
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchResultListAPI.do',{
        params:{
          ...searchVO,
          searchKeywordFrom:pickerDate1&&String(pickerDate1.getFullYear())+String(edeMonth1)+String(edeDate1),
          searchKeywordTo:pickerDate2&&String(pickerDate2.getFullYear())+String(edeMonth2)+String(edeDate2),
        }
      })
      let mutResultList = [];
          
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화

        mutResultList.push(
          <CTableRow onClick={()=>navigate('/system_manager/batch_manager/EgovBatchResultDetail',{state:{batchResultId:item.batchResultId}})}>
            <CTableDataCell>{item.batchResultId}</CTableDataCell>
            <CTableDataCell>{item.batchSchdulId}</CTableDataCell>
            <CTableDataCell>{item.batchOpertNm}</CTableDataCell>
            <CTableDataCell>{item.sttusNm}</CTableDataCell>
            <CTableDataCell>{item.executBeginTime}</CTableDataCell>
            <CTableDataCell>{item.executEndTime}</CTableDataCell>
          </CTableRow>
        );
      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
      )
    }catch(error){
      console.error(error)
    }
  }
  
  useEffect(() => {
    retrieveList(searchVO);
    return () => {
    }
  }, []);

    
  return (
    <CRow>
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>배치작업결과 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
            <CCol md={2}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="">선택하세요</option>
              <option value="0">배치작업명</option>
              <option value="1">배치스케줄ID</option>
            </CFormSelect>
            </CCol>
            <CCol md={3}>
            <CFormInput  name="searchKeyword" type="text" size="35" 
                    value={searchVO && searchVO.searchKeyword}
                    onChange={(e)=>setSearchVO({...searchVO,searchKeyword:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={2}>
            <DatePicker 
                      onChange={date => {setPickerDate1(date)}} 
                      selected={pickerDate1||""}
                      dateFormant="yyyy-MM-dd"
                    />
            </CCol>

            <CCol md={2}>
            <DatePicker 
              onChange={date => {setPickerDate2(date)}} 
              selected={pickerDate2||""}
              dateFormant="yyyy-MM-dd"
            />
            </CCol>
            
            <CCol md={1}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,sttus:e.target.value})}>
              <option value="00">전체</option>
              <option value="01">정상</option>
              <option value="02">비정상</option>
              <option value="03">수행중</option>
            </CFormSelect>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(searchVO)}/>
            </CCol>
            
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">배치결과ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">배치스케줄ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">배치작업명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">상태</CTableHeaderCell>
                    <CTableHeaderCell scope="col">실행시작시간</CTableHeaderCell>
                    <CTableHeaderCell scope="col">실행종료시간</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                    {resultList}
                    
 
                </CTableBody>
              </CTable>
            </DocsExample>
            
                {pageButton}
              
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EgovBatchOpertList
