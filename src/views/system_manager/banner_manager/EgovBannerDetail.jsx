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


export default function EgovBannerUpdate() {
    const [bannerForm, setBannerForm] = useState({ });
    const navigate = useNavigate();
    const location = useLocation();

    const getBanner = async () => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/ion/bnr/getBannerAPI.do', {
                params: {
                    bannerId: location.state?.bannerId
                }
            })
            setBannerForm(res.data.result.banner);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBanner();
    },[]);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>배너 관리 조회</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DocsExample href="forms/layout#form-grid">
                            {/* 배너ID */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    //htmlFor="bannerId"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    배너 ID
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="bannerId"
                                        disabled
                                        maxLength="20"
                                        id='bannerId'
                                        value={bannerForm.bannerId||''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 배너명 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="bannerNm"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    배너명
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="bannerNm"
                                        id='bannerNm'
                                        maxLength="20"
                                        readOnly
                                        value={bannerForm.bannerNm || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 링크 URL */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="linkUrl"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    링크 URL
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="linkUrl"
                                        id='linkUrl'
                                        maxLength="100"
                                        readOnly
                                        value={bannerForm.linkUrl || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 배너 이미지 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="bannerImage"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    배너 이미지
                                </CFormLabel>
                                <CCol sm={8}>
                                    {bannerForm.bannerImage||''}
                                </CCol>
                            </CRow>
                            {/* 배너 설명 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="bannerDc"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    배너 설명
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="bannerDc"
                                        id='bannerDc'
                                        maxLength="20"
                                        readOnly
                                        value={bannerForm.bannerDc || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 정렬순서 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="sortOrdr"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    정렬순서
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="sortOrdr"
                                        id='sortOrdr'
                                        maxLength="20"
                                        readOnly
                                        value={bannerForm.sortOrdr || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 반영여부 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="reflctAt"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    반영여부
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type='text'
                                        className="form-control form-control-sm"
                                        name="reflctAt"
                                        id="reflctAt"
                                        readOnly
                                        value={bannerForm.reflctAt || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 등록일시 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="regDate"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    등록일시
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="regDate"
                                        maxLength="20"
                                        id='regDate'
                                        disabled
                                        value={bannerForm.regDate || ''}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-1 justify-content-end">
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="수정"
                                        onClick={() => navigate('/system_manager/banner_manager/EgovBannerUpdate', { state: { bannerId: location.state?.bannerId } })}
                                    />
                                </CCol>
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="목록"
                                        onClick={() => navigate('/system_manager/banner_manager/EgovBannerList')}
                                    />
                                </CCol>
                            </CRow>
                        </DocsExample>
                    </CCardBody>
                    <CCardFooter>

                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}
