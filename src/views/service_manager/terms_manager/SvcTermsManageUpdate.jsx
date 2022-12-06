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
import { useLocation, useNavigate } from 'react-router-dom'
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import Font from "@ckeditor/ckeditor5-font/src/font"
//import ClassicEditor from 'src/context/CustomCkeditor'

import 'src/scss/_ckeditor.css'
 

function EgovCcmCmmnDetailCodeRegist()  {
  const navigate = useNavigate();
  const location = useLocation();
  const [registForm, setRegistForm] = useState({
    useStplatId:location.state.useStplatId,
    useStplatNm:"",
    useStplatCn:"",
    infoProvdAgreCn:"",
  });
  const useStplatId=location.state.useStplatId;
  const callInfo=async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/mp/svc/trm/SelectTermsDetail.do',{
        params:{
          useStplatId:useStplatId,
        }
      })
      setRegistForm({ ...registForm,
        useStplatId:resp.data.result.result.useStplatId,
        useStplatNm:resp.data.result.result.useStplatNm,
        useStplatCn:resp.data.result.result.useStplatCn,
        infoProvdAgreCn:resp.data.result.result.infoProvdAgreCn,
      });

      console.log(registForm)
      
      
    }catch(error){
      console.log(error);
    }
  }

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.useStplatNm==null || registForm.useStplatNm=="") alert('약관 명'+CODE.ALERT_INPUT);
    else if(registForm.useStplatCn==null || registForm.useStplatCn=="") alert('약관 내용'+CODE.ALERT_INPUT)
    else if(registForm.infoProvdAgreCn==null || registForm.infoProvdAgreCn=="") alert('상세 내용'+CODE.ALERT_INPUT)


    else{
      try{
        const resp = await axios.post(SERVER_URL+'/mp/svc/trm/UpdateTerms.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(CODE.ALERT_RGST);
          navigate('/service_manager/terms_manager/SvcTermsManageDetail',{state:{useStplatId:useStplatId}})
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error);
      }
    }
  }

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_UPDT)){
      navigate(-1);
    }
  }
/*
  const test= ()=>{
    ClassicEditor.create(document.querySelector('#test'),{
      toolbar:['heading','fontFamily','redo','fontSize'],
      heading: {
                options: [
                    {
                        model: "paragraph",
                        title: "Paragraph",
                        class: "ck-heading_paragraph",
                    },
                    {
                        model: "heading1",
                        view: "h1",
                        title: "Heading 1",
                        class: "ck-heading_heading1",
                    },
                    {
                        model: "heading2",
                        view: "h2",
                        title: "Heading 2",
                        class: "ck-heading_heading2",
                    },
                ],
            },
      fontSize: {
        options: [9, 11, 13, "default", 17, 19, 21],
      },
      fontFamily: {
        options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
        ]
      },
    })
  }
*/
  useEffect(() => {
    callInfo();
    callInfo();
    //test();
    return () => {
    }
  }, []);
  
 
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>약관 수정</strong> <small></small>
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
                    value={registForm.useStplatNm}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>약관 내용</CInputGroupText>
                  <CFormInput
                    type="text"
                    maxLength="15"
                    value={registForm.useStplatCn}
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
                    data={registForm.infoProvdAgreCn}
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
};

export default EgovCcmCmmnDetailCodeRegist;