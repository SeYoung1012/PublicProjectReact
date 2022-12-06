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
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchSchdulAPI.do',{
        params:{
          batchSchdulId:location.state.batchSchdulId
        }
      })
      let mutRegistForm = {
        batchSchdulId:location.state.batchSchdulId,
        batchOpertId:resp.data.result.result.batchOpertId,
        batchOpertNm:resp.data.result.result.batchOpertNm,
        executCycleNm:resp.data.result.result.executCycleNm,
        executSchdul:resp.data.result.result.executSchdul,
        batchProgrm:resp.data.result.result.batchProgrm,
        paramtr:resp.data.result.result.paramtr,
      }
      setRegistForm(mutRegistForm);
    }catch(error){
      console.error(error)
    }
  }

  const formDelete = async() =>{
    if(confirm(CODE.CONFIRM_DELETE)){
      try{
        const resp = await axios.delete(SERVER_URL+'/sym/bat/deleteBatchSchdulAPI.do',{
          data:registForm
        })
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          navigate('/system_manager/batch_manager/EgovBatchSchdulList')
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
              <strong>배치 상세 조회</strong> <small></small>
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
                      onChange={(e)=>setRegistForm({...registForm,batchOpertId:e.target.value})}
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
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치프로그램
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.batchProgrm}
                      onChange={(e)=>setRegistForm({...registForm,batchProgrm:e.target.value})}
                      disabled={true}
                    />
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
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치스케줄ID
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.batchSchdulId}
                      onChange={(e)=>setRegistForm({...registForm,batchSchdulId:e.target.value})}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    실행주기
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.executCycleNm+" "+registForm.executSchdul}
                      onChange={(e)=>setRegistForm({...registForm,batchProgrm:e.target.value})}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                
            
                <CRow className="mb-1 justify-content-end">
                  
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="수정"
                      onClick={()=>navigate('/system_manager/batch_manager/EgovBatchOpertUpdt',{state:{batchSchdulId:registForm.batchSchdulId}})}
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
                      value="목록"
                      onClick={()=>navigate('/system_manager/batch_manager/EgovBatchOpertList')}
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
