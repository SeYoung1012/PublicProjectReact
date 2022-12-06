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
  CCardFooter,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination';
import TreeView from 'src/context/TreeView';
import axios from 'axios';
import CODE from 'src/context/code'
import { SERVER_URL } from 'src/context/config';
import CustomAxios2 from 'src/context/CustomAxios2';
import * as CustomAxios from 'src/context/CustomAxios';


const MenuManager = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [resultList, setResultList] = useState();
    const [pageButton, setPageButton] = useState();
    const [tree, setTree] = useState();
    const [menuInfo, setMenuInfo] = useState({
      menuNo : "",
      menuOrdr : "",
      menuNm : "",
      upperMenuId : "",
      menuDc : "",
      relateImagePath : "",
      relateImageNm : "",
      progrmFileNm : "",
    });
    const [menuVisible, setMenuVisible] = useState(false);
    const [prmVisible, setPrmVisible] = useState(false);

    const retrieveList = async(searchVO) => {
      try{
        const resp = await CustomAxios2.get('/sym/mnu/mpm/EgovMenuManageSelectAPI.do',{
          params:searchVO
        })
        if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
          alert(resp.data.resultMessage);
          navigate(-1);
        }
        let mutResultList = [];
        let mutTree = [];

        resp.data.result.list_menumanage.forEach(function (item, index) {
            if (index === 0) mutResultList = []; // 목록 초기화
            mutResultList.push(
                <CTableRow onClick={()=>navigate('/system_manager/menu_manager/EgovMenuDetail',{state:{menuNo:item.menuNo}})}>
                  <CTableDataCell scope="row">{index+resp.data.result.paginationInfo.firstRecordIndex+1}</CTableDataCell>
                  <CTableDataCell scope="row">{item.menuNo}</CTableDataCell>
                  <CTableDataCell>{item.menuNm}</CTableDataCell>
                  <CTableDataCell>{item.progrmFileNm}</CTableDataCell>
                  <CTableDataCell>{item.menuDc}</CTableDataCell>
                  <CTableDataCell>{item.upperMenuId}</CTableDataCell>
                
                </CTableRow>
            );
        });
        setResultList(mutResultList);
        
        setPageButton(
          Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
        )
      }catch(error){
        console.error(error)
      }
    }

    const treeClick=useCallback(
      (prop)=>{
        onTreeClick(prop);
      },
      []
    );
    function onTreeClick(prop){
      setMenuInfo(prop);
    }

    const menuMordalClick=useCallback(
      (prop)=>{
        onMenuMordalClick(prop);
      },
      []
    );
    function onMenuMordalClick(prop){
      setMenuInfo({
        ...menuInfo,
        upperMenuId : prop.menuNo,
      });
      setMenuVisible(false)
    }

    const prmMordalClick=useCallback(
      (prop)=>{
        onPrmMordalClick(prop);
      },
      []
    );
    function onPrmMordalClick(prop){
      setMenuInfo({
        ...menuInfo,
        progrmFileNm : prop.progrmFileNm,
      });
    }

    const retrieveAllMenuList = async() => {
      try{
        const resp = await CustomAxios2.get('/sym/mnu/mpm/EgovMenuListSelectAPI.do')
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
        retrieveList(searchVO);
        retrieveAllMenuList();
        return () => {
        }
    }, []);

  return (
    <CRow>
        <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>메뉴관리리스트</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3 d-flex justify-content-end">
          
          <CCol md={2}>
          <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="">선택하세요</option>
              <option value="1">메뉴 번호</option>
              <option value="2">메뉴 명</option>
            </CFormSelect>
          </CCol>
          <CCol md={5}>
      

                <CFormInput  name="searchKeyword" type="text" size="35" 
                        onChange={(e)=>setSearchVO({
                            ...searchVO,searchKeyword:e.target.value
                        })}
                        
                        maxLength="255"/>
  
          </CCol>
          <CCol md={1}>
          <CFormInput  type="button"
                  value="조회"
                  onClick={()=>retrieveList(searchVO)}
                  />
          </CCol>
          <CCol md={1}>
          <CFormInput  type="button"
                  value="등록"
                  onClick={()=>navigate('/system_manager/menu_manager/EgovMenuRegist')}
                  />
          </CCol>
          </CForm>
          

          

          <DocsExample >
            <CTable hover>
              <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">메뉴 번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">메뉴 명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">프로그램 파일 명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">상위 메뉴 번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">메뉴 설명</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {resultList}
                  
                  

              </CTableBody>
              
            </CTable>
          </DocsExample>
          
                
      
          </CCardBody>
          <CCardFooter>
            {pageButton}
            </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>메뉴목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>

            <TreeView prop={tree} treeClick={treeClick}/>

          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Card</strong> <small>Body</small>
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
                      value={menuInfo.menuNo}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        menuNo : e.target.value,
                      })}
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
                      value={menuInfo.menuOrdr}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        menuOrdr : e.target.value,
                      })}
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
                      value={menuInfo.menuNm}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        menuNm : e.target.value,
                      })}
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
                  <CCol sm={6}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={menuInfo.upperMenuId}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        upperMenuId : e.target.value,
                      })}
                      maxLength="20"
                    />
                  </CCol>
                  <CCol sm={2}>
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
                  <CCol sm={6}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={menuInfo.progrmFileNm}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        progrmFileNm : e.target.value,
                      })}                      
                      maxLength="60"
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="ㅇ"
                      
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
                      value={menuInfo.relateImageNm}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        relateImageNm : e.target.value,
                      })}
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
                      value={menuInfo.relateImagePath}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        relateImagePath : e.target.value,
                      })}
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
                      value={menuInfo.menuDc}
                      onChange={(e)=>setMenuInfo({
                        ...menuInfo,
                        menuDc : e.target.value,
                      })}
                      
                    />
                  </CCol>
                </CRow>
                </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      
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
      
    </CRow>
  )
}

export default MenuManager
