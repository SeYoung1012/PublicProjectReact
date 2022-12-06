import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
 CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Pagination} from 'src/context/Pagination'
import CODE from 'src/context/code'
import {COM013} from 'src/context/CmmCodeDetail';
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';


function UserManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userSearchVO, setUserSearchVO] = useState(location.state?.userSearchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [memberList, setMemberList] = useState([]);
  const [pageButton, setPageButton] = useState();
  
  const retrieveList = async(userSearchVO) =>{
    try{
      const resp = await axios.get(SERVER_URL+'/uss/umt/EgovUserManageAPI.do',{
        params:userSearchVO
      })
      if(resp.data.resultCode == CODE.RCV_ERROR_AUTH){
        alert(resp.data.resultMessage);
        navigate(-1);
      }else{
        let mutMemberList = [];
        resp.data.result.resultList.forEach(function (member, index) {
          if (index === 0) mutMemberList = []; // 목록 초기화
          //let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
          let sttus = '';
          COM013.forEach(function(item){
            if(member.sttus==item.code) sttus = item.codeNm;
          });

          mutMemberList.push(
            <CTableRow onClick={()=>navigate('/system_manager/member_manager/UserUpdate',{state:{uniqId:member.uniqId}})}>
              <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
              <CTableDataCell>{member.userId}</CTableDataCell>
              <CTableDataCell>{member.userNm}</CTableDataCell>
              <CTableDataCell>{member.emailAdres}</CTableDataCell>
              <CTableDataCell>{member.areaNo}){member.moblphonNo}</CTableDataCell>
              <CTableDataCell>{member.sbscrbDe.substring(0,10)}</CTableDataCell>
              <CTableDataCell>{sttus}</CTableDataCell>
              
            </CTableRow>
          );
        });
        setMemberList(mutMemberList);
        setPageButton(
          Pagination(resp.data.result.paginationInfo,userSearchVO,retrieveList)
        )
      }
      
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    retrieveList(userSearchVO);
    return () => {
    }
  }, []);

    
  return (
    <CRow>
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>업무사용자 관리 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
          <CForm className="row g-3">
          <CCol md={2}>
            <CFormSelect onChange={(e)=>setUserSearchVO({...userSearchVO,sbscrbSttus:e.target.value})}>
              <option value="0">상태(전체)</option> 
              <option value="A">가입신청</option> 
              <option value="D">삭제</option> 
              <option value="P">승인</option> 
            </CFormSelect>
            
            </CCol>
            <CCol md={2}>
            <CFormSelect onChange={(e)=>setUserSearchVO({...userSearchVO,searchCondition:e.target.value})}>
              <option value="0">ID</option>
              <option value="1">이름</option>
            </CFormSelect>
            </CCol>
            <CCol md={5}>
            <CFormInput  name="searchKeyword" type="text" size="35" 
                    value={userSearchVO && userSearchVO.searchKeyword}
                    onChange={(e)=>setUserSearchVO({...userSearchVO,searchKeyword:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(userSearchVO)}/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="삭제"
                    onClick={()=>console.log(userSearchVO)}/>
            </CCol>
            <CCol md={1}>
            <CFormInput  type="button"
                    value="등록"
                    onClick={()=>navigate('/system_manager/member_manager/UserInsert')}/>
            </CCol>
            </CForm>
            

            

            <DocsExample >
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">아이디</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용자이름</CTableHeaderCell>
                    <CTableHeaderCell scope="col">사용자이메일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">전화번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">등록일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">가입상태</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                    {memberList}
                    
 
                </CTableBody>
              </CTable>
            </DocsExample>
            {pageButton}
          </CCardBody>
        </CCard>
      </CCol>
      
    </CRow>
  )
}

export default UserManager
