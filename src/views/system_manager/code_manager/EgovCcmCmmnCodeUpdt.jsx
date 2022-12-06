import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';



function EgovCcmCmmnCodeUpdt() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 
    codeId:"",
    codeIdNm:"",
    codeIdDc:"",
    useAt:"",
  });
  const codeId = location.state.codeId;
  const [useAt, setUseAt] = useState();

  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cca/SelectCcmCmmnCodeDetailAPI.do',{
        params:{
          codeId:codeId
        }
      }).then((resp)=>{
          setRegistForm({
            ...registForm,
            codeId:resp.data.result.result.codeId,
            codeIdNm:resp.data.result.result.codeIdNm,
            codeIdDc:resp.data.result.result.codeIdDc,
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
        }    
      )
    }catch(error){
      console.error(error);
    }
  }

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.codeId==null || registForm.codeId=="") alert('코드ID'+CODE.ALERT_INPUT);
    else if(registForm.codeIdNm==null || registForm.codeIdNm=="") alert('코드ID'+CODE.ALERT_INPUT)
    else if(registForm.codeIdDc==null || registForm.codeIdDc=="") alert('코드ID설명'+CODE.ALERT_INPUT);


    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/ccm/cca/UpdateCcmCmmnCodeAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          navigate('/system_manager/code_manager/EgovCcmCmmnCodeDetail',{state:{codeId:registForm.codeId}})
        }else{
          alert(CODE.ALERT_UPDT);
        }
      }catch(error){
        console.log(error);
      }  
    }
  };

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
              
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    코드ID
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      value={registForm.codeId}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    코드ID명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      value={registForm.codeIdNm}
                      onChange={(e)=>setRegistForm({...registForm,codeIdNm:e.target.value})}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    코드ID설명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      value={registForm.codeIdDc}
                      onChange={(e)=>setRegistForm({...registForm,codeIdDc:e.target.value})}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    사용여부
                  </CFormLabel>
                  <CCol sm={10}>
                  <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,useAt:e.target.value})}
                      
                    >
                      {useAt}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-end">
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

export default EgovCcmCmmnCodeUpdt
