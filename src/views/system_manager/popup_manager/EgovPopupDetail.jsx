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
import { DocsExample } from 'src/components';
import EgovRadioButtonGroup from 'src/common/EgovRadioButtonGroup'
import { useLocation, useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { SERVER_URL } from 'src/context/config';

function EgovPopupDetail() {
  const location = useLocation()
  const navigate = useNavigate()

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
  function formDelete() {
    console.log(location.state?.popupId)
  axios.delete(SERVER_URL+'uss/ion/pwm/deletePopupAPI.do', {
    params : {
      popupId: location.state?.popupId
    }
  }). then(
      (resp) => {
        alert('삭제합니다')
        navigate('/system_manager/popup_manager/EgovPopupList')
      },
      function (resp) {
        console.log('err response : ', resp)
      },
    )
  }


  const retrieveDetail = () => {

    // *axios
    axios
      .get(SERVER_URL+'/uss/ion/pwm/detailPopupAPI.do', {
        params: {
          popupId: location.state?.popupId,
        },
      })
      .then((resp) => {
        let rawScheduleDetail = resp.data.result.popupManageVO
        console.log(rawScheduleDetail)
        setPopupDetail({
          ...popupDetail,
          ...rawScheduleDetail,
          startDate: convertDate(rawScheduleDetail.ntceBgnde),
          endDate: convertDate(rawScheduleDetail.ntceEndde),
        })
      })
  }

  useEffect(function () {
    retrieveDetail()
    return function () {}
  }, [])

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
                      defaultValue={popupDetail.popupTitleNm}
                      disabled={true}
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
                      defaultValue={popupDetail.fileUrl}
                      disabled={true}
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
                      defaultValue={popupDetail.popupWlc}
                      disabled={true}
                      maxLength="10"
                    />
                    {''}
                    세로
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupHlc"
                      name="popupHlc"
                      type="text"
                      defaultValue={popupDetail.popupHlc}
                      disabled={true}
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
                      defaultValue={popupDetail.popupWSize}
                      disabled={true}
                      maxLength="10"
                    />
                    {''}
                    height
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupHSize"
                      name="popupHSize"
                      type="text"
                      defaultValue={popupDetail.popupHSize}
                      disabled={true}
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
                      disabled={true}
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
                      disabled = {true}
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
                      disabled = {true}
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
                      disabled={true}
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
                      disabled={true}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="수정"
                      onClick={() =>
                        navigate('/system_manager/popup_manager/EgovPopupUpdt', {
                          state: { popupId: location.state?.popupId},
                        })
                      }
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="삭제"
                      onClick={() => formDelete()}
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

export default EgovPopupDetail
