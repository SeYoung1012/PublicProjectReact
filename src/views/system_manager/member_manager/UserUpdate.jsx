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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CODE from 'src/context/code'
import { SERVER_URL } from 'src/context/config';



function UserUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [insttCodeList, setInsttCodeList] = useState([]);
  const [passwordHintList, setPasswordHintList] = useState([]);
  const [orgnztIdList, setOrgnztIdList] = useState([]);
  const [sexdstnCodeList, setSexdstnCodeList] = useState([]);
  const [groupIdList, setGroupIdList] = useState([]);
  const [emplyrSttusCodeList, setEmplyrSttusCodeList] = useState([]);
  const [visible, setVisible] = useState(false)
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
    lockAt:"",
    uniqId:"",
    userTy:"",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword:"",
    newPassword:"",
    newPassword2:"",
    uniqId:"",
    emplyrId:"",
  })
  const uniqId = location.state.uniqId;
  const emplyrId = useRef();
  const zip = useRef();
  const homeadres = useRef();

  const formSubmit=async()=>{
    console.log(registForm);
    if(registForm.emplyrId=="") alert('아이디는 필수입력사항 입니다.');
    else if(registForm.emplyrNm=="") alert('사용자 이름은 필수입력사항 입니다.');
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
        const resp = await axios.post(SERVER_URL+'/uss/umt/EgovUserSelectUpdtAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  };//onSubmit()

  const formDelete = async() =>{
    const checkedIdForDel = registForm.userTy+":"+registForm.uniqId
    try{
      const resp = await axios.delete(SERVER_URL+'/uss/umt/EgovUserDeleteAPI.do?checkedIdForDel='+checkedIdForDel)
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

  const updatePassword = async() => {
    if(!validate_password(passwordForm.newPassword)) alert('비밀번호 형식이 올바르지 않습니다');
    else if(passwordForm.newPassword != passwordForm.newPassword2) alert('비밀번호 확인이 일치하지 않습니다');
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/uss/umt/EgovUserPasswordUpdtAPI.do',passwordForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  }

  const lockIncorrect = async() =>{
    var con = confirm('로그인인증제한을 해제하시겠습니까?');
    if(con){
      try{
        const resp = await axios.post(SERVER_URL+'/uss/umt/EgovUserLockIncorrectAPI.do',{
          uniqId:uniqId
        })
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          window.location.reload();
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  }
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
 

  const callUserInfo = async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/uss/umt/EgovUserUpdtViewAPI.do',{
        params:{
          uniqId:uniqId  
        }
      })
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      setRegistForm({...registForm,
        emplyrId:resp.data.result.userManageVO.emplyrId,
        emplyrNm:resp.data.result.userManageVO.emplyrNm,
        password:resp.data.result.userManageVO.password,
        passwordHint:resp.data.result.userManageVO.passwordHint,
        passwordCnsr:resp.data.result.userManageVO.passwordCnsr,
        insttCode:resp.data.result.userManageVO.insttCode,
        orgnztId:resp.data.result.userManageVO.orgnztId,
        ofcpsNm:resp.data.result.userManageVO.ofcpsNm,
        emplNo:resp.data.result.userManageVO.emplNo,
        sexdstnCode:resp.data.result.userManageVO.sexdstnCode,
        brth:resp.data.result.userManageVO.brth,
        areaNo:resp.data.result.userManageVO.areaNo,
        homemiddleTelno:resp.data.result.userManageVO.homemiddleTelno,
        homeendTelno:resp.data.result.userManageVO.homeendTelno,
        offmTelno:resp.data.result.userManageVO.offmTelno,
        fxnum:resp.data.result.userManageVO.fxnum,
        moblphonNo:resp.data.result.userManageVO.moblphonNo,
        emailAdres:resp.data.result.userManageVO.emailAdres,
        zip:resp.data.result.userManageVO.zip,
        homeadres:resp.data.result.userManageVO.homeadres,
        detailAdres:resp.data.result.userManageVO.detailAdres,
        groupId:resp.data.result.userManageVO.groupId,
        emplyrSttusCode:resp.data.result.userManageVO.emplyrSttusCode,
        lockAt:resp.data.result.userManageVO.lockAt,
        uniqId:resp.data.result.userManageVO.uniqId,
        userTy:resp.data.result.userManageVO.userTy
      });
      setPasswordForm({...passwordForm,
        uniqId:resp.data.result.userManageVO.uniqId,
        emplyrId:resp.data.result.userManageVO.emplyrId,
      })

      //비밀번호 힌트 목록
      let mutPasswordHintList = [];
      mutPasswordHintList.push(<option value="">선택하세요</option>);
      resp.data.result.passwordHint_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.passwordHint){
          mutPasswordHintList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );  
        }else{
          mutPasswordHintList.push(
            <option value={item.code}>{item.codeNm}</option>
          );
        }
        
      });
      setPasswordHintList(mutPasswordHintList);

      //소속기관코드 목록
      let mutInsttCodeList = [];
      mutInsttCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.insttCode_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.insttCode){
          mutInsttCodeList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );  
        }else{
          mutInsttCodeList.push(
            <option value={item.code}>{item.codeNm}</option>
          );  
        }
      });
      setInsttCodeList(mutInsttCodeList);

      //조직아이디 목록
      let mutOrgnztIdList = [];
      mutOrgnztIdList.push(<option value="">선택하세요</option>);
      resp.data.result.orgnztId_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.orgnztId){
          mutOrgnztIdList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );  
        }else{
          mutOrgnztIdList.push(
            <option value={item.code}>{item.codeNm}</option>
          );
        }
      });
      setOrgnztIdList(mutOrgnztIdList);

      //성별코드 목록
      let mutSexdstnCodeList = [];
      mutSexdstnCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.sexdstnCode_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.sexdstnCode){
          mutSexdstnCodeList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );
        }else{
          mutSexdstnCodeList.push(
            <option value={item.code}>{item.codeNm}</option>
          );
        }
        
      });
      setSexdstnCodeList(mutSexdstnCodeList);

      //그룹아이디 목록
      let mutGroupIdList = [];
      mutGroupIdList.push(<option value="">선택하세요</option>);
      resp.data.result.groupId_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.groupId){
          mutGroupIdList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );
        }else{
          mutGroupIdList.push(
            <option value={item.code}>{item.codeNm}</option>
          );
        }
        
      });
      setGroupIdList(mutGroupIdList);

      //회원상태코드 목록
      let mutEmplyrSttusCodeList = [];
      mutEmplyrSttusCodeList.push(<option value="">선택하세요</option>);
      resp.data.result.emplyrSttusCode_result.forEach(function(item){
        if(item.code==resp.data.result.userManageVO.emplyrSttusCode){
          mutEmplyrSttusCodeList.push(
            <option value={item.code} selected>{item.codeNm}</option>
          );
        }else{
          mutEmplyrSttusCodeList.push(
            <option value={item.code}>{item.codeNm}</option>
          );
        }
        
      });
      setEmplyrSttusCodeList(mutEmplyrSttusCodeList);
    }catch(error){
      console.error(error)
    }
  } //callOptionList()



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
    callUserInfo();
    return () => {
    }
  }, []);


    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>업무사용자관리 수정</strong> <small></small>
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
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      name="emplyrId"
                      onChange={(e)=>setRegistForm({...registForm,emplyrId:e.target.value})}
                      readOnly={true}
                      maxLength="20"
                      ref={emplyrId}
                      value={registForm.emplyrId}
                      disabled={true}
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
                      value={registForm.emplyrNm}
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
                      value={registForm.passwordCnsr}
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
                      value={registForm.ofcpsNm}
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
                      value={registForm.emplNo}
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
                      value={registForm.brth}
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
                      value={registForm.areaNo}
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,homemiddleTelno:e.target.value})}
                      maxLength="4"
                      value={registForm.homemiddleTelno}
                    />
                  </CCol>
                  <CCol sm={4}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,homeendTelno:e.target.value})}
                      maxLength="4"
                      value={registForm.homeendTelno}
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
                      value={registForm.offmTelno}
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
                      value={registForm.fxnum}
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
                      value={registForm.moblphonNo}
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
                      value={registForm.emailAdres}
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
                      maxLength="8"
                      onClick={e=>execDaumPostcode()}
                      value={registForm.zip}
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
                      value={registForm.homeadres}
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
                      value={registForm.detailAdres}
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

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    로그인인증제한여부
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel
                      htmlFor="colFormLabelSm"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      {registForm.lockAt=="Y"&&'예'||'아니오'}
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="취소"
                      onClick={()=>navigate('/system_manager/member_manager/UserManager')}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="저장"
                      onClick={()=>formSubmit()}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="삭제"
                      onClick={()=>formDelete()}
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="비밀번호변경"
                      onClick={()=>setVisible(true)}
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="로그인인증제한해제"
                      onClick={()=>lockIncorrect()}
                    />
                  </CCol>
                </CRow>

                

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
        </form>

        {/*비밀번호 변경 모달창*/}
        <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>비밀번호 변경</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    사용자 아이디
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={registForm.emplyrId}
                      disabled={true}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    기존 비밀번호
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setPasswordForm({...passwordForm,oldPassword:e.target.value})}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    비밀번호
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setPasswordForm({...passwordForm,newPassword:e.target.value})}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    비밀번호 확인
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setPasswordForm({...passwordForm,newPassword2:e.target.value})}
                    />
                  </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                취소
              </CButton>
              <CButton color="primary"
                      onClick={()=>updatePassword()}>수정</CButton>
            </CModalFooter>
          </CModal>
    </CRow>
    
  )
}

export default UserUpdate
