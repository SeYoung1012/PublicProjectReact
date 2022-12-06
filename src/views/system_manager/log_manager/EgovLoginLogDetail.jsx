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


function EgovLoginLogDetail () {

    const [resultList, setResultList] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams]=useSearchParams();
  
    const getLog = () => {
      axios
        .get(SERVER_URL+'/sym/log/clg/SelectLoginLogDetailAPI.do', {
          params: {
            logId: searchParams.get('logId'),
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
                <strong>접속로그 상세조회</strong>
              </CCardHeader>
              <CCardBody>
                <DocsExample href="forms/layout#form-grid">
         
                  {/* 로그id */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="logId"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      로그ID
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="logId"
                        id="logId"
                        disabled
                        value={resultList.logId || ''}
                      />
                    </CCol>
                  </CRow>
                    {/*발생일자 */}
                <CRow className="mb-3">
                    <CFormLabel  
                    htmlFor="creatDt"
                    className="col-sm-2 col-form-label col-form-label-sm">
                      발생일자
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="creatDt"
                        disabled
                        id="creatDt"
                        defaultValue={resultList.creatDt}
                      />
                    </CCol>
                  </CRow>
                  {/*접속방식 */}
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="loginMthd" className="col-sm-2 col-form-label col-form-label-sm">
                      접속방식
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="loginMthd"
                        id="loginMthd"
                        disabled
                        value={resultList.loginMthd || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 사용자명 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="loginNm"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      사용자명
                    </CFormLabel>
                    <CCol sm={8}>
                    <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="loginNm"
                        id="loginNm"
                        disabled
                        value={resultList.loginNm || ''}
                      />
                      </CCol>
                  </CRow>
                  {/* 접속IP */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="loginIp"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      접속IP
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="loginIp"
                        id="loginIp"
                        disabled
                        value={resultList.loginIp || ''}
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
export default EgovLoginLogDetail;