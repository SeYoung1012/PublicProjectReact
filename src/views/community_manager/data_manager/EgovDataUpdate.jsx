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
import EgovAttachFile from 'src/context/EgovAttachFile'
import { SERVER_URL } from 'src/context/config'

export default function EgovDataUpdate() {
    const [dataForm, setDataForm] = useState({});
    const [dataAttachFiles, setDataAttachFiles] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm(values => ({ ...values, [name]: value }));
    }

    //파일업로드
    /* const fileChange = (e) => {
        setDataForm({ ...dataForm, file_1: e.target.files[0] });
        setDataAttachFiles(e.target.files[0].name);
        console.log(e.target.files);
    } */

    //수정
    const formSubmit = async () => {
        const formData = new FormData();
        for (let key in dataForm) {
            formData.append(key, dataForm[key]);
            console.log("dataForm [%s] ", key, dataForm[key]);
        }
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL+'/uss/olh/dat/updateDataAPI.do',
                data: formData,
            });
            if (res.data.resultCode === 200) {
                alert(res.data.resultMessage);
                navigate('/community_manager/data_manager/EgovDataDetail', { state: { dataId: location.state?.dataId } });
            } else {
                alert('실패');
            }
        } catch (error) {
            console.error(error);
        }
    }
    //상세 불러오기
    const getData = async () => {
        try {
            const res = await axios.get('/uss/olh/dat/selectDataDetailAPI.do', {
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

    //삭제
    const dataDelete = async () => {
        try {
            const res = await axios({
                url: SERVER_URL+'/uss/olh/dat/deleteDataAPI.do',
                method: "DELETE",
                params: {
                    dataId: location.state?.dataId
                }
            })
            console.log(res);
            alert(res.data.resultMessage);
            navigate('/community_manager/data_manager/EgovDataList');
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
                        <strong>자료실 수정</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DocsExample href="forms/layout#form-grid">
                            {/* 제목 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="qestnSj"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    제목
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="qestnSj"
                                        maxLength="20"
                                        onChange={handleChange}
                                        id='qestnSj'
                                        value={dataForm.qestnSj || ''}
                                    />
                                </CCol>
                            </CRow>
                            
                            {/* 내용 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="qestnCn"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    내용
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="qestnCn"
                                        onChange={handleChange}
                                        id='qestnCn'
                                        maxLength="20"
                                        value={dataForm.qestnCn || ''}
                                    />
                                </CCol>
                            </CRow>
                            {/* 첨부파일 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="bannerImage"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    첨부파일
                                </CFormLabel>
                                <CCol sm={8}>
                                    <EgovAttachFile
                                        fnChangeFile={(attachfile) => {
                                            console.log("====>>> Changed attachfile file = ", attachfile);
                                            setDataForm({ ...dataForm, file_1: attachfile });
                                        }}
                                        fnDeleteFile={(deletedFile) => {
                                            console.log("====>>> Delete deletedFile = ", deletedFile);
                                            setDataAttachFiles(deletedFile);
                                        }}
                                        boardFiles={dataAttachFiles}
                                        mode={"수정"} />
                                    {/* <CFormInput type="file" id="file_1" name='file_1'
                                        onChange={fileChange} /> */}
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
                                        onClick={() => dataDelete()}
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
