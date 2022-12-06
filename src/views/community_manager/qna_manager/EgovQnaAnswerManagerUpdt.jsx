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
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'src/context/egovFetch';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovQnaAnswerManagerUpdt(){

  const [dataForm, setDataForm] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonName, setButtonName] = useState("답변");

  const [qnaProcessCodeList, setQnaProcessCodeList] = useState([]);


  const yesnoRadioGroup = [
    { value: '1', label: 'Y' },
    { value: '2', label: 'N' },
  ]

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
              url: SERVER_URL+'/uss/olh/qna/updateQnaAnswerAPI.do',
              data: formData,
          });
          if (res.data.resultCode === 200) {
              alert('변경사항이 저장되었습니다.')
              navigate('/system_manager/community_manager/EgovQnaAnswerManager');
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
          const res = await axios.get(SERVER_URL+'/uss/olh/qna/selectQnaAnswerDetailAPI.do', {
              params: {
                  qaId: location.state?.qaId
              }
          })
          console.log(res);
          setDataForm(res.data.result.result); 
          
          if(res.data.result.result.qnaProcessSttusCode==2){
            setButtonName("수정");
          }    
            
        //진행상태 목록
        let mutInsttCodeList = [];
        mutInsttCodeList.push(<option value="">선택하세요</option>);
        
        res.data.result.codeList.forEach(function(item){
        if(item.code==res.data.result.result.qnaProcessSttusCode){
          mutInsttCodeList.push(
        <option value={item.code} selected>{item.codeNm}</option>
          );  
        }else{
        mutInsttCodeList.push(
        <option value={item.code}>{item.codeNm}</option>
          );  
        }
        });
        setQnaProcessCodeList(mutInsttCodeList);

      } catch (error) {
          console.error(error);
      }
  }

  //취소 alert창
  const formCancel = () => {
    if(confirm('변경사항이 저장되지 않습니다. 계속하시겠습니까?')){
      getData();
      navigate('/system_manager/community_manager/EgovQnaAnswerManager');
      
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
                <strong>Q&A {buttonName}</strong> <small></small>
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
                    조회수
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
                     작성자
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
                이메일주소
                </CFormLabel>
                <CCol sm={6}>
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
                     진행상태
                    </CFormLabel>
                    <CCol sm={10}>
                    <CFormSelect
                name="qnaProcessSttusCode"
                id='qnaProcessSttusCode'
                onChange={handleChange} 
                  > 
                  {qnaProcessCodeList}
              </CFormSelect>
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
                        value={dataForm.answerCn}
                        onChange={handleChange}
                       
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
                        value="저장"
                        onClick={() =>formSubmit()}
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
export default EgovQnaAnswerManagerUpdt
