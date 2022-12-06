import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';



function EgovAuthorManage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();
  const inputRef = useRef([]);


  const retrieveList=async(searchVO)=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sec/rgm/EgovAuthorGroupListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
       
      resp.data.result.authorGroupList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화

        mutResultList.push(
          <CTableRow>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.userId}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
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
            <strong>권한관리 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
            <CCol md={5}>
            <CInputGroup>
                <CInputGroupText>권한명</CInputGroupText>
                <CFormInput  name="searchKeyword" type="text" size="35" 
                        onChange={(e)=>setSearchVO({
                            ...searchVO,searchKeyword:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList({...searchVO,searchCondition:1})}/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="삭제"
                    onClick={()=>formDelete()}/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="등록"
                    onClick={()=>navigate('/system_manager/author_manager/EgovAuthorInsert')}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">구분</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용자명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">소속기관</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용자 유형</CTableHeaderCell>
                    <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">휴대전화</CTableHeaderCell>
                    <CTableHeaderCell scope="col">권한</CTableHeaderCell>
                    <CTableHeaderCell scope="col">등록여부</CTableHeaderCell>
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

export default EgovAuthorManage
