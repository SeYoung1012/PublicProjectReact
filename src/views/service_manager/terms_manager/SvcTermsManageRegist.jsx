import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import 'src/scss/_ckeditor.css'


function EgovCcmCmmnDetailCodeRegist()  {
  const navigate = useNavigate();

  const [registForm, setRegistForm] = useState({
    useAt : 'Y'
  });


  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.useStplatNm==null || registForm.useStplatNm=="") alert('약관 명'+CODE.ALERT_INPUT);
    else if(registForm.useStplatCn==null || registForm.useStplatCn=="") alert('약관 내용'+CODE.ALERT_INPUT)
    else if(registForm.infoProvdAgreCn==null || registForm.infoProvdAgreCn=="") alert('상세 내용'+CODE.ALERT_INPUT)


    else{
      try{
        const resp = await axios.post(SERVER_URL+'/mp/svc/trm/InsertTerms.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_RGST);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error);
      }
    }
  }

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_RGST)){
      navigate(-1);
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
              <strong>약관 등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
              
              <CInputGroup className="mb-3">
                  <CInputGroupText>약관 명</CInputGroupText>
                  <CFormInput
                    type="text"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      useStplatNm:e.target.value,
                    })}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>약관 내용</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    onChange={(e)=>setRegistForm({
                      ...registForm,
                      useStplatCn:e.target.value,
                    })}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>상세</CInputGroupText>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                    
                    }}
                    onChange={(event,editor)=>{
                      const data = editor.getData();
                      setRegistForm({
                        ...registForm,
                        infoProvdAgreCn:data
                      })
                    }}
                   
                    
                  ></CKEditor>
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
};

export default EgovCcmCmmnDetailCodeRegist;