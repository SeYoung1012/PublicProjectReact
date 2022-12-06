import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLinkClickHandler, useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'src/context/egovFetch';
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovFaqManagerUpdt(){

  const [dataForm, setDataForm] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm(values => ({ ...values, [name]: value }));
}

 //수정
 const formSubmit = async () => {
  const formData = new FormData();
  for (let key in dataForm) {
      formData.append(key, dataForm[key]);
      console.log("dataForm [%s] ", key, dataForm[key]);
  }
  try {
      const res = await axios({
          method: 'POST',
          url: SERVER_URL+'/uss/olh/faq/updateFaqAPI.do',
          data: formData,
      });
      if (res.data.resultCode === 200) {
          alert('변경사항이 저장되었습니다.');
          navigate('/system_manager/community_manager/EgovFaqManager');
      } else {
          alert('실패');
      }
  } catch (error) {
      console.error(error);
  }
}


  //상세 불러오기
  const getData = async () => {
      try {
          const res = await axios.get(SERVER_URL+'/uss/olh/faq/selectFaqDetailAPI.do', {
              params: {
                  faqId: location.state?.faqId
              }
          })
          console.log(res);
          setDataForm(res.data.result.result);
          
      } catch (error) {
          console.error(error);
      }
  }

  //취소 alert창
  const formCancel = () => {
    if(confirm('변경사항이 저장되지 않습니다. 계속하시겠습니까?')){
      navigate('/system_manager/community_manager/EgovFaqManager');
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
            <strong>FAQ 수정</strong> <small></small>
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
                    name="qestnSj"
                    id='qestnSj'
                    value={dataForm.qestnSj || ''}
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
                  질문내용
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="textarea"
                    className="form-control form-control-sm"
                    id='qestnCn'
                    name='qestnCn'
                    value={dataForm.qestnCn || ''}
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
                    id='answerCn'
                    name='answerCn'
                    value={dataForm.answerCn || ''}
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
                    style={{color:"white", backgroundColor:"navy"}}
                    value="취소"
                    onClick={()=>formCancel()}
                  />
                </CCol>
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{color:"white", backgroundColor:"navy"}}
                    value="수정"
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



}
export default EgovFaqManagerUpdt