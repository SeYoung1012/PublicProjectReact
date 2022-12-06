import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CODE from 'src/context/code'
import { SERVER_URL } from 'src/context/config';



function UserManager() {
  const navigate = useNavigate();
  const [insttCodeList, setInsttCodeList] = useState([]);
  const [passwordHintList, setPasswordHintList] = useState([]);
  const [orgnztIdList, setOrgnztIdList] = useState([]);
  const [sexdstnCodeList, setSexdstnCodeList] = useState([]);
  const [groupIdList, setGroupIdList] = useState([]);
  const [emplyrSttusCodeList, setEmplyrSttusCodeList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [idCheckResult, setIdCheckResult] = useState('결과 : 중복확인을 실행하십시오');
  const [idCheckResultColor, setIdCheckResultColor] = useState('"black"');
  const [registForm, setRegistForm] = useState({
    emplyrId:"",
    emplyrNm:"",
    password:"",
    passwordHint:"",
    passwordCnsr:"",
    insttCode:"",
    orgnztId:"",
    ofcpsNm:"",
    emplNo:"",
    sexdstnCode:"",
    brth:"",
    areaNo:"",
    homemiddleTelno:"",
    homeendTelno:"",
    offmTelno:"",
    fxnum:"",
    moblphonNo:"",
    emailAdres:"",
    zip:"",
    homeadres:"",
    detailAdres:"",
    groupId:"",
    emplyrSttusCode:"",
    
  });
  
  const emplyrId = useRef();
  const zip = useRef();
  const homeadres = useRef();
  const mordalEmplyrId = useRef(); //아이디

  const [password2, setPassword2] = useState();

  const formSubmit = async()=>{
    console.log(registForm);
    if(registForm.emplyrId=="") alert('아이디는 필수입력사항 입니다.');
    else if(registForm.emplyrNm=="") alert('사용자 이름은 필수입력사항 입니다.')
    else if(registForm.password=="") alert('비밀번호는 필수입력사항 입니다.');
    else if(!validate_password(registForm.password)) alert('비밀번호 형식이 올바르지 않습니다.')
    else if(registForm.password != password2) alert('비밀번호 확인이 올바르지 않습니다.');
    else if(registForm.passwordHint=="") alert('비밀번호 힌트를 선택해주세요');
    else if(registForm.passwordCnsr=="") alert('비밀번호 정답을 입력해주세요');
    else if(!validate_number(registForm.brth)) alert('생년월일은 숫자만 입력가능합니다');
    else if(registForm.areaNo=="") alert('전화번호는 필수 입력사항 입니다.')
    else if(!validate_number(registForm.areaNo)) alert('전화번호는 숫자만 입력가능합니다');
    else if(registForm.homemiddleTelno=="") alert('전화번호는 필수 입력사항 입니다.')
    else if(!validate_number(registForm.homemiddleTelno)) alert('전화번호는 숫자만 입력가능합니다');
    else if(registForm.homeendTelno=="") alert('전화번호는 필수 입력사항 입니다.')
    else if(!validate_number(registForm.homeendTelno)) alert('전화번호는 숫자만 입력가능합니다');
    else if(!validate_number(registForm.offmTelno)) alert('사무실 전화번호는 숫자만 입력가능합니다');
    else if(!validate_number(registForm.fxnum)) alert('팩스번호는 숫자만 입력가능합니다.');
    else if(!validate_number(registForm.moblphonNo)) alert('핸드폰 번호는 숫자만 입력가능합니다');
    else if(registForm.emailAdres=="") alert('이메일주소는 필수입력사항 입니다');
    else if(!validate_email(registForm.emailAdres)) alert('이메일 형식이 올바르지 않습니다')
    else if(registForm.zip=="") alert('주소는 필수입력사항 입니다');
    else if(registForm.groupId=="") alert('그룹아이디를 선택해주세요')
    else if(registForm.emplyrSttusCode=="") alert('회원상태코드를 입력해주세요');

    else{
      try{
        const resp = await axios.post(SERVER_URL+'/uss/umt/EgovUserInsertAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          navigate('/system_manager/member_manager/UserManager')
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  };

  function validate_password(test) {
		var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*?])[A-Za-z\d~!@#$%^&*?]{8,}$/);
		return pattern.test(test);		
	}
  function validate_number(test){
    var pattern = new RegExp(/[0-9]/g)
    return pattern.test(test);
  }
  function validate_email(test){
    var pattern = new RegExp(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    return pattern.test(test);
  }
 
  const callOptionList = async() =>{
    try{
      const resp = await axios.get(SERVER_URL+'/uss/umt/EgovUserInsertOptionAPI.do')
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      //비밀번호 힌트 목록
      let mutPasswordHintList = [];
      mutPasswordHintList.push(<option value="">선택하세요</option>);
      resp.data.result.passwordHint_result.forEach(function(item){
        mutPasswordHintList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setPasswordHintList(mutPasswordHintList);

      //소속기관코드 목록
      let mutInsttCodeList = [];
      mutInsttCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.insttCode_result.forEach(function(item){
        mutInsttCodeList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setInsttCodeList(mutInsttCodeList);

      //조직아이디 목록
      let mutOrgnztIdList = [];
      mutOrgnztIdList.push(<option value="">선택하세요</option>);
      resp.data.result.orgnztId_result.forEach(function(item){
        mutOrgnztIdList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setOrgnztIdList(mutOrgnztIdList);

      //성별코드 목록
      let mutSexdstnCodeList = [];
      mutSexdstnCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.sexdstnCode_result.forEach(function(item){
        mutSexdstnCodeList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setSexdstnCodeList(mutSexdstnCodeList);

      //그룹아이디 목록
      let mutGroupIdList = [];
      mutGroupIdList.push(<option value="">선택하세요</option>);
      resp.data.result.groupId_result.forEach(function(item){
        mutGroupIdList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setGroupIdList(mutGroupIdList);

      //회원상태코드 목록
      let mutEmplyrSttusCodeList = [];
      mutEmplyrSttusCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.emplyrSttusCode_result.forEach(function(item){
        mutEmplyrSttusCodeList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setEmplyrSttusCodeList(mutEmplyrSttusCodeList);
    }catch(error){
      console.error(error)
    }
  }

  const idDplctCnfirm = async() =>{
    let id = mordalEmplyrId.current.value;
    try{
      const resp = await axios.get(SERVER_URL+'/uss/umt/EgovIdDplctCnfirmAPI.do',{
        params:{
          id:id
        }
      })
      if(resp.data.result.usedCnt > 0){
        setIdCheckResult('결과 : 사용할 수 없는 아이디입니다.');
        setIdCheckResultColor('RED');
      }else{
        setIdCheckResult('결과 : 사용가능한 아이디입니다.');
        setIdCheckResultColor('GREEN');
      }
    }catch(error){
      console.error(error)
    }
  }

  const idDplctCnfirmOk = async() =>{
    let id = mordalEmplyrId.current.value;
    try{
      const resp = await axios.get(SERVER_URL+'/uss/umt/EgovIdDplctCnfirmAPI.do',{
        params:{
          id:id
        }
      })
      if(resp.data.result.usedCnt > 0){
        alert(id+'는 사용할 수 없는 아이디입니다');
        setIdCheckResult('결과 : 사용할 수 없는 아이디입니다.');
        setIdCheckResultColor('RED');
      }else{
        emplyrId.current.value=id;
        setRegistForm({...registForm,emplyrId:id});
        setVisible(false);
        setIdCheckResult('결과 : 사용가능한 아이디입니다.');
        setIdCheckResultColor('GREEN');
      }
    }catch(error){
      console.error(error)
    }
  }

  function execDaumPostcode() {
    daum.postcode.load(function(){
        new daum.Postcode({
            oncomplete: function(data) {
              
              zip.current.value=data.zonecode;
              homeadres.current.value=data.roadAddress;
              setRegistForm({...registForm,zip:data.zonecode, homeadres:data.roadAddress});
              
            }
        }).open();
    });
  }
  
  useEffect(() => {
    callOptionList();
    return () => {
    }
  }, []);


    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>업무사용자관리 등록</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    사용자 아이디
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="emplyrId"
                      onChange={(e)=>setRegistForm({...registForm,emplyrId:e.target.value})}
                      readOnly={true}
                      maxLength="20"
                      ref={emplyrId}
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="중복 확인"
                      onClick={() => {setVisible(!visible);setIdCheckResult('결과 : 중복확인을 실행하십시오');setIdCheckResultColor('black')}}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    사용자 이름
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="emplyrNm"
                      onChange={(e)=>setRegistForm({...registForm,emplyrNm:e.target.value})}
                      maxLength="60"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    비밀번호
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="password"
                      className="form-control form-control-sm"
                      name="password"
                      onChange={(e)=>setRegistForm({...registForm,password:e.target.value})}
                      maxLength="20"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel
                    className="col-form-label col-form-label-sm">
                    - 8이상 20자리 이하<br/>
                    - 영문자,숫자,특수문자(~!@#$%^&*?)의 조합<br/>
                    - 3자리 이상 반복 또는 연속된 문자 사용 금지. 예)kkk , 321 등 사용금지
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    비밀번호확인
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="password"
                      className="form-control form-control-sm"
                      name="password2"
                      onChange={(e)=>setPassword2(e.target.value)}
                      maxLength="20"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    비밀번호힌트
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      name="passwordHint"
                      onChange={(e)=>setRegistForm({...registForm,passwordHint:e.target.value})}
                    >
                      {passwordHintList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    비밀번호정답
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="passwordCnsr"
                      onChange={(e)=>setRegistForm({...registForm,passwordCnsr:e.target.value})}
                      maxLength="100"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    소속기관코드
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      name="insttCode"
                      onChange={(e)=>setRegistForm({...registForm,insttCode:e.target.value})}
                    >
                      {insttCodeList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    조직아이디
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      name="orgnztId"
                      onChange={(e)=>setRegistForm({...registForm,orgnztId:e.target.value})}
                    >
                      {orgnztIdList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    직위
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,ofcpsNm:e.target.value})}
                      maxLength="50"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    사번
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="emplNo"
                      onChange={(e)=>setRegistForm({...registForm,emplNo:e.target.value})}
                      maxLength="20"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    성별구분코드
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      name="sexdstnCode"
                      onChange={(e)=>setRegistForm({...registForm,sexdstnCode:e.target.value})}
                    >
                      {sexdstnCodeList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    생일
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="brth"
                      onChange={(e)=>setRegistForm({...registForm,brth:e.target.value})}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    집전화번호
                  </CFormLabel>
                  <CCol sm={2}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,areaNo:e.target.value})}
                      maxLength="4"
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,homemiddleTelno:e.target.value})}
                      maxLength="4"
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,homeendTelno:e.target.value})}
                      maxLength="4"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    사무실번호
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,offmTelno:e.target.value})}
                      maxLength="15"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    팩스번호
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,fxnum:e.target.value})}
                      maxLength="15"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    핸드폰번호
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,moblphonNo:e.target.value})}
                      maxLength="15"
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
                      type="email"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,emailAdres:e.target.value})}
                      maxLength="50"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    우편번호
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      readOnly={true}
                      ref={zip}
                      onClick={e=>execDaumPostcode()}
                    />
                  </CCol>
                </CRow>
                
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    주소
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      readOnly={true}
                      ref={homeadres}
                      maxLength="100"
                      onClick={e=>execDaumPostcode()}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    상제주소
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,detailAdres:e.target.value})}
                      maxLength="100"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    그룹아이디
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,groupId:e.target.value})}
                    >
                      {groupIdList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    회원상태코드
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,emplyrSttusCode:e.target.value})}
                      
                    >
                      {emplyrSttusCodeList}
                    </CFormSelect>
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="목록"
                      onClick={()=>navigate('/system_manager/member_manager/UserManager')}
                    />
                  </CCol>
                  <CCol sm={1}>
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

        {/*아이디 중복확인 모달*/}
        <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>아이디 중복 확인</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow className="mb-3 justify-content-center">
                사용할 아이디 : 
                <CCol sm={9}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    ref={mordalEmplyrId}
                    maxLength="20"
                  />
                </CCol>
              </CRow>
              <p style={{color:idCheckResultColor}}>{idCheckResult}</p>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                닫기
              </CButton>
              <CButton color="primary"
                      onClick={()=>idDplctCnfirm()}>조회</CButton>
              <CButton color="primary"
                      onClick={()=>idDplctCnfirmOk()}>확인</CButton>
            </CModalFooter>
          </CModal>
        </form>
    </CRow>
    
  )
}

export default UserManager
