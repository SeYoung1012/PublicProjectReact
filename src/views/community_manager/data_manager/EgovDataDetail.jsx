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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import EgovAttachFile from 'src/context/EgovAttachFile'
import { SERVER_URL } from 'src/context/config'
export default function EgovDataDetail() {
    const [dataForm, setDataForm] = useState({});
    const [dataAttachFiles, setDataAttachFiles] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const getData = async () => {
        try {
            const res = await axios.get(SERVER_URL+'/uss/olh/dat/selectDataDetailAPI.do', {
                params: {
                    dataId: location.state?.dataId
                }
            })
            console.log(res);
            setDataForm(res.data.result.result);
            setDataAttachFiles(res.data.result.resultFiles);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>자료실 상세</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DocsExample href="forms/layout#form-grid">
                            {/* 배너ID */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    제목
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="qestnSj" defaultValue={dataForm.qestnSj||''} readOnly plainText />
                                </CCol>
                            </CRow>
                            {/* 게시일 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    게시일
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="frstRegisterPnttm" defaultValue={dataForm.frstRegisterPnttm || ''} readOnly plainText />
                                </CCol>
                            </CRow>
                            
                            {/* 조회수 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    조회수
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="inqireCo" defaultValue={dataForm.inqireCo || ''} readOnly plainText />
                                </CCol>
                            </CRow>

                            {/* 내용 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    내용
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput type="text" id="qestnCn" defaultValue={dataForm.qestnCn || ''} readOnly plainText />
                                </CCol>
                            </CRow>

                            {/* 첨부파일 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    첨부파일
                                </CFormLabel>
                                <CCol sm={8}>
                                    <EgovAttachFile boardFiles={dataAttachFiles} />
                                </CCol>
                            </CRow>

                            <CRow className="mb-1 justify-content-end">
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="수정"
                                        onClick={() => navigate('/community_manager/data_manager/EgovDataUpdate', { state: { dataId: location.state?.dataId } })}
                                    />
                                </CCol>
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="목록"
                                        onClick={() => navigate('/community_manager/data_manager/EgovDataList')}
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
