import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function EgovBatchOpertDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    batchOpertId:"",
    batchOpertNm:"",
    batchProgrm:"",
    paramtr:"",
  });

  const callInfo = async() =>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchOpertAPI.do',{
        params:{
          batchOpertId:location.state.batchOpertId,
        }
      })
      let mutRegistForm = {
        batchOpertId:location.state.batchOpertId,
        batchOpertNm:resp.data.result.result.batchOpertNm,
        batchProgrm:resp.data.result.result.batchProgrm,
        paramtr:resp.data.result.result.paramtr,
      }
      setRegistForm(mutRegistForm);

    }catch(error){
      console.error(error)
    }
  }

  const formSubmit=async()=>{
    if(registForm.batchOpertNm==null || registForm.batchOpertNm=="") alert('코드ID는 필수입력사항 입니다.');
    else if(registForm.batchProgrm==null || registForm.batchProgrm=="") alert('상세코드는 필수입력사항 입니다')
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/bat/updateBatchOpertAPI.do',registForm)
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

  const formDelete=async()=>{
    console.log(registForm);
    if(registForm.batchOpertNm==null || registForm.batchOpertNm=="") alert('배치작업명은 필수입력사항 입니다.');
    else if(registForm.batchProgrm==null || registForm.batchProgrm=="") alert('배치프로그램은 필수입력사항 입니다')
    else{
      try{
        const resp = await axios.delete(SERVER_URL+'/sym/bat/deleteBatchOpertAPI.do',{
          data:registForm
        })     
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          navigate('/system_manager/batch_manager/EgovBatchOpertList');
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
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
              <strong>배치작업 등록 및 수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치작업ID
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.batchOpertId}
                      onChange={(e)=>setRegistForm({...registForm,batchOpertNm:e.target.value})}
                      maxLength="15"
                      disabled={true}
                    />
                  </CCol>
                </CRow>
                
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
                      value={registForm.batchOpertNm}
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
                      value={registForm.batchProgrm}
                      onChange={(e)=>setRegistForm({...registForm,batchProgrm:e.target.value})}
                      maxLength="15"
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
                      value={registForm.paramtr}
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
                      value="삭제"
                      onClick={()=>formDelete()}
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

export default EgovBatchOpertDetail
