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
  const [registForm, setRegistForm] = useState({ 
    progrmFileNm:location.state.progrmFileNm,
    progrmKoreanNm:"",
    progrmStrePath:"",
    url:"",
    progrmDc:""
  });
  const progrmFileNm = location.state.progrmFileNm;

  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/prm/EgovProgramListDetailSelectAPI.do?progrmFileNm='+progrmFileNm)
      setRegistForm({...registForm,
        progrmKoreanNm:resp.data.result.result.progrmKoreanNm,
        progrmStrePath:resp.data.result.result.progrmStrePath,
        url:resp.data.result.result.url,
        progrmDc:resp.data.result.result.progrmDc
      });
    }catch(error){
      console.log(error);
    }
  }

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
        const resp = await axios.post(SERVER_URL+'/sym/prm/EgovProgramListDetailSelectUpdtAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_UPDT)
          navigate('/system_manager/menu_manager/EgovProgramListDetailSelect',{state:{progrmFileNm:progrmFileNm}})
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
              <strong>프로그램 수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 파일 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.progrmFileNm}
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      progrmFileNm:e.target.value,
                    })}
                    disabled={true}
                    
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>저장 경로</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.progrmStrePath}
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
                    value={registForm.progrmKoreanNm}
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
                    value={registForm.url}
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      url:e.target.value,
                    })}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 설명</CInputGroupText>
                  <CFormTextarea
                    value={registForm.progrmDc}
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

export default EgovProgramListDetailSelect
