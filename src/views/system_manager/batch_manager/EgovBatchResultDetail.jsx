import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function EgovBatchResultDetail() {
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
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchResultAPI.do',{
        params:{
          batchResultId:location.state.batchResultId
        }
      })
      let mutRegistForm = {
        batchResultId:location.state.batchResultId,
        batchSchdulId:resp.data.result.result.batchSchdulId,
        batchOpertId:resp.data.result.result.batchOpertId,
        batchOpertNm:resp.data.result.result.batchOpertNm,
        batchProgrm:resp.data.result.result.batchProgrm,
        paramtr:resp.data.result.result.paramtr,
        sttusNm:resp.data.result.result.sttusNm,
        errorInfo:resp.data.result.result.errorInfo,
        executBeginTime:resp.data.result.result.executBeginTime,
        executEndTime:resp.data.result.result.executEndTime,
      }
      setRegistForm(mutRegistForm);
    }catch(error){
      console.error(error)
    }
  }

  const formDelete = async() =>{
    try{
      const resp = await axios.delete(SERVER_URL+'/sym/bat/deleteBatchResultAPI.do',{
        data:registForm
      })
      if(resp.data.resultCode == CODE.RCV_SUCCESS){
        alert(resp.data.resultMessage);
        navigate('/system_manager/batch_manager/EgovBatchResultList')
      }else{
        alert(resp.data.resultMessage);
      }
    }catch(error){
      console.error(error)
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
              <strong>배치스케줄 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치결과ID
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.batchResultId}
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
                      disabled={true}
                    />
                  </CCol>
                </CRow>

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
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    상태
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.sttusNm}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    에러정보
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormTextarea
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.errorInfo}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    실행시작시각
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.executBeginTime}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    실행종료시각
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.executEndTime}
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
                
                </CRow>

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>


        </form>
    </CRow>
  )
}

export default EgovBatchResultDetail
