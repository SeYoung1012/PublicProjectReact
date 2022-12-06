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

  const formDelete=async()=>{
    if(confirm(CODE.CONFIRM_DELETE)){
      try{
        const resp = await axios.delete(SERVER_URL+'/sym/prm/EgovProgramListManageDeleteAPI.do',{
        data:{
          ...registForm
        }})
        .then(()=>{
            alert('삭제했습니다');
            navigate('/system_manager/menu_manager/EgovProgramListManageSelect')
          }
        )
      }catch(error){
        console.log(error);
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
              <strong>프로그램 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 파일 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.progrmFileNm}
                    readOnly={true}
                    
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>저장 경로</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.progrmStrePath}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.progrmKoreanNm}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>URL</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.url}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>프로그램 설명</CInputGroupText>
                  <CFormTextarea
                    value={registForm.progrmDc}
                    readOnly={true}
                  />
                </CInputGroup>
              
                <CRow className="mb-1 justify-content-center">
                  <CCol sm={2}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="수정"
                        onClick={()=>navigate('/system_manager/menu_manager/EgovProgramListDetailSelectUpdt',{state:{progrmFileNm:progrmFileNm}})}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="삭제"
                        onClick={()=>formDelete()}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="목록"
                        onClick={()=>navigate('/system_manager/menu_manager/EgovProgramListManageSelect')}
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
