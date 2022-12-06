import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CODE from 'src/context/code'
import axios from 'axios';
import {Pagination} from 'src/context/Pagination'
import { SERVER_URL } from 'src/context/config'
import { useRef } from 'react'


function EgovCcmCmmnDetailCodeRegist()  {
  const navigate = useNavigate();
  const [codeIdList, setCodeIdList] = useState();
  const [codeVisible, setCodeVisible] = useState(false);
  const [searchVO,setSearchVO] = useState();
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();
  const codeIdRef = useRef();
  const codeIdNmRef = useRef();
  const [registForm, setRegistForm] = useState({
    useAt : 'Y'
  });
/*
  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cde/RegistCcmCmmnDetailCodeViewAPI.do').then((resp)=>{
        let mutCodeIdList=[];
        mutCodeIdList.push(<option value="">선택하세요</option>);
        resp.data.result.codeList.forEach(function(item){
          mutCodeIdList.push(
            <option value={item.codeId}>{item.codeIdNm}</option>
          );
        });
        setCodeIdList(mutCodeIdList);
      })
      
    }catch(error){
      console.error(error);
    }
  }*/
  const callInfo=async(searchVO)=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cca/SelectCcmCmmnCodeListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
           
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화

        mutResultList.push(
          <CTableRow onClick={()=>onMordalClick(item.codeId,item.codeIdNm)}>
            <CTableHeaderCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableHeaderCell>
            <CTableDataCell>{item.codeIdNm}</CTableDataCell>
            <CTableDataCell>{item.codeId}</CTableDataCell>
          </CTableRow>
        );
      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,callInfo)
      )
    }catch(error){
      console.error(error);
    }
  }
  const onMordalClick = (codeId, codeIdNm) => {
    setRegistForm({
      ...registForm,
      codeId:codeId,
      codeIdNm:codeIdNm,
    })
    codeIdRef.current.value = codeId;
    codeIdNmRef.current.value = codeIdNm;
    setCodeVisible(false);
  }

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.codeId==null || registForm.codeId=="") alert('코드ID'+CODE.ALERT_INPUT);
    else if(registForm.code==null || registForm.code=="") alert('상세코드'+CODE.ALERT_INPUT)
    else if(registForm.codeNm==null || registForm.codeNm=="") alert('상세코드명'+CODE.ALERT_INPUT)
    else if(registForm.codeDc==null || registForm.codeDc=="") alert('상세코드설명'+CODE.ALERT_INPUT);


    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/ccm/cde/RegistCcmCmmnDetailCodeAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_RGST);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error);
      }
    }
  }

  useEffect(() => {
    callInfo();
    return () => {
    }
  }, []);
 
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>공통상세코드 등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">

              <CInputGroup className="mb-3">
                  <CInputGroupText>코드명</CInputGroupText>
                  <CFormInput
                    ref={codeIdNmRef}
                    
                  />
                  <CInputGroupText>코드ID</CInputGroupText>
                  <CFormInput
                      ref={codeIdRef}
                  />
                <CButton type="button" color="primary" variant="outline" id="button-addon1"
                  onClick={()=>setCodeVisible(true)}
                >
                  검색
                </CButton>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드</CInputGroupText>
                  <CFormInput
                  onChange={(e)=>setRegistForm({...registForm,code:e.target.value})}
                    type="text"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 명</CInputGroupText>
                  <CFormInput
                    onChange={(e)=>setRegistForm({...registForm,codeNm:e.target.value})}

                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 설명</CInputGroupText>
                  <CFormTextarea
                    onChange={(e)=>setRegistForm({...registForm,codeDc:e.target.value})}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>사용여부</CInputGroupText>
                  <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,useAt:e.target.value})}
                      
                    >
                      <option value={'Y'}>예</option>
                      <option value={'N'}>아니오</option>
                    </CFormSelect>
                </CInputGroup>
                <CRow className="mb-1 justify-content-center">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="목록"
                      onClick={()=>navigate(-1)}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="등록"
                      onClick={()=>formSubmit()}
                    />
                  </CCol>
                </CRow>

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>


        </form>
        {/*코드 찾기 모달*/}
      <CModal backdrop="static" visible={codeVisible} onClose={() => setCodeVisible(false)}>
          <CModalHeader>
            <CModalTitle>코드 검색</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={8}>
            <CInputGroup>
              <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
                <option value="">선택하세요</option>
                <option value="1">코드ID</option>
                <option value="2">코드ID명</option>
              </CFormSelect>
                <CFormInput  name="searchKeyword" type="text" size="35" 
                        onChange={(e)=>setSearchVO({
                            ...searchVO,searchKeyword:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
          </CCol>
          <CCol md={3}>
          <CFormInput  type="button"
                  value="조회"
                  onClick={()=>callInfo(searchVO)}
                  />
          </CCol>
          </CForm>
          <DocsExample >

            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">코드명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">코드ID</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {resultList}
                  
                  

              </CTableBody>
              
            </CTable>
            {pageButton}
          </DocsExample>
            
          </CModalBody>
          <CModalFooter>
          
          </CModalFooter>
        </CModal>
    </CRow>
    
  )
};

export default EgovCcmCmmnDetailCodeRegist;