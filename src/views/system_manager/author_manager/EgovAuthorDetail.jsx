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
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';



function EgovAuthorUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 
    authorCode:"",
    authorNm:"",
    authorDc:"",
  });

  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sec/ram/EgovAuthorAPI.do',{
        params:{
          authorCode:location.state.authorCode
        }
      })
      setRegistForm({...registForm,
        authorCode:resp.data.result.result.authorCode,
        authorNm:resp.data.result.result.authorNm,
        authorDc:resp.data.result.result.authorDc,

      });
    }catch(error){
      console.error(error)
    }
  }

  const formDelete = async() => {
    if(confirm(CODE.CONFIRM_DELETE)){
      alert(registForm.authorCode);
      try{
        const resp = await axios.delete(SERVER_URL+'/sec/ram/EgovAuthorDeleteAPI.do?authorCode='+registForm.authorCode)
        .then(
          navigate('/system_manager/author_manager/EgovAuthorManage')
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
              <strong>권한관리 수정</strong> <small></small>
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
                      maxLength="30"
                      value={registForm.authorCode}
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        authorCode:e.target.value,
                      })}
                      readOnly={true}
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
                      maxLength="60"
                      value={registForm.authorNm}
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        authorNm:e.target.value,
                      })}
                      readOnly={true}
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
                      value={registForm.authorDc}
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        authorDc:e.target.value
                      })}
                      readOnly={true}
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
                        onClick={()=>navigate('/system_manager/author_manager/EgovAuthorUpdate',{state:{authorCode:registForm.authorCode}})}
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
                        onClick={()=>navigate('/system_manager/author_manager/EgovAuthorManage')}
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

export default EgovAuthorUpdate
