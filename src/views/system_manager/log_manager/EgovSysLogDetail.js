import React, { useState, useEffect } from 'react'
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
  CCardFooter,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'

export default function EgovSysLogDetail() {
  const [resultList, setResultList] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const getLog = () => {
    axios
      .get(SERVER_URL+'/sym/log/lgm/SelectSysLogDetailAPI.do', {
        params: {
          requstId: location.state?.requstId,
        }
      })
      .then((resp) => {
        setResultList(resp.data.result.result)
        console.log(resp)
      })
  }

  useEffect(() => {
    getLog()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>로그 관리 조회</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/layout#form-grid">
              {/* 요청ID */}
              <CRow className="mb-3">
                <CFormLabel className="col-sm-2 col-form-label col-form-label-sm">
                  요청ID
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="requstId"
                    disabled
                    id="requstId"
                    defaultValue={resultList.requstId}
                  />
                </CCol>
              </CRow>
              {/* 발생일자 */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="occrrncDe"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  발생일자
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="occrrncDe"
                    id="occrrncDe"
                    disabled
                    value={resultList.occrrncDe || ''}
                  />
                </CCol>
              </CRow>
              {/* 서비스명 */}
              <CRow className="mb-3">
                <CFormLabel htmlFor="srvcNm" className="col-sm-2 col-form-label col-form-label-sm">
                  서비스명
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="srvcNm"
                    id="srvcNm"
                    disabled
                    value={resultList.srvcNm || ''}
                  />
                </CCol>
              </CRow>
              {/* 메소드명 */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="methodNm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  메소드명
                </CFormLabel>
                <CCol sm={8}>
                <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="methodNm"
                    id="methodNm"
                    disabled
                    value={resultList.methodNm || ''}
                  />
                  </CCol>
              </CRow>
              {/* 처리구분 */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="processSeCodeNm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  처리구분
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="processSeCodeNm"
                    id="processSeCodeNm"
                    disabled
                    value={resultList.processSeCodeNm || ''}
                  />
                </CCol>
              </CRow>
              {/* 처리시간 */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="processTime"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  처리시간
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="processTime"
                    id="processTime"
                    disabled
                    value={resultList.processTime + "ms" || ''}
                  />
                </CCol>
              </CRow>
              {/* 요청자 */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="rqsterNm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  요청자
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="rqsterNm"
                    id="rqsterNm"
                    disabled
                    value={resultList.rqsterNm || ''}
                  />
                </CCol>
              </CRow>
              {/* 요청자IP */}
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="rqesterIp"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  요청자IP
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput
                    type="text"
                    className="form-control form-control-sm"
                    name="rqesterIp"
                    id="rqesterIp"
                    disabled
                    value={resultList.rqesterIp || ''}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-1 justify-content-end">
                <CCol sm={1}>
                  <CFormInput
                    type="button"
                    className="form-control form-control-sm"
                    style={{ color: 'white', backgroundColor: 'navy' }}
                    value="목록"
                    onClick={() => navigate('/system_manager/log_manager/EgovSysLogList')}
                  />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
