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
} from '@coreui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DocsExample } from 'src/components'
import EgovRadioButtonGroup from 'src/common/EgovRadioButtonGroup'
import {useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { SERVER_URL } from 'src/context/config'

export default function EgovPopupRegist() {
  const navigate = useNavigate();

  const stopVewAtyesnoRadioGroup = [
    { value: '1', label: '하루동안 열지 않음' },
    { value: '2', label: '다시 열지 않음' },
    { value: '3', label: '설정 안 함'}
  ]

  const ntceAtyesnoRadioGroup = [
    { value: '1', label: '게시' },
    { value: '2', label: '게시 안 함' },
  ]

   const usrRadioGroup = [
    {value: '전체', label: '전체'},
    {value: '사용자', label: '사용자'},
    {value: '관리자', label: '관리자'}
   ]

  const [popupDetail, setPopupDetail] = useState({
    stopVewAt: '1',
    ntceAt: '1',
    startDate: new Date(),
    endDate: new Date(),
  })

  const [ntceBgndeHH, setNtceBgndeHH] = useState()
  const [ntceBgndeMM, setNtceBgndeMM] = useState()
  const [ntceEnddeHH, setNtceEnddeHH] = useState()
  const [ntceEnddeMM, setNtceEnddeMM] = useState()

  const convertDate = (str) => {
    let year = str.substring(0, 4)
    let month = str.substring(4, 6)
    let date = str.substring(6, 8)
    let hour = str.substring(8, 10)
    let minute = str.substring(10, 12)
    return new Date(year, month - 1, date, hour, minute)
  }

  const formValidator = (formData) => {
    if (formData.get('popupTitleNm') === null || formData.get('popupTitleNm') === '') {
      alert('팝업 이름은 필수 값입니다.')
      return false
    }
    if (formData.get('fileUrl') === null || formData.get('fileUrl') === '') {
      alert('팝업창 URL은 필수 값입니다.')
      return false
    }
    if (formData.get('popupWlc') === null || formData.get('popupWlc') === '') {
      alert('팝업창 가로 위치는 필수 값입니다.')
      return false
    }
    if (formData.get('popupHlc') === null || formData.get('popupHlc') === '') {
      alert('팝업창 세로 위치는 필수 값입니다.')
      return false
    }
    if (formData.get('popupWSize') === null || formData.get('popupWSize') === '') {
      alert('팝업창 너비는 필수 값입니다.')
      return false
    }
    if (formData.get('popupHSize') === null || formData.get('popupHSize') === '') {
      alert('팝업 높이는 필수 값입니다.')
      return false
    }

    if (formData.get('ntceBgnde') === null || formData.get('ntceBgnde') === '') {
      alert('게시시작일을 선택해주세요')
      return false
    }
    if (formData.get('ntceEndde') === null || formData.get('ntceEndde') === '') {
      alert('게시종료일을 선택해주세요')
      return false
    }
    if (formData.get('ntceBgnde') > formData.get('ntceEndde')) {
      alert('종료일시는 시작일시보다 앞 설 수 없습니다.')
      return false
    }

    return true
  }

  //날짜관련함수
  const getDateFourteenDigit = (date) => {
    return (
      getYYYYMMDD(date).toString() +
      makeTwoDigit(date.getHours()) +
      makeTwoDigit(date.getMinutes()) +
      makeTwoDigit(date.getSeconds())
    )
  }
  const getYYYYMMDD = (date) => {
    return (
      date.getFullYear().toString() +
      makeTwoDigit(Number(date.getMonth() + 1)) +
      makeTwoDigit(date.getDate())
    )
  }
  const makeTwoDigit = (number) => {
    return number < 10 ? '0' + number : number.toString()
  }

  const updatePopup = async() => {
    const formData = new FormData()
    for (let key in popupDetail) {
      formData.append(key, popupDetail[key])
      console.log('popupDetail[%s]', key, popupDetail[key])
    }
    if (formValidator(formData)) {
    try {
      const res = await axios({
        method : 'POST',
        url : SERVER_URL+'/uss/ion/pwm/registPopupAPI.do',
        data: formData,
      });
      console.log(res);
      
    } catch (error) {
      console.error(error);
    }
    //   axios({
    //     method: 'POST',
    //     url: '/uss/ion/pwm/registPopupAPI.do',
    //     data: formData,
    //   }).then(
    //     alert('글등록 성공'),
    //     navigate('/system_manager/popup_manager/EgovPopupList'),
    //     function (resp) {
    //       console.log('err response : ', resp)
    //     },
    //   )
    // }
  }
}

  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>팝업 상세조회</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    팝업창명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupTitleNm"
                      name="popupTitleNm"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupTitleNm: e.target.value,
                        })
                      }
                      maxLength="255"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    팝업창 url
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      className="f_input2 w_full"
                      id="fileUrl"
                      name="fileUrl"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          fileUrl: e.target.value,
                        })
                      }
                      maxLength="255"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    팝업창 위치
                  </CFormLabel>
                  <CCol sm={10}>
                    가로
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupWlc"
                      name="popupWlc"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupWlc: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                    {''}
                    세로
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupHlc"
                      name="popupHlc"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupHlc: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    팝업창 사이즈
                  </CFormLabel>
                  <CCol sm={10}>
                    width
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupWSize"
                      name="popupWSize"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupWSize: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                    {''}
                    height
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupHSize"
                      name="popupHSize"
                      type="text"
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupHSize: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    공지대상
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="popupUsr"
                      radioGroup={usrRadioGroup}
                      setValue={popupDetail.popupUsr}
                      setter={(v) => setPopupDetail({ ...popupDetail, popupUsr: v })}
                    />
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    게시기간
                  </CFormLabel>
                  <CCol sm={10}>
                    <DatePicker
                      selected={popupDetail.startDate}
                      name="ntceBgnde"
                      className="f_input"
                      dateFormat="yyyy-MM-dd HH:mm"
                      showTimeInput
                      onChange={(date) => {
                        console.log('setStartDate : ', date)
                        setPopupDetail({
                          ...popupDetail,
                          ntceBgnde: getDateFourteenDigit(date),
                          ntceBgndeYYYMMDD: getYYYYMMDD(date),
                          ntceBgndeHH: date.getHours(),
                          ntceBgndeMM: date.getMinutes(),
                          startDate: date,
                        })
                        setNtceBgndeHH(date.getHours())
                        setNtceBgndeMM(date.getMinutes())
                      }}
                    />
                    <input type="hidden" name="ntceBgndeHH" defaultValue={ntceBgndeHH} readOnly />
                    <input type="hidden" name="ntceBgndeMM" defaultValue={ntceBgndeMM} readOnly />
                  ~
                    <DatePicker
                      selected={popupDetail.endDate}
                      name="ntceEndde"
                      className="f_input"
                      dateFormat="yyyy-MM-dd HH:mm"
                      showTimeInput
                      minDate={popupDetail.startDate}
                      onChange={(date) => {
                        console.log('setEndDate: ', date)
                        setPopupDetail({
                          ...popupDetail,
                          ntceEndde: getDateFourteenDigit(date),
                          ntceEnddeYYYMMDD: getYYYYMMDD(date),
                          ntceEnddeHH: date.getHours(),
                          ntceEnddeMM: date.getMinutes(),
                          endDate: date,
                        })
                        setNtceEnddeHH(date.getHours())
                        setNtceEnddeMM(date.getMinutes())
                      }}
                    />
                    <input type="hidden" name="ntceEnddeHH" defaultValue={ntceEnddeHH} readOnly />
                    <input type="hidden" name="ntceEnddeMM" defaultValue={ntceEnddeMM} readOnly />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    그만보기 설정 여부
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="stopVewAt"
                      radioGroup={stopVewAtyesnoRadioGroup}
                      setValue={popupDetail.stopVewAt}
                      setter={(v) => setPopupDetail({ ...popupDetail, stopVewAt: v })}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    게시상태
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="ntceAt"
                      radioGroup={ntceAtyesnoRadioGroup}
                      setValue={popupDetail.ntceAt}
                      setter={(v) => setPopupDetail({ ...popupDetail, ntceAt: v })}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="등록"
                      onClick={() => 
                        updatePopup()
                      }
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="목록"
                      onClick={() => navigate('/system_manager/popup_manager/EgovPopupList')}
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