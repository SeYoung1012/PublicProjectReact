import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovBatchOpertRegist()  {
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    useAt : 'Y'
  });

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.batchOpertNm==null || registForm.batchOpertNm=="") alert('배치작업명은 필수입력사항 입니다.');
    else if(registForm.batchProgrm==null || registForm.batchProgrm=="") alert('배치프로그램 필수입력사항 입니다')
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/bat/addBatchOpertAPI.do',registForm)
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

  useEffect(() => {
    return () => {
    }
  }, []);
 
    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>배치작업 등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치작업명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,batchOpertNm:e.target.value})}
                      maxLength="15"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    프로그램명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,batchProgrm:e.target.value})}
                  
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel
                    className="col-form-label col-form-label-sm">
                    - "배치프로그램은 globals.properties - SHELL.(UNIX/WINDOWS).batchShellFiles에 미리 등록하여야 실행이 가능하다.(WhiteList)<br/>
                    - "물리적인 경로 입력"<br></br>
                    </CFormLabel>
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    파라미터
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,paramtr:e.target.value})}
                      maxLength="15"
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

export default EgovBatchOpertRegist;