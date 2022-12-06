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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination'
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function CodeManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [resultList, setResultList] = useState();
  const [resultList2, setResultList2] = useState();
  const [pageButton, setPageButton] = useState();
  const [pageButton2, setPageButton2] = useState();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [registForm, setRegistForm] = useState({
    useAt:"Y"
  });
  const [registForm2, setRegistForm2] = useState();

  const retrieveList = async(searchVO)=>{
    try{
      let resp = await axios.get(SERVER_URL+'/sym/ccm/cca/SelectCcmCmmnCodeListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
          
          
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화



        mutResultList.push(
          <CTableRow onClick={()=>retrieveDetailList({
            searchCondition:1,
            searchKeyword:item.codeId,
          })}
            >
            <CTableHeaderCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableHeaderCell>
            <CTableDataCell>{item.codeId}</CTableDataCell>
            <CTableDataCell>{item.codeIdNm}</CTableDataCell>
            <CTableDataCell>{item.useAt}</CTableDataCell>
            <CTableDataCell>{item.codeIdDc}</CTableDataCell>
          </CTableRow>
        );
      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
      )
    }catch (error) {
      console.error(error);
    }
  } 

  const retrieveDetailList = async(searchVO)=>{
    try{
      let resp = await axios.get(SERVER_URL+'/sym/ccm/cde/SelectCcmCmmnDetailCodeListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
          
          
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화
        //let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);


        mutResultList.push(
          <CTableRow onClick={()=>navigate('/system_manager/code_manager/EgovCcmCmmnDetailCodeDetail',{state:{codeId:item.codeId, code:item.code}})}>
            <CTableHeaderCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableHeaderCell>
            <CTableDataCell>{item.code}</CTableDataCell>
            <CTableDataCell>{item.codeNm}</CTableDataCell>
            <CTableDataCell>{item.useAt}</CTableDataCell>
            <CTableDataCell>{item.codeDc}</CTableDataCell>
            
          </CTableRow>
        );
      });
      setResultList2(mutResultList);
      setPageButton2(
        Pagination(resp.data.result.paginationInfo,searchVO,retrieveDetailList)
      )
    }catch (error) {
      console.error(error);
    }
  } 


 

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.codeId==null || registForm.codeId=="") alert('코드ID는 필수입력사항 입니다.');
    else if(registForm.codeIdNm==null || registForm.codeIdNm=="") alert('코드ID명은 필수입력사항 입니다.')
    else if(registForm.codeIdDc==null || registForm.codeIdDc=="") alert('코드ID설명은 필수입력사항 입니다.');

    else{
      try{    
        let resp = await axios.post('/sym/ccm/cca/RegistCcmCmmnCodeAPI.do',registForm)

        if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
          alert(resp.data.resultMessage);
        }else if(resp.data.resultCode == CODE.RCV_ERROR_SAVE ){
          alert(resp.data.resultMessage);
        }else{
          alert(resp.data.resultMessage);
          window.location.reload();
        }

      }catch(error){
        console.error(error);
      }
    }
    


  };

  const formSubmit2=async()=>{
    console.log(registForm2);
    if(registForm2.codeId==null || registForm2.codeId=="") alert('코드ID는 필수입력사항 입니다.');
    else if(registForm2.code==null || registForm2.code=="") alert('상세코드는 필수입력사항 입니다')
    else if(registForm2.codeNm==null || registForm2.codeNm=="") alert('상세코드명은 필수입력사항 입니다.')
    else if(registForm2.codeDc==null || registForm2.codeDc=="") alert('상세코드설명은 필수입력사항 입니다.');


    else{
      try{    
        let resp = await axios.post('/sym/ccm/cde/RegistCcmCmmnDetailCodeAPI.do',registForm2)

        if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
          alert(resp.data.resultMessage);
        }else if(resp.data.resultCode == CODE.RCV_ERROR_SAVE ){
          alert(resp.data.resultMessage);
        }else{
          alert(resp.data.resultMessage);
          window.location.reload();
        }

      }catch(error){
        console.error(error);
      }
    }
  };

  
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
            <strong>공통코드그룹 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
            <CCol md={2}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="">선택하세요</option>
              <option value="1">코드ID</option>
              <option value="2">코드ID명</option>
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
                    onClick={()=>setVisible1(true)}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">공통코드그룹ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">공통코드그룹명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용여부</CTableHeaderCell>
                    <CTableHeaderCell scope="col">그룹설명</CTableHeaderCell>
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

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>공통코드 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">

            <CCol md={1}>
            <CFormInput  type="button"
                    value="등록"
                    onClick={()=>setVisible2(true)}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">공통코드ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">공통코드명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용여부</CTableHeaderCell>
                    <CTableHeaderCell scope="col">코드설명</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                    {resultList2}
                    
 
                </CTableBody>
              </CTable>
            </DocsExample>
            
                  {pageButton2}
        
          </CCardBody>
        </CCard>
      </CCol>


        {/*공통코드그룹 등록 모달*/}
        <CModal backdrop="static" visible={visible1} onClose={() => setVisible1(false)}>
          <CModalHeader>
            <CModalTitle>공통코드 그룹 등록</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={12}>
            <CInputGroup>
                <CInputGroupText>공통코드 그룹ID</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm({
                            ...registForm,codeId:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>공통코드 그룹명</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm({
                            ...registForm,codeIdNm:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>그룹설명</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm({
                            ...registForm,codeIdDc:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>사용여부</CInputGroupText>
                <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,useAt:e.target.value})}
                      
                    >
                      <option value={'Y'}>예</option>
                      <option value={'N'}>아니오</option>
                    </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="button"
              className="form-control form-control-sm"
              style={{color:"white", backgroundColor:"navy"}}
              value="등록"
              onClick={()=>formSubmit()}
            />
          </CCol>
          <CCol md={3}>
          <CFormInput
              type="button"
              className="form-control form-control-sm"
              style={{color:"white", backgroundColor:"navy"}}
              value="닫기"
              onClick={()=>setVisible1(false)}
            />
            </CCol>
          </CForm>

          </CModalBody>
          <CModalFooter>
          
          </CModalFooter>
        </CModal>


        {/*공통코드 등록 모달*/}
        <CModal backdrop="static" visible={visible2} onClose={() => setVisible2(false)}>
          <CModalHeader>
            <CModalTitle>공통코드 등록</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={12}>
            <CInputGroup>
                <CInputGroupText>공통코드ID</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm2({
                            ...registForm2,code:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>공통코드명</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm2({
                            ...registForm2,codeNm:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>코드설명</CInputGroupText>
                <CFormInput  type="text"
                        onChange={(e)=>setRegistForm2({
                            ...registForm2,codeDc:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>사용여부</CInputGroupText>
                <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm2({...registForm2,useAt:e.target.value})}
                      
                    >
                      <option value={'Y'}>예</option>
                      <option value={'N'}>아니오</option>
                    </CFormSelect>
            </CInputGroup>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="button"
              className="form-control form-control-sm"
              style={{color:"white", backgroundColor:"navy"}}
              value="등록"
              onClick={()=>formSubmit2()}
            />
          </CCol>
          <CCol md={3}>
          <CFormInput
              type="button"
              className="form-control form-control-sm"
              style={{color:"white", backgroundColor:"navy"}}
              value="닫기"
              onClick={()=>setVisible2(false)}
            />
            </CCol>
          </CForm>

          </CModalBody>
          <CModalFooter>
          
          </CModalFooter>
        </CModal>


      
    </CRow>
  )
}

export default CodeManager
