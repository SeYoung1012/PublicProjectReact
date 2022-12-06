import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';
import {Pagination} from 'src/context/Pagination';
import { SERVER_URL } from 'src/context/config';


function EgovPopupList() {
  const location = useLocation();
  const navigate = useNavigate();

  const popupId = location.state?.popupId;
  const [searchVO, setSearchVO] = useState({
    popupId: popupId,
    pageIndex: 1,
    searchCondition: '',
    searchKeyword: '',
  });

  const [resultList, setResultList] = useState();

  const [pageButton, setPageButton] = useState();

  //체크박스에 사용할 데이터
  const [dataLists, setDataList] = useState([]);

  //checkBox 컴포넌트(개별 체크 박스들을 저장할 배열)
  const [checkItems, setCheckeItems] = useState([
    // {key: "" , value: ""}
  ]);

  // 체크 박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckeItems((prev) => [...prev, id])
    } else {
      // 단일 선택 헤제 시 체크된 아이템을 제외한 배열(필터)
      setCheckeItems(checkItems.filter((el) => el !== id))
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)을 담은 배열로 checkItems 상태 업데이트
      const idArray = []
      dataLists.forEach((el) => idArray.push(el.popupId))
      setCheckeItems(idArray)
    } else {
      //전체 선택 해제시 checkItems 를 빈 배열로 상태 업데이트
      setCheckeItems([])
    }
  };

  // 팝업창 정보 axios로 정보 획득
  const fn_egov_ajaxPopupInfo_PopupManage = (popupId) => {
    axios
      .get(SERVER_URL+'/uss/ion/pwm/ajaxPopupManageInfoAPI.do', {
        params: {
          popupId: popupId,
        },
      })
      .then((resp) => {
        //console.log("통신됨");
        let returnValueArr = resp.data.result.result.split('||')
        console.log(returnValueArr)
        fn_egov_popupOpen_PopupManage(
          popupId,
          returnValueArr[0],
          returnValueArr[1],
          returnValueArr[2],
          returnValueArr[3],
          returnValueArr[4],
          returnValueArr[5],
        )
      })
  };

  //팝업창미리보기
  const fn_egov_view_PopupManage = () => {
    let FLength = checkItems.length
    let check = 0

    if (FLength === 1) {
      for (let i = 0; i < FLength; i++) {
        fn_egov_ajaxPopupInfo_PopupManage(checkItems[i])
        console.log(checkItems[i])
        check++
      }
    }
    if (FLength === 0) {
      alert('체크박스를 하나 이상 선택해주세요')
    }
    return
  };

  // 팝업창 오픈
  const fn_egov_popupOpen_PopupManage = (popupId, fileUrl, width, height, top, left, stopVewAt) => {
    let url = 'http://localhost:3000/'
    url = url + fileUrl
    // url = url + "&stopVewAt=" + stopVewAt;
    // url = url + "&popupId=" + popupId;
    console.log(url)
    let name = popupId
    let openWindows = window.open(
      url,
      name,
      'width=' +
        width +
        ',height=' +
        height +
        ',top=' +
        top +
        ',left=' +
        left +
        ',toolbar=no,status=no,location=no,scrollbars=yes,menubar=no,resizable=yes',
    )

    if (window.focus) {
      openWindows.focus()
    }
  };

  const changeSttus = (sttus) => {
    if (sttus === '1') {
      return <div>Y</div>
    } else {
      return <div>N</div>
    }
  }

  const retrieveList = (searchVO) => {
    

    axios
      .get(SERVER_URL+'/uss/ion/pwm/listPopupAPI.do', {
        params: {
          pageIndex: searchVO.pageIndex,
          searchKeyword: searchVO.searchKeyword,
          searchCondition: searchVO.searchCondition,
        },
      })
      .then(
        (resp) => {
          let mutListTag = []
          mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>) // 목록 초기값

          let resultCnt = resp.data.result.paginationInfo.totalRecordCount * 1
          let currentPageNo = resp.data.result.paginationInfo.currentPageNo
          let pageSize = resp.data.result.paginationInfo.pageSize

          // 리스트 항목 구성
          resp.data.result.resultList.forEach(function (item, index) {
            if (index === 0) mutListTag = [] //목록 초기화
            var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1)

            mutListTag.push(
              <CTableRow
                onClick={() =>
                  navigate('/system_manager/popup_manager/EgovPopupDetail', {
                    state: { popupId: item.popupId},
                  })
                }>
                <CTableHeaderCell scope="row">{listIdx}</CTableHeaderCell>
                <CTableDataCell>{item.popupTitleNm}</CTableDataCell>
                <CTableDataCell>
                  {item.ntceBgnde} ~ {item.ntceEndde}
                </CTableDataCell>
                <CTableDataCell>{item.fileUrl}</CTableDataCell>
                <CTableDataCell>
                {changeSttus(item.ntceAt)}
                </CTableDataCell>
              </CTableRow>,
            )
          })
          setResultList(mutListTag)
          setDataList(resp.data.result.resultList)
          setPageButton(
            Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
          )
        },
        function (resp) {
          console.log('err response : ', resp)
        },
      )
  }
  useEffect(() => {
    retrieveList(searchVO)
    return () => {}
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>팝업 관리 목록</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={2}>
                <CFormSelect
                  onChange={(e) => {
                    setSearchVO({
                      ...searchVO,
                      searchCondition: e.target.value,
                    })
                  }}
                >
                  <option value = "">---조건---</option>
                  <option value="POPUP_SJ_NM">팝업창명</option>
                  <option value="FILE_URL">팝업창URL</option>
                </CFormSelect>
              </CCol>
              <CCol md={5}>
                <CFormInput
                  name="searchKeyword"
                  type="text"
                  size="35"
                  value={searchVO && searchVO.searchKeyword}
                  onChange={(e) => {
                    setSearchVO({
                      ...searchVO,
                      searchKeyword: e.target.value,
                    })
                  }}
                  maxLength="255"
                />
              </CCol>
              <CCol md={1}>
                <CFormInput
                  type="button"
                  value="조회"
                  onClick={() => 
                    retrieveList(searchVO)
                  }
                />
              </CCol>
              <CCol md={1}>
                <CFormInput
                  type="button"
                  value="등록"
                  onClick={() => navigate('/system_manager/popup_manager/EgovPopupRegist')}
                />
              </CCol>
              <CCol md={1}>
                <CFormInput
                  type="button"
                  value="미리보기"
                  onClick={fn_egov_view_PopupManage}
                />
              </CCol>
            </CForm>

            <DocsExample>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col"><input
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제(하나라도 해제 시 선택 해제)
                    checked={
                      checkItems.length === dataLists.length ? true : false
                    }
                  /></CTableHeaderCell>
                    <CTableHeaderCell scope="col">번호</CTableHeaderCell>
                    <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                    <CTableHeaderCell scope="col">게시기간</CTableHeaderCell>
                    <CTableHeaderCell scope="col">파일</CTableHeaderCell>
                    <CTableHeaderCell scope="col">게시상태</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  {dataLists?.map((dataLists, key) => (
                <CTableBody>
                      <input
                        type="checkbox"
                        name="checked"
                        value={dataLists.popupId}
                        onChange={(e) => handleSingleCheck(e.target.checked, dataLists.popupId)}
                        checked={checkItems.includes(dataLists.popupId) ? true : false}
                      />{"    "}
                      {resultList[key]}
                </CTableBody>
                  ))}
              </CTable>
            </DocsExample>
            {pageButton}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EgovPopupList
