import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CTable,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import {Pagination} from 'src/context/Pagination';
import TreeView from 'src/context/TreeView';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovMenuRegist()  {
  const location = useLocation();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const navigate = useNavigate();
  const [tree, setTree] = useState();
  const [registForm, setRegistForm] = useState({});
  const [ upperMenuId, setUpperMenuId] = useState();
  const [progrmFileNm, setProgrmFileNm] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [prmVisible, setPrmVisible] = useState(false);
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();
  let menuNoRef = useRef();
  let menuOrdrRef = useRef();
  let menuNmRef = useRef();
  let upperMenuIdRef = useRef();
  let progrmFileNmRef = useRef();
  let relateImageNmRef = useRef();
  let relateImagePathRef = useRef();
  let menuDcRef = useRef();

  const menuMordalClick=useCallback(
    (prop)=>{
      onMenuMordalClick(prop);
    },
    []
  );
  function onMenuMordalClick(prop){

    setMenuVisible(false);
    setUpperMenuId(prop.menuNo);
  }

  const onPrmMordalClick=(prop)=>{
    setProgrmFileNm(prop);
    setPrmVisible(false);
    a(prop);
  }
  function a(prop){
    setRegistForm(()=>({
      ...registForm,
      progrmFileNm : prop
    }))
  }

  const callMenuInfo = async()=>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/mnu/mpm/EgovMenuListSelectAPI.do')
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      setTree(resp.data.result.list_menulist);
    }catch(error){
      console.error(error)
    }
  }

  const callPrmInfo = async(searchVO) => {
    try{
      const resp = await axios.get(SERVER_URL+'/sym/prm/EgovProgramListSearchNewAPI.do',{
        params:searchVO
      })
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }
      let mutResultList = [];
      let mutTree = [];
      
      resp.data.result.list_progrmmanage.forEach(function (item, index) {
          if (index === 0) mutResultList = []; // 목록 초기화
          mutResultList.push(
              <CTableRow onClick={()=>onPrmMordalClick(item.progrmFileNm)}>
                <CTableDataCell scope="row">{item.progrmFileNm}</CTableDataCell>
                <CTableDataCell>{item.progrmKoreanNm}</CTableDataCell>
              </CTableRow>
          );


      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,callPrmInfo)
      )
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
      callMenuInfo();
      callPrmInfo(searchVO);
      return () => {
      }
  }, []);

  const formSubmit=async()=>{
    
    console.log(registForm);
    console.log("ref="+menuNoRef.current.value+"/"+progrmFileNmRef.current.value+"/"+relateImageNmRef.current.value);
    
    if(menuNoRef.current.value==null || menuNoRef.current.value=="") alert('메뉴No는 필수입력사항 입니다');
    else if(menuOrdrRef.current.value==null || menuOrdrRef.current.value=="") alert('메뉴순서는 필수입력사항 입니다')
    else if(menuNmRef.current.value==null || menuNmRef.current.value=="") alert('메뉴명은 필수입력사항 입니다.')
    else if(upperMenuIdRef.current.value==null || upperMenuIdRef.current.value=="") alert('상위메뉴No는 필수입력사항 입니다.');
    else if(progrmFileNmRef.current.value==null || progrmFileNmRef.current.value=="") alert('프로그램파일명 필수입력사항 입니다.');
    else if(relateImageNmRef.current.value==null || relateImageNmRef.current.value=="") alert('관련이미지명 필수입력사항 입니다.');
    else if(relateImagePathRef.current.value==null || relateImagePathRef.current.value=="") alert('관련이미지경로는 필수입력사항 입니다.');
    else if(menuDcRef.current.value==null || menuDcRef.current.value=="") alert('메뉴설명은 필수입력사항 입니다.');
    else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/mnu/mpm/EgovMenuManageInsertAPI.do',{
          menuNo:menuNoRef.current.value,
          menuOrdr:menuOrdrRef.current.value,
          menuNm:menuNmRef.current.value,
          upperMenuId:upperMenuIdRef.current.value,
          progrmFileNm:progrmFileNmRef.current.value,
          relateImageNm:relateImageNmRef.current.value,
          relateImagePath:relateImagePathRef.current.value,
          menuDc:menuDcRef.current.value,
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
  };
    
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
            <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    메뉴No
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        menuNo : e.target.value,
                      })}
                      ref={menuNoRef}
                      maxLength="20"
                      
                    />
                  </CCol>
                  
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    메뉴순서
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        menuOrdr : e.target.value,
                      })}
                      ref={menuOrdrRef}
                      maxLength="60"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    메뉴명
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        menuNm : e.target.value,
                      })}
                      ref={menuNmRef}
                      maxLength="20"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    상위메뉴No
                  </CFormLabel>
                  <CCol sm={7}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      ref={upperMenuIdRef}
                      value={upperMenuId}
                      maxLength="20"
                      
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="ㅇ"
                      onClick={()=>setMenuVisible(true)}
                    />
                  </CCol>
                </CRow>

                

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    파일명
                  </CFormLabel>
                  <CCol sm={7}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        progrmFileNm:e.target.value
                      })}
                      ref={progrmFileNmRef}
                      value={progrmFileNm}                      
                      maxLength="60"
                      
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="ㅇ"
                      onClick={()=>setPrmVisible(true)}
                    />
                  </CCol>
                </CRow>

                

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    관련이미지명
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        relateImageNm : e.target.value,
                      })}
                      ref={relateImageNmRef}
                      maxLength="60"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    관련이미지경로
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        relateImagePath : e.target.value,
                      })}
                      ref={relateImagePathRef}
                      maxLength="100"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    메뉴설명
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormTextarea
                      type="textarea"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({
                        ...registForm,
                        menuDc : e.target.value,
                      })}
                      ref={menuDcRef}
                      
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="목록"
                      onClick={()=>navigate(-1)}
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


        </form>

      {/*상위메뉴찾기 모달*/}
      <CModal backdrop="static" visible={menuVisible} onClose={() => setMenuVisible(false)}>
          <CModalHeader>
            <CModalTitle>메뉴 목록</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="mb-3 justify-content-center">
              <TreeView prop={tree} treeClick={menuMordalClick}/>
            </CRow>
            
          </CModalBody>
          <CModalFooter>
            
          </CModalFooter>
        </CModal>

      {/*프로그램명 찾기 모달*/}
      <CModal backdrop="static" visible={prmVisible} onClose={() => setPrmVisible(false)}>
          <CModalHeader>
            <CModalTitle>메뉴 목록</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={8}>
            <CInputGroup>
                <CInputGroupText>메뉴명</CInputGroupText>
                <CFormInput  name="searchKeyword" type="text" size="35" 
                        onChange={(e)=>setSearchVO({
                            ...searchVO,searchKeyword:e.target.value
                        })}
                        
                        maxLength="255"/>
            </CInputGroup>
          </CCol>
          <CCol md={3}>
          <CFormInput  type="button"
                  value="조회"
                  onClick={()=>callPrmInfo(searchVO)}
                  />
          </CCol>
          </CForm>
          <DocsExample >

            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">프로그램파일명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">프로그램명</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {resultList}
                  
                  

              </CTableBody>
              
            </CTable>
            {pageButton}
          </DocsExample>
            
          </CModalBody>
          <CModalFooter>
          
          </CModalFooter>
        </CModal>
    </CRow>
    
  )
};

export default EgovMenuRegist;