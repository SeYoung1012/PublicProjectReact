import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovCcmCmmnDetailCodeUpdt() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 
    code:"",
    codeDc:"",
    codeNm:"",
    codeId:"",
    codeIdNm:"",
    codeIdDc:"",
    useAt:"",
  });
  const codeId = location.state.codeId;
  const code = location.state.code;
  const [useAt, setUseAt] = useState();

  const callInfo = async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cde/UpdateCcmCmmnDetailCodeViewAPI.do',{
        params:{
          code:code,
          codeId:codeId,
        }
      })
      setRegistForm({...registForm,
        codeId:resp.data.result.result.codeId,
        codeIdNm:resp.data.result.result.codeIdNm,
        code:resp.data.result.result.code,
        codeNm:resp.data.result.result.codeNm,
        codeDc:resp.data.result.result.codeDc,
        useAt:resp.data.result.result.useAt,

      });
      var useAt = [];
      if(resp.data.result.result.useAt == "Y"){
        useAt.push(
          <option value={'Y'} selected>예</option>
        )
      }else{
        useAt.push(<option value={'Y'}>예</option>)
      }

      if(resp.data.result.result.useAt =="N"){
        useAt.push(
          <option value={'N'} selected>아니오</option>
        )
      }else{
        useAt.push(<option value={'N'} >아니오</option>)
      }
      setUseAt(useAt);
    }catch(error){
      console.error(error);
    }
  }
  
  const formSubmit=async()=>{
    if(registForm.codeNm==null || registForm.codeNm=="") alert('상세코드명'+CODE.ALERT_INPUT)
    else if(registForm.codeDc==null || registForm.codeDc=="") alert('상세코드설명'+CODE.ALERT_INPUT);
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/ccm/cde/UpdateCcmCmmnDetailCodeAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_UPDT)
          navigate('/system_manager/code_manager/EgovCcmCmmnDetailCodeDetail',{state:{codeId:registForm.codeId,code:registForm.code}})
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  }

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_UPDT)){
      navigate(-1);
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
              <strong>공통코드 수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>코드명</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.codeIdNm}
                    disabled={true}
                    
                  />
                  <CInputGroupText>코드ID</CInputGroupText>
                  <CFormInput
                      type="text"
                      maxLength="15"
                      value={registForm.codeId}
                      disabled={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.code}
                    disabled={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 명</CInputGroupText>
                  <CFormInput
                    value={registForm.codeNm}
                    onChange={(e)=>setRegistForm({...registForm,codeNm:e.target.value})}

                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 설명</CInputGroupText>
                  <CFormTextarea
                    value={registForm.codeDc}
                    onChange={(e)=>setRegistForm({...registForm,codeDc:e.target.value})}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>사용여부</CInputGroupText>
                  <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,useAt:e.target.value})}
                      
                    >
                      {useAt}
                    </CFormSelect>
                </CInputGroup>
              
             

                <CRow className="mb-1 justify-content-center">
                  <CCol sm={1}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="취소"
                        onClick={()=>formCancel()}
                      />
                    </CCol>
                  <CCol sm={1}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="저장"
                        onClick={()=>formSubmit()}
                      />
                    </CCol>

                  </CRow>

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
        </form>

        
    </CRow>
    
  )
}

export default EgovCcmCmmnDetailCodeUpdt
