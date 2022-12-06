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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';
import CODE from 'src/context/code';



function EgovCcmCmmnCodeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 
    codeId:"",
    codeIdNm:"",
    codeIdDc:"",
    useAt:"",
  });
  const codeId = location.state.codeId;

  const callInfo = async() => {
    try{
      const resp = await axios.get(SERVER_URL+'/sym/ccm/cca/SelectCcmCmmnCodeDetailAPI.do',{
        params:{
          codeId:codeId
        }
      })
      console.log(resp.data)
      setRegistForm({
        ...registForm,
        codeId:resp.data.result.result.codeId,
        codeIdNm:resp.data.result.result.codeIdNm,
        codeIdDc:resp.data.result.result.codeIdDc,
        useAt:resp.data.result.result.useAt,
      })
    }catch(error){
      console.error(error);
    }
  }

  const formDelete = async() => {
    if(confirm(CODE.CONFIRM_DELETE)){
      try{
        const resp = await axios.delete(SERVER_URL+'/sym/ccm/cca/RemoveCcmCmmnCodeAPI.do?codeId='+registForm.codeId)
        .then(
          navigate('/system_manager/code_manager/CodeManager')
        )
      }catch(error){
        console.error(error);
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
              <strong>공통코드 상세조회</strong> <small></small>
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
                      maxLength="15"
                      value={registForm.codeId}
                      disabled={true}
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
                      maxLength="15"
                      value={registForm.codeIdNm}
                      disabled={true}
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
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      value={registForm.codeIdDc}
                      disabled={true}
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
                    <CFormInput
                      type="email"
                      className="form-control form-control-sm"
                      maxLength="50"
                      value={registForm.useAt}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-center">
                  <CCol sm={1}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="수정"
                        onClick={()=>navigate('/system_manager/code_manager/EgovCcmCmmnCodeUpdt',{state:{codeId:registForm.codeId}})}
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
                        onClick={()=>navigate('/system_manager/code_manager/CodeManager')}
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

export default EgovCcmCmmnCodeDetail
