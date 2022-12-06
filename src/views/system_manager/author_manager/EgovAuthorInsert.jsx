import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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
  const [registForm, setRegistForm] = useState();
  
  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.authorCode==null || registForm.authorCode=="") alert('권한코드는 필수입력사항 입니다.');
    else if(registForm.authorNm==null || registForm.authorNm=="") alert('권한명은 필수입력사항 입니다.');

    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sec/ram/EgovAuthorInsertAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
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
                    권한코드
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,authorCode:e.target.value})}
                      maxLength="30"
                    />
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    권한명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,authorNm:e.target.value})}
                      maxLength="60"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    설명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormTextarea
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,authorDc:e.target.value})}
                    />
                  </CCol>
                </CRow>


                <CRow className="mb-1 justify-content-end">
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
    </CRow>
    
  )
};

export default EgovCcmCmmnCodeRegist;