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
      const resp = await axios.get(SERVER_URL+'/sec/ram/EgovAuthorListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
       
      resp.data.result.authorList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화

        mutResultList.push(
          <CTableRow>
            {/*
            <CTableHeaderCell scope="row">
              <input type="checkbox" value={item.authorCode}  ref={(e)=>(inputRef.current[index]=e)} />
            </CTableHeaderCell>
            */}
            <CTableDataCell onClick={()=>navigate('/system_manager/author_manager/EgovAuthorDetail',{state:{authorCode:item.authorCode}})}>{item.authorCode}</CTableDataCell>
            <CTableDataCell onClick={()=>navigate('/system_manager/author_manager/EgovAuthorDetail',{state:{authorCode:item.authorCode}})}>{item.authorNm}</CTableDataCell>
            <CTableDataCell onClick={()=>navigate('/system_manager/author_manager/EgovAuthorDetail',{state:{authorCode:item.authorCode}})}>{item.authorDc}</CTableDataCell>
            <CTableDataCell onClick={()=>navigate('/system_manager/author_manager/EgovAuthorDetail',{state:{authorCode:item.authorCode}})}>{item.authorCreatDe}</CTableDataCell>
            
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
/*
  function checkBoxClickAll(e){
    if(e.target.checked==true){
      
      for(var i = 0; i<inputRef.current.length; i++){
        console.log(inputRef.current[0].checked);
        if(inputRef.current[i].checked==false){
          inputRef.current[i].checked=true;
        }
      }
    }
    else if(e.target.checked==false){
      for(var i = 0; i<inputRef.current.length; i++){
        console.log(inputRef.current[0].checked);
        if(inputRef.current[i].checked==true){
          inputRef.current[i].checked=false;
        }
      }
    }
  }

  const formDelete=async()=>{
    var mutAuthorCodeList = [];
    for(var i=0; i<inputRef.current.length; i++){
      if(inputRef.current[i].checked==true){
        mutAuthorCodeList.push(inputRef.current[i].value);
      }
    }
    console.log(mutAuthorCodeList);
    var authorCodes = mutAuthorCodeList.toString();
    try{
      const resp = await axios.delete(SERVER_URL+'/sec/ram/EgovAuthorListDeleteAPI.do?authorCodes='+authorCodes)
      alert(mutAuthorCodeList.length+'건 삭제되었습니다');
      window.location.reload();
    }catch(error){
      console.error(error);
    }
  }
*/
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
                    {/*
                    <CTableHeaderCell scope="col">
                      <input type="checkbox" onChange={(e)=>checkBoxClickAll(e)}/>
                    </CTableHeaderCell>
                     */}
                    <CTableHeaderCell scope="col">권한ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">권한명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">설명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
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
