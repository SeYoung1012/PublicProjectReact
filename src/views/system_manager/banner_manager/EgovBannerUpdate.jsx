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
    CFormText,
    CButton,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from 'src/context/config'

export default function EgovBannerUpdate() {
    const [bannerForm, setBannerForm] = useState({});
    const [bannerAttachFiles, setBannerAttachFiles] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBannerForm(values => ({ ...values, [name]: value }));
    }

    //파일업로드
    const fileChange = (e) => {
        setBannerForm({ ...bannerForm, bannerImage: e.target.files[0] });
        setBannerAttachFiles(e.target.files[0].name);
        console.log(e.target.files);
    }

    //저장
    const formSubmit = async () => {
        const formData = new FormData();
        for (let key in bannerForm) {
            formData.append(key, bannerForm[key]);
            console.log("bannerForm [%s] ", key, bannerForm[key]);
        }
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL+'/uss/ion/bnr/updtBannerAPI.do',
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    //상세 불러오기
    const getBanner = async () => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/ion/bnr/getBannerAPI.do', {
                params: {
                    bannerId: location.state?.bannerId
                }
            })
            setBannerForm(res.data.result.banner);
            setBannerAttachFiles(res.data.result.banner.bannerImage);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    //삭제
    const bannerDelete = async () => {
        try {
            const res = await axios({
                url: SERVER_URL+'/uss/ion/bnr/removeBannerAPI.do',
                method: "DELETE",
                params: {
                    bannerId: location.state?.bannerId
                }
            })
            console.log(res);
            alert(res.data.resultMessage);
            navigate('/system_manager/banner_manager/EgovBannerList');
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getBanner();
    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>배너 관리 수정</strong>
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
                                        onChange={handleChange}
                                        id='bannerNm'
                                        maxLength="20"
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
                                        onChange={handleChange}
                                        id='linkUrl'
                                        maxLength="100"
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
                                    <CFormInput type="file" id="bannerImage" name='bannerImage'
                                        onChange={fileChange}
                                    />
                                    {bannerAttachFiles &&
                                    <>
                                    <CFormLabel>
                                        {bannerAttachFiles || ''}
                                    </CFormLabel>
                                    </>
                                    }
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
                                        onChange={handleChange}
                                        id='bannerDc'
                                        maxLength="20"
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
                                        onChange={handleChange}
                                        id='sortOrdr'
                                        maxLength="20"
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
                                    <CFormSelect
                                        className="form-control form-control-sm"
                                        onChange={handleChange}
                                        name="reflctAt"
                                        id="reflctAt"
                                        defaultValue={bannerForm.reflctAt || ''}
                                    >
                                        <option value={'Y'}>Y</option>
                                        <option value={'N'}>N</option>
                                    </CFormSelect>
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
                                        onChange={handleChange}
                                        readOnly={true}
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
                                        value="저장"
                                        onClick={() => formSubmit()}
                                    />
                                </CCol>
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="삭제"
                                        onClick={() => bannerDelete()}
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
