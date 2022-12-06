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
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination'
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function EgovAuthorManage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();

  const retrieveList = async(searchVO) => {
    try{
      const resp = await axios.get(SERVER_URL+'/sym/mnu/mcm/EgovMenuCreatManageSelectAPI.do',{
        params:searchVO
      })
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      let mutResultList = [];
          
      resp.data.result.list_menumanage.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화

        mutResultList.push(
          <CTableRow>
            <CTableDataCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableDataCell>
            <CTableDataCell>{item.authorCode}</CTableDataCell>
            <CTableDataCell>{item.authorNm}</CTableDataCell>
            <CTableDataCell>{item.authorDc}</CTableDataCell>
            <CTableDataCell>{item.chkYeoBu>0?'Y':'N'}</CTableDataCell>
            <CTableDataCell>
              <CFormInput
                  type="button"
                  className="form-control form-control-sm"
                  style={{color:"white", backgroundColor:"navy"}}
                  value="등록하기"
                  onClick={()=>navigate('/system_manager/menu_manager/EgovMenuCreatInsert',{state:{authorCode:item.authorCode}})}
                />
            </CTableDataCell>
            
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
            <strong>메뉴 생성 관리</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
            <CCol md={5}>
            <CInputGroup>
              <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
                <option value="">선택하세요</option>
                <option value="1">권한 코드</option>
                <option value="2">권한 명</option>
              </CFormSelect>
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
                    onClick={()=>retrieveList(searchVO)}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">권한 코드</CTableHeaderCell>
                    <CTableHeaderCell scope="col">권한 명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">권한 설명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">메뉴 생성 여부</CTableHeaderCell>
                    <CTableHeaderCell scope="col">메뉴 등록</CTableHeaderCell>
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
