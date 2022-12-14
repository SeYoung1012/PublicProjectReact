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
import { useLocation, useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import { SERVER_URL } from 'src/context/config'

function EgovPopupUpdt() {
  const location = useLocation()
  const navigate = useNavigate()

  const yesnoRadioGroup = [
    { value: '1', label: 'Y' },
    { value: '2', label: 'N' },
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

  const retrieveDetail = () => {
    console.log(location.state?.popupId)

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

  const formValidator = (formData) => {
    if (formData.get('popupTitleNm') === null || formData.get('popupTitleNm') === '') {
      alert('?????? ????????? ?????? ????????????.')
      return false
    }
    if (formData.get('fileUrl') === null || formData.get('fileUrl') === '') {
      alert('????????? URL??? ?????? ????????????.')
      return false
    }
    if (formData.get('popupWlc') === null || formData.get('popupWlc') === '') {
      alert('????????? ?????? ????????? ?????? ????????????.')
      return false
    }
    if (formData.get('popupHlc') === null || formData.get('popupHlc') === '') {
      alert('????????? ?????? ????????? ?????? ????????????.')
      return false
    }
    if (formData.get('popupWSize') === null || formData.get('popupWSize') === '') {
      alert('????????? ????????? ?????? ????????????.')
      return false
    }
    if (formData.get('popupHSize') === null || formData.get('popupHSize') === '') {
      alert('?????? ????????? ?????? ????????????.')
      return false
    }

    if (formData.get('ntceBgnde') === null || formData.get('ntceBgnde') === '') {
      alert('?????????????????? ??????????????????')
      return false
    }
    if (formData.get('ntceEndde') === null || formData.get('ntceEndde') === '') {
      alert('?????????????????? ??????????????????')
      return false
    }
    if (formData.get('ntceBgnde') > formData.get('ntceEndde')) {
      alert('??????????????? ?????????????????? ??? ??? ??? ????????????.')
      return false
    }

    return true
  }

  //??????????????????
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

  const updatePopup = () => {
    const formData = new FormData()
    for (let key in popupDetail) {
      formData.append(key, popupDetail[key])
      console.log('popupDetail[%s]', key, popupDetail[key])
    }
    if (formValidator(formData)) {
      axios.post(SERVER_URL+'/uss/ion/pwm/updtPopupAPI.do', formData).then((resp) => {
        alert('????????? ?????????????????????.')
        navigate('/system_manager/popup_manager/EgovPopupList')
      })
    }
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
              <strong>?????? ????????????</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ????????????
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupTitleNm"
                      name="popupTitleNm"
                      type="text"
                      defaultValue={popupDetail.popupTitleNm}
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
                    ????????? url
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      className="f_input2 w_full"
                      id="fileUrl"
                      name="fileUrl"
                      type="text"
                      defaultValue={popupDetail.fileUrl}
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
                    ????????? ??????
                  </CFormLabel>
                  <CCol sm={10}>
                    ??????
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupWlc"
                      name="popupWlc"
                      type="text"
                      defaultValue={popupDetail.popupWlc}
                      onChange={(e) =>
                        setPopupDetail({
                          ...popupDetail,
                          popupWlc: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                    {''}
                    ??????
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupHlc"
                      name="popupHlc"
                      type="text"
                      defaultValue={popupDetail.popupHlc}
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
                    ????????? ?????????
                  </CFormLabel>
                  <CCol sm={10}>
                    width
                    <CFormInput
                      className="f_input2 w_full"
                      id="popupWSize"
                      name="popupWSize"
                      type="text"
                      defaultValue={popupDetail.popupWSize}
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
                      defaultValue={popupDetail.popupHSize}
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
                    ????????????
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
                    ???????????? ?????? ??????
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="stopVewAt"
                      radioGroup={yesnoRadioGroup}
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
                    ????????????
                  </CFormLabel>
                  <CCol sm={10}>
                    <EgovRadioButtonGroup
                      name="ntceAt"
                      radioGroup={yesnoRadioGroup}
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
                      value="??????"
                      onClick={(e) => {
                        e.preventDefault()
                        updatePopup()
                      }}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{ color: 'white', backgroundColor: 'navy' }}
                      value="??????"
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

export default EgovPopupUpdt
