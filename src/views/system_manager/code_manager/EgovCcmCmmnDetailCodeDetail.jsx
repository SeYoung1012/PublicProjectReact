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


function EgovCcmCmmnDetailCodeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 
    codeId:"",
    codeIdNm:"",
    code:"",
    codeNm:"",
    codeDc:"",
    useAt:"",
  });
  const codeId = location.state.codeId;
  const code = location.state.code;

  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cde/SelectCcmCmmnDetailCodeDetailAPI.do',{
        params:{
          code:code,
          codeId:codeId,
        }
      })
      setRegistForm({...registForm,
        codeId:resp.data.result.result.codeId,
        codeIdNm:resp.data.result.result.codeIdNm,
        code:resp.data.result.result.code,
        codeNm:resp.data.result.result.codeNm,
        codeDc:resp.data.result.result.codeDc,
        useAt:resp.data.result.result.useAt,

      });
    }catch(error){
      console.log(error);
    }
  }

  const formDelete=async()=>{
    if(confirm(CODE.CONFIRM_DELETE)){
      try{
        const resp = await axios.delete(SERVER_URL+'/sym/ccm/cde/RemoveCcmCmmnDetailCodeAPI.do',{
          data:{
            codeId:registForm.codeId,
            code:registForm.code,
          }
        }).then(()=>{
            alert('삭제했습니다');
            navigate('/system_manager/code_manager/DetailCodeManager')
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
              <strong>공통상세코드 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>코드명</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.codeIdNm}
                    readOnly={true}
                    
                  />
                  <CInputGroupText>코드ID</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.codeId}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.code}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.codeNm}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세코드 설명</CInputGroupText>
                  <CFormTextarea
                    value={registForm.codeDc}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>사용여부</CInputGroupText>
                  <CFormInput
                    type="text"
                    value={registForm.useAt}
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
                        onClick={()=>navigate('/system_manager/code_manager/EgovCcmCmmnDetailCodeUpdt',{state:{codeId:registForm.codeId, code:registForm.code}})}
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
                        onClick={()=>navigate('/system_manager/code_manager/DetailCodeManager')}
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

export default EgovCcmCmmnDetailCodeDetail
