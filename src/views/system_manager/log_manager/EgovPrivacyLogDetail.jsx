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
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'


function EgovPrivacyLogDetail () {

    const [resultList, setResultList] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams]=useSearchParams();
  
    const getLog = () => {
      axios
        .get(SERVER_URL+'/sym/log/plg/SelectPrivacyLogDetailAPI.do', {
          params: {
            requestId: searchParams.get('requestId'),
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
                <strong>개인정보로그 상세조회</strong>
              </CCardHeader>
              <CCardBody>
                <DocsExample href="forms/layout#form-grid">
         
                  {/* 요청id */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="requestId"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      요청ID
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="requestId"
                        id="requestId"
                        disabled
                        value={resultList.requestId || ''}
                      />
                    </CCol>
                  </CRow>
                    {/*조회일시 */}
                <CRow className="mb-3">
                    <CFormLabel  
                    htmlFor="inquiryDatetime"
                    className="col-sm-2 col-form-label col-form-label-sm">
                      조회일시
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="inquiryDatetime"
                        disabled
                        id="inquiryDatetime"
                        defaultValue={resultList.inquiryDatetime}
                      />
                    </CCol>
                  </CRow>
                  {/* 서비스명 */}
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="serviceName" className="col-sm-2 col-form-label col-form-label-sm">
                      서비스명
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="serviceName"
                        id="serviceName"
                        disabled
                        value={resultList.serviceName || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 정보조회 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="inquiryInfo"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      정보조회
                    </CFormLabel>
                    <CCol sm={8}>
                    <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="inquiryInfo"
                        id="inquiryInfo"
                        disabled
                        value={resultList.inquiryInfo || ''}
                      />
                      </CCol>
                  </CRow>
                  {/* 요청자 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="requesterName"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      요청자
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="requesterName"
                        id="requesterName"
                        disabled
                        value={resultList.requesterName || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 요청자IP */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="requesterIp"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      요청자IP
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="requesterIp"
                        id="requesterIp"
                        disabled
                        value={resultList.requesterIp || ''}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-1 justify-content-end">
                    <CCol sm={1}>
                      <CFormInput
                        type="button"
                        className="form-control form-control-sm"
                        style={{ color: 'white', backgroundColor: 'navy' }}
                        value="닫기"
                        onClick={() => window.close()}
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
export default EgovPrivacyLogDetail;