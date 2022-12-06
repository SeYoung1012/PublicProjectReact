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


function EgovWebLogDetail () {

    const [resultList, setResultList] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams]=useSearchParams();
  
    const getLog = () => {
      axios
        .get(SERVER_URL+'/sym/log/wlg/SelectWebLogDetailAPI.do', {
          params: {
            requstId: searchParams.get('requstId') 
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
                <strong>웹로그 상세조회</strong>
              </CCardHeader>
              <CCardBody>
                <DocsExample href="forms/layout#form-grid">
         
                  {/* 요청ID */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="requstId"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      요청ID
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="requstId"
                        id="requstId"
                        disabled
                        value={resultList.requstId || ''}
                      />
                    </CCol>
                  </CRow>
                    {/* 발생일자 */}
                <CRow className="mb-3">
                    <CFormLabel  
                    htmlFor="occrrncDe"
                    className="col-sm-2 col-form-label col-form-label-sm">
                     발생일자
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="occrrncDe"
                        disabled
                        id="occrrncDe"
                        defaultValue={resultList.occrrncDe
                        }
                      />
                    </CCol>
                  </CRow>
                  {/* URL */}
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="url" className="col-sm-2 col-form-label col-form-label-sm">
                      URL
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="url"
                        id="url"
                        disabled
                        value={resultList.url || ''}
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
export default EgovWebLogDetail;