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
import ReactHtmlParser from 'react-html-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import 'src/scss/_ckeditor.css'


function EgovCcmCmmnDetailCodeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({ 

  });
  const useStplatId = location.state.useStplatId;

  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/mp/svc/trm/SelectTermsDetail.do',{
        params:{
          useStplatId:useStplatId,
        }
      })
      setRegistForm({...registForm,
        useStplatId:resp.data.result.result.useStplatId,
        useStplatNm:resp.data.result.result.useStplatNm,
        useStplatCn:resp.data.result.result.useStplatCn,
        infoProvdAgreCn:resp.data.result.result.infoProvdAgreCn,
      });

      test(resp.data.result.result.infoProvdAgreCn);
      
    }catch(error){
      console.log(error);
    }
  }

  const formDelete=async()=>{
    if(confirm(CODE.CONFIRM_DELETE)){
      try{
        const resp = await axios.delete(SERVER_URL+'/mp/svc/trm/DeleteTerms.do',{
          data:{
            useStplatId:registForm.useStplatId,
          }
        }).then(()=>{
            alert('삭제했습니다');
            navigate('/service_manager/terms_manager/SvcTermsManageList')
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
              <strong>약관 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CInputGroup className="mb-3">
                  <CInputGroupText>약관 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.useStplatNm}
                    readOnly={true}
                    
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>약관 내용</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.useStplatCn}
                    readOnly={true}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세</CInputGroupText>
                  <CKEditor
                    editor={ClassicEditor}
                    data={registForm.infoProvdAgreCn}
                    config={{
                      toolbar:[]
                    }}
                    onReady={editor=>{
                      editor.enableReadOnlyMode("editor");
                    }}
                  ></CKEditor>

                </CInputGroup>
                
                <CRow className="mb-1 justify-content-center">
                  <CCol sm={2}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{color:"white", backgroundColor:"navy"}}
                        value="수정"
                        onClick={()=>navigate('/service_manager/terms_manager/SvcTermsManageUpdate',{state:{useStplatId:registForm.useStplatId}})}
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
                        onClick={()=>navigate('/service_manager/terms_manager/SvcTermsManageList')}
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
