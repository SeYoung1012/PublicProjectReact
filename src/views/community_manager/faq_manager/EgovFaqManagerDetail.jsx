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
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as EgovNet from 'src/context/egovFetch'
import EgovAttachFile from 'src/common/EgovAttachFile'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'

function EgovFaqManagerDetail() {
  const [dataForm, setDataForm] = useState({});
  const [dataAttachFiles, setDataAttachFiles] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
      try {
          const res = await axios.get(SERVER_URL+'/uss/olh/faq/selectFaqDetailAPI.do', {
              params: {
                  faqId: location.state?.faqId
              }
          })
          console.log(res);
          setDataForm(res.data.result.result);
          // setDataAttachFiles(res.data.result.resultFiles);
          
      } catch (error) {
          console.error(error);
      }
  }


  const dataDelete = async () => {
    try {
        const res = await axios({
            url: SERVER_URL+'/uss/olh/faq/deleteFaqAPI.do',
            method: "DELETE",
            params: {
                faqId: location.state?.faqId
            }
        })
        console.log(res);
        //alert(res.data.resultMessage);
        navigate('/system_manager/community_manager/EgovFaqManage');
    } catch (error) {
        console.error(error);
    }
}

const confirmDelete = () => {
  if(confirm('삭제하시겠습니까?')){
   dataDelete();
  }
}


useEffect(() => {
    getData();
}, []);


  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>FAQ 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    질문제목
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="30"
                      id='qestnSj'
                      defaultValue={dataForm.qestnSj}
                      disabled={true}
                    />
                  </CCol>
                </CRow>
                
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    조회수
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      id='inqireCo'
                      defaultValue={dataForm.inqireCo}
                      disabled={true}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    작성일
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="30"
                      id='frstRegisterPnttm'
                      defaultValue={dataForm.frstRegisterPnttm}
                      disabled={true}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    질문내용
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormTextarea
                      className="form-control form-control-sm"
                      id='qestnCn'
                      defaultValue={dataForm.qestnCn}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    답변내용
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormTextarea
                      className="form-control form-control-sm"
                      id='answerCn'
                      defaultValue={dataForm.answerCn}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

               
                 {/* 첨부파일
                 <CRow className="mb-3">
                   <CFormLabel
                    className="col-sm-2 col-form-label col-form-label-sm"
                        >
                      </CFormLabel>
                      <CCol sm={8}>
                          <EgovAttachFile boardFiles={dataAttachFiles} />
                      </CCol>
                 </CRow> */}

                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="수정"
                      onClick={() =>
                        navigate('/system_manager/community_manager/EgovFaqManagerUpdt', {
                          state: { faqId: location.state?.faqId } })}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="삭제"
                      onClick={() => confirmDelete()}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="목록"
                      onClick={() => navigate('/system_manager/community_manager/EgovFaqManager')}
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
export default EgovFaqManagerDetail
