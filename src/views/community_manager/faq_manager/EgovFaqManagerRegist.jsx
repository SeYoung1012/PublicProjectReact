import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as EgovNet from 'src/context/egovFetch'
import CODE from 'src/context/code'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'

function EgovFaqManagerRegist() {
 
  const [dataForm, setDataForm] = useState({});//폼데이터
  const navigate = useNavigate();

  //dataForm 담기
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm(values => ({ ...values, [name]: value }));
}

//폼데이터 전송
const formSubmit = async () => {
    const formData = new FormData();
  
    for (let key in dataForm) {
        formData.append(key, dataForm[key]);
        console.log("dataForm [%s] ", key, dataForm[key]);
    }
    try {
        const res = await axios({
            method: 'POST',
            url: SERVER_URL+'/uss/olh/faq/insertFaqAPI.do',
            data: formData,
        });
        console.log(res);
        if (res.data.resultCode == 200) {
            navigate('/system_manager/community_manager/EgovFaqManager');
            alert('FAQ가 등록되었습니다.');
        } else {
            alert('실패');
        }
    } catch (error) {
        console.error(error);
    }
}

//취소 alert창
const formCancel = () => {
  if(confirm('현재 입력한 항목들이 전부 삭제됩니다. 취소하시겠습니까?')){
    navigate('/system_manager/community_manager/EgovFaqManager');
  }
}

return (
  <CRow>
    <form>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>FAQ 등록</strong> <small></small>
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
                    onChange={handleChange}
                    id="qestnSj"
                    name="qestnSj"
                    maxLength="15"
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
                  <CFormInput
                    type="textarea"
                    className="form-control form-control-sm"
                    id="qestnCn"
                    name="qestnCn"
                    onChange={handleChange}
                    maxLength="15"
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
                  <CFormInput
                    type="textarea"
                    className="form-control form-control-sm"
                    id="answerCn"
                    name="answerCn"
                    onChange={handleChange}
                    maxLength="15"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-1 justify-content-end">
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="취소"
                    onClick={() => formCancel()}
                  />
                </CCol>
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="등록"
                    onClick={() => formSubmit()}
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
export default EgovFaqManagerRegist
