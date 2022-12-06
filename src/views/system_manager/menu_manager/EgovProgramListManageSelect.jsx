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
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function EgovProgramListManageSelect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();


  const retrieveList = async(searchVO)=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/prm/EgovProgramListManageSelectAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
    console.log(resp.data.result.resultList);       
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화
    
        mutResultList.push(
          <CTableRow onClick={()=>navigate('/system_manager/menu_manager/EgovProgramListDetailSelect',{state:{progrmFileNm:item.progrmFileNm}})}>
            <CTableHeaderCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableHeaderCell>
            <CTableDataCell>{item.progrmFileNm}</CTableDataCell>
            <CTableDataCell>{item.progrmKoreanNm}</CTableDataCell>
            <CTableDataCell>{item.url}</CTableDataCell>
            <CTableDataCell>{item.progrmDc}</CTableDataCell>
          </CTableRow>
        );
      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
      )
    }catch(error){
      console.error(error);
    }
  } //retrieveList()

  
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
            <strong>프로그램 관리</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
            <CCol md={2}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="">선택하세요</option>
              <option value="1">프로그램 파일명</option>
              <option value="2">프로그램 명</option>
            </CFormSelect>
            </CCol>
            <CCol md={5}>
            <CFormInput  name="searchKeyword" type="text" size="35" 
                    value={searchVO && searchVO.searchKeyword}
                    onChange={(e)=>setSearchVO({...searchVO,searchKeyword:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(searchVO)}/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="등록"
                    onClick={()=>navigate('/system_manager/menu_manager/EgovProgramListRegist')}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">프로그램 파일 명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">프로그램 명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                    <CTableHeaderCell scope="col">프로그램 설명</CTableHeaderCell>
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

export default EgovProgramListManageSelect
