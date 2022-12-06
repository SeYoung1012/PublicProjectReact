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


function EgovUserLogDetail () {

    const [resultList, setResultList] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams]=useSearchParams();
  
    const getLog = () => {
      axios
        .get(SERVER_URL+'/sym/log/ulg/SelectUserLogDetailAPI.do', {
          params: {
            rqesterId: searchParams.get('rqesterId'),
            occrrncDe: searchParams.get('occrrncDe'), 
            srvcNm : searchParams.get('srvcNm'),
            methodNm: searchParams.get('methodNm'),
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
                <strong>사용자로그 상세조회</strong>
              </CCardHeader>
              <CCardBody>
                <DocsExample href="forms/layout#form-grid">
         
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
                    {/* 사용자 */}
                <CRow className="mb-3">
                    <CFormLabel  
                    htmlFor="rqsterNm"
                    className="col-sm-2 col-form-label col-form-label-sm">
                      사용자
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="rqsterNm"
                        disabled
                        id="rqsterNm"
                        defaultValue={resultList.rqsterNm}
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
                  {/* 생성 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="creatCo"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      생성
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="creatCo"
                        id="creatCo"
                        disabled
                        value={resultList.creatCo || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 수정 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="updtCo"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      수정
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="updtCo"
                        id="updtCo"
                        disabled
                        value={resultList.updtCo || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 조회 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="rdCnt"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      조회
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="rdCnt"
                        id="rdCnt"
                        disabled
                        value={resultList.rdCnt || ''}
                      />
                    </CCol>
                  </CRow>
                  {/* 삭제 */}
                  <CRow className="mb-3">
                    <CFormLabel
                      htmlFor="deleteCo"
                      className="col-sm-2 col-form-label col-form-label-sm"
                    >
                      삭제
                    </CFormLabel>
                    <CCol sm={8}>
                      <CFormInput
                        type="text"
                        className="form-control form-control-sm"
                        name="deleteCo"
                        id="deleteCo"
                        disabled
                        value={resultList.deleteCo || ''}
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
export default EgovUserLogDetail;