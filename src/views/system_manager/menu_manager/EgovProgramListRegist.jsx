import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroupText,
  CInputGroup,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';
import CODE from 'src/context/code';


function EgovProgramListDetailSelect() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState();

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_UPDT)){
      navigate(-1);
    }
  }

  const formSubmit = async() => {
    if(registForm.progrmFileNm == null || registForm.progrmFileNm == "") alert('프로그램 파일 명'+CODE.ALERT_INPUT);
    else if(registForm.progrmStrePath == null || registForm.progrmStrePath == "") alert('저장 경로'+CODE.ALERT_INPUT);
    else if(registForm.progrmKoreanNm == null || registForm.progrmKoreanNm == "") alert('프로그램 명'+CODE.ALERT_INPUT);
    else if(registForm.url == null || registForm.url == "") alert('URL'+CODE.ALERT_INPUT);
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/prm/EgovProgramListRegistAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_RGST)
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
              <strong>프로그램 수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 파일 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      progrmFileNm:e.target.value,
                    })}
                    
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>저장 경로</CInputGroupText>
                  <CFormInput
                    type="text"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      progrmStrePath:e.target.value,
                    })}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      progrmKoreanNm:e.target.value,
                    })}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>URL</CInputGroupText>
                  <CFormInput
                    type="text"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      url:e.target.value,
                    })}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 설명</CInputGroupText>
                  <CFormTextarea
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      progrmDc:e.target.value,
                    })}
                  />
                </CInputGroup>
              
                <CRow className="mb-1 justify-content-center">
                  <CCol sm={2}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="취소"
                        onClick={()=>formCancel()}
                      />
                    </CCol>
                  <CCol sm={2}>
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
}

export default EgovProgramListDetailSelect
