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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovCcmCmmnCodeRegist()  {
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    useAt : 'Y'
  });
  


  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.codeId==null || registForm.codeId=="") alert('코드ID'+CODE.ALERT_INPUT);
    else if(registForm.codeIdNm==null || registForm.codeIdNm=="") alert('코드ID명'+CODE.ALERT_INPUT);
    else if(registForm.codeIdDc==null || registForm.codeIdDc=="") alert('코드ID설명'+CODE.ALERT_INPUT);


    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/ccm/cca/RegistCcmCmmnCodeAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_RGST);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.log(error);
      }  
    }
  };

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_RGST)){
      navigate(-1);
    }
  }
 
    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>공통코드 등록</strong> <small></small>
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
                      onChange={(e)=>setRegistForm({...registForm,codeId:e.target.value})}
                      maxLength="6"
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
                      onChange={(e)=>setRegistForm({...registForm,codeIdNm:e.target.value})}
                      maxLength="15"
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
                      type="textarea"
                      className="form-control form-control-sm"
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
                      <option value={'Y'}>예</option>
                      <option value={'N'}>아니오</option>
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
    </CRow>
    
  )
};

export default EgovCcmCmmnCodeRegist;