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

function EgovImproveRequestManagerDetail(){
  const [dataForm, setDataForm] = useState({});
  const navigate = useNavigate();
  const location = useLocation();



  const getData = async () => {
      try {
          const res = await axios.get(SERVER_URL+'/mp/cst/irm/SelectImproveRequestDetail.do', {
              params: {
                srvcId: location.state?.srvcId
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
            url: SERVER_URL+'/mp/cst/irm/DeleteImproveRequestManageView.do',
            method: "DELETE",
            params: {
              srvcId: location.state?.srvcId
            }
        })
        console.log(res);
        alert(res.data.resultMessage);
        navigate('/community_manager/serviceImprovement_manager/EgovImproveRequestManager');
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
            <strong>서비스 개선요청 상세조회</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                 제목
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    maxLength="30"
                    id='srvcTtl'
                    name='srvcTtl'
                    defaultValue={dataForm.srvcTtl}
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
                <CCol sm={2}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      maxLength="4"
                      id='wrtYmd'
                      name='wrtYmd'
                      defaultValue={dataForm.wrtYmd}
                      disabled={true}
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
                    이메일답변여부
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
                 작성일
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
                 진행상태
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
                질문제목
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
                질문내용
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
                답변내용
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
                    value="수정"
                    onClick={() =>
                      navigate('/community_manager/serviceImprovement_manager/EgovImproveRequestManagerUpdt', {
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
                    value="삭제"
                    onClick={() => dataDelete()}
                  />
                </CCol>
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="목록"
                    onClick={() => navigate('/community_manager/serviceImprovement_manager/EgovImproveRequestManager')}
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
export default EgovImproveRequestManagerDetail