import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormCheck,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'src/context/egovFetch';
import axios from 'axios';
import EgovRadioButtonGroup from 'src/common/EgovRadioButtonGroup'
import { SERVER_URL } from 'src/context/config';

function EgovQnaManagerDetail(){
  const [dataForm, setDataForm] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const yesnoRadioGroup = [
    { value: '1', label: 'Y' },
    { value: '2', label: 'N' },
  ]


  const getData = async () => {
      try {
          const res = await axios.get(SERVER_URL+'/uss/olh/qna/selectQnaDetailAPI.do', {
              params: {
                  qaId: location.state?.qaId
              }
          })
          console.log(res);
          setDataForm(res.data.result.result);    
      } catch (error) {
          console.error(error);
      }
  }

  const dataDelete = async () => {
    try {
        const res = await axios({
            url: SERVER_URL+'/uss/olh/qna/deleteQnaAPI.do',
            method: "DELETE",
            params: {
                qaId: location.state?.qaId
            }
        })
        console.log(res);
        alert(res.data.resultMessage);
        navigate('/system_manager/community_manager/EgovQnaManager');
    } catch (error) {
        console.error(error);
    }
}


  useEffect(() => {
      getData();
  }, []);

 
  return(
    <CRow>
    <form>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Q&A ์์ธ์กฐํ</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                 ์์ฑ์
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='wrterNm'
                    name='wrterNm'
                    defaultValue={dataForm.wrterNm}
                    disabled={true}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                ์ฐ๋ฝ์ฒ
                </CFormLabel>
                <CCol sm={2}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id='areaNo'
                      name='areaNo'
                      defaultValue={dataForm.areaNo}
                      disabled={true}
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id='middleTelno'
                      name='middleTelno'
                      defaultValue={dataForm.middleTelno}
                      disabled={true}
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id='endTelno'
                      name='endTelno'
                      defaultValue={dataForm.endTelno}
                      disabled={true}
                    />
                  </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                ์ด๋ฉ์ผ์ฃผ์
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type='text'
                    className="form-control form-control-sm"
                    id='emailAdres'
                    name='emailAdres'
                    defaultValue={dataForm.emailAdres}
                    disabled={true}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ์ด๋ฉ์ผ๋ต๋ณ์ฌ๋ถ
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="emailAnswerAt"
                      radioGroup={yesnoRadioGroup}
                      setValue={dataForm.emailAnswerAt}
                      disabled={true}
                    />
                  </CCol>
                </CRow>

              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                 ์์ฑ์ผ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type='text'
                    className="form-control form-control-sm"
                    id='frstRegisterPnttm'
                    name='frstRegisterPnttm'
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
                    ์กฐํ์
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="15"
                      id='inqireCo'
                      name='inqireCo'
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
                 ์งํ์ํ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='qnaProcessSttusCodeNm'
                    name='qnaProcessSttusCodeNm'
                    defaultValue={dataForm.qnaProcessSttusCodeNm}
                    disabled={true}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                ์ง๋ฌธ์?๋ชฉ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='qestnSj'
                    name='qestnSj'
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
                ์ง๋ฌธ๋ด์ฉ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormTextarea
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='qestnCn'
                    name='qestnCn'
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
                ๋ต๋ณ๋ด์ฉ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormTextarea
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='answerCn'
                    name='answerCn'
                    defaultValue={dataForm.answerCn}
                    disabled={true}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-1 justify-content-end">
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="์์?"
                    onClick={() =>
                      navigate('/system_manager/community_manager/EgovQnaManagerUpdt', {
                        state: {
                          qaId: location.state?.qaId 
                        },
                      })
                    }
                  />
                </CCol>
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="์ญ์?"
                    onClick={() => dataDelete()}
                  />
                </CCol>
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="๋ชฉ๋ก"
                    onClick={() => navigate('/system_manager/community_manager/EgovQnaManager')}
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
export default EgovQnaManagerDetail