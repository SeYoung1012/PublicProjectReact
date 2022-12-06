import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormTextarea, CRow,CFormCheck } from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLinkClickHandler, useLocation, useNavigate } from 'react-router-dom'
import * as EgovNet from 'src/context/egovFetch'
import axios from 'axios'
import EgovRadioButtonGroup from 'src/common/EgovRadioButtonGroup'
import { SERVER_URL } from 'src/context/config'


function EgovQnaManagerRegist() {

    const location = useLocation();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({});

    const yesnoRadioGroup = [
      { value: '1', label: 'Y' },
      { value: '2', label: 'N' },
    ]
  
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
          url: SERVER_URL+'/uss/olh/qna/insertQnaAPI.do',
          data: formData,
      });
      console.log(res);
      if (res.data.resultCode == 200) {
          navigate('/system_manager/community_manager/EgovQnaManager');
      } else {
          alert('실패');
      }
  } catch (error) {
      console.error(error);
  }
}
    
   return(
    <CRow>
    <form>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Q&A 등록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                작성자
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    onChange={handleChange}
                    id="wrterNm"
                    name="wrterNm"
                    maxLength="15"
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                연락처
                </CFormLabel>
                <CCol sm={2}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id="areaNo"
                      name='areaNo'
                      onChange={handleChange}             
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      onChange={handleChange}
                      id="middleTelno"
                      name='middleTelno'
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id="endTelno"
                      name='endTelno'
                      onChange={handleChange}     
                    />
                  </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                이메일주소
                </CFormLabel>
                <CCol sm={7}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    onChange={handleChange}
                    maxLength="15"
                    id='emailAdres'
                    name='emailAdres'
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                   이메일답변여부
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="emailAnswerAt"
                      radioGroup={yesnoRadioGroup}
                      setValue={dataForm.emailAnswerAt}
                      setter={(v) => setDataForm({ ...dataForm, emailAnswerAt: v })}
                    />
                  </CCol>
                </CRow>
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
                    maxLength="15"
                    id='qestnSj'
                    name='qestnSj'
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
                    onChange={handleChange}
                    maxLength="15"
                    id='qestnCn'
                    name='qestnCn'
                  />
                </CCol>
              </CRow>       
             
              <CRow className="mb-1 justify-content-end">
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="목록"
                    onClick={() => navigate(-1)}
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
export default EgovQnaManagerRegist