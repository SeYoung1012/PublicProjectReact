import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CODE from 'src/context/code';
import * as EgovNet from 'src/context/egovFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as CustomAxios from 'src/context/CustomAxios';
import CustomAxios2 from 'src/context/CustomAxios2'
import { SERVER_URL } from 'src/context/config'


const Login = (props) => {

  const loginVO = props.loginVO;
  const setLoginVO = props.setLoginVO;
  const navigate = useNavigate();
/*
  function login(){
    console.log(loginVO);
    var url = '/uat/uia/actionLoginJWT.do'
    var option = {
      
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(loginVO)
      
    }

    EgovNet.requestFetch(url, option,
      (resp) => {
        

        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
            
            sessionStorage.setItem('memId',resp.resultVO.id);
            navigate('/');
        } else {
            alert('계정 정보가 일치하지 않습니다');
        }
      },
      function (resp) {
          console.log("err response : ", resp);
      }
    )
  }*/
  const login = async() => {
    try{
      const resp = await axios.post(SERVER_URL+"/uat/uia/actionLoginAPI.do",loginVO);
      if(resp.data.resultCode==CODE.RCV_SUCCESS){
        sessionStorage.setItem('memId',resp.data.resultVO.id);
        navigate('/');
      }else{
        alert('계정 정보가 일치하지 않습니다');
      }
    }catch(error){
      console.error(error)
    }

  }
  const axlogin = async() => {
    const resp = await axios.post("http://172.30.1.89:9999/uat/uia/axlogin.do",{},{
  
    });
    alert(resp.data.id);
  }
  const felogin = async() => {
    var url = '/uat/uia/felogin.do'
    var option = {
      
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify()
      
    }

    EgovNet.requestFetch(url, option,
      (resp) => {
        

        alert(resp.id)
      },
      function (resp) {
          console.log("err response : ", resp);
      }
    )
  }
  const axcon = async() => {
    const resp = await CustomAxios.post("/uat/uia/axcon.do",{},{
    });
    alert(resp.data.id);
  }
  const fecon = async() => {
    var url = '/uat/uia/fecon.do'
    var option = {
      
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify()
      
    }

    EgovNet.requestFetch(url, option,
      (resp) => {
        

        alert(resp.id)
      },
      function (resp) {
          console.log("err response : ", resp);
      }
    )
  }
  const axlogin2 = async() => {
    const resp = await CustomAxios2.get("/uat/uia/axlogin.do",
      {params:{
        a:'aa'
      }
    });
    alert(resp.data.id);
  }


  const axcon2 = async() => {
    const resp = await CustomAxios2.post("/uat/uia/axlogin.do",{});
    alert(resp.data.id);
  }
  
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>업무사용자 로그인</h1>
                    <p className="text-medium-emphasis">기타 문구</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="ID" autoComplete="username"
                        onChange={(e)=>setLoginVO({...loginVO,id:e.target.value})} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e)=>setLoginVO({...loginVO,password:e.target.value})}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4"
                          onClick={()=>login()}>
                          로그인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>axlogin()}>
                          엑시로그인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>axcon()}>
                          엑시확인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>felogin()}>
                          페치로그인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>fecon()}>
                          페치확인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>axlogin2()}>
                          엑시인증로그인
                        </CButton>
                        <CButton color="primary" className="px-4"
                          onClick={()=>axcon2()}>
                          엑시인증확인
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>원패스</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
