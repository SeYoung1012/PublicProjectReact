import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import TreeView from 'src/context/TreeView';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovMenuCreatInsert()  {
  const location = useLocation();
  const navigate = useNavigate();
  const [tree, setTree] = useState();
  const [registForm, setRegistForm] = useState({});
  const [authorCodeS, setAuthorCodeS] = useState();

  const authorCodeList = [];

  const checkBoxClick=useCallback(
    (prop)=>{
      onCheckBoxClick(prop);
    },
    []
  );
  function onCheckBoxClick(item){

    console.log(item);
    if(item.state==1){
      authorCodeList.push(item.id);
      if(item.children != null){
        for(var i=0; i<item.children.length; i++){
          var prop = item.children[i].id;
          authorCodeList.find(function(element,index){
            if(prop == element){
              authorCodeList.splice(index,1);
              
            }
          })
          authorCodeList.push(item.children[i].id);
        }
      }

    }else if(item.state==2){
      authorCodeList.find(function(element,index){
        if(item.id == element){
          authorCodeList.splice(index,1);
        }
      })
      if(item.children != null && item.children != ''){
        console.log(item.children);
        for(var i=0; i<item.children.length; i++){
          var prop = item.children[i].id;
          authorCodeList.find(function(element,index){
            if(prop == element){
              authorCodeList.splice(index,1);
              
            }
          })
        }
      }
    }
    console.log('authorCodeList = '+authorCodeList);
    setAuthorCodeS(authorCodeList);
  }

  const callMenuInfo = async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/mnu/mcm/EgovMenuCreatSelectAPI.do',{
        params:{
          authorCode:location.state.authorCode
        }
      })
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      setTree(resp.data.result.list_menulist);
    }catch(error){
      console.error(error)
    }
  } 
 
  useEffect(() => {
      callMenuInfo();
      return () => {
      }
  }, []);

  const formSubmit = async() => {
    var checkedMenuNoForInsert = authorCodeS.toString();
    try{
      const resp = await axios.post(SERVER_URL+'/sym/mnu/mcm/EgovMenuCreatInsertAPI.do',{
        checkedAuthorForInsert : location.state.authorCode,
        checkedMenuNoForInsert : checkedMenuNoForInsert,
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
    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>메뉴 등록</strong> <small></small>
              <input type="hidden" value={registForm}></input>
            </CCardHeader>
            <CCardBody>
            <CForm className="row g-3 d-flex justify-content-end">
          
              <CCol md={2}>
              </CCol>
              <CCol md={5}>
                <CInputGroup>
                    <CInputGroupText>권한코드</CInputGroupText>
                    <CFormInput  name="searchKeyword" type="text" size="35" 
                            value={location.state.authorCode}
                            readOnly={true}
                            
                            maxLength="255"/>
                </CInputGroup>
              </CCol>
              <CCol md={2}>
              <CFormInput  type="button"
                      value="메뉴생성"
                      onClick={()=>formSubmit(authorCodeList)}
                      />
              </CCol>
              <CCol md={2}>
              <CFormInput  type="button"
                      value="사이트맵생성"
                      onClick={()=>navigate('/system_manager/menu_manager/EgovMenuRegist')}
                      />
              </CCol>
            </CForm>
              <CRow className="mb-3 justify-content-center">
                <TreeView prop={tree}  checkBoxClick={checkBoxClick}/>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>


        </form>

    </CRow>
    
  )
};

export default EgovMenuCreatInsert;