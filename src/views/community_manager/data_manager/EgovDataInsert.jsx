import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CCardFooter,
    CFormTextarea,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import EgovAttachFile from 'src/context/EgovAttachFile'
import { SERVER_URL } from 'src/context/config'

export default function EgovDataInsert() {
    const [dataForm, setDataForm] = useState({});//폼데이터
    const [dataAttachFiles, setDataAttachFiles] = useState();//첨부파일
    const navigate = useNavigate();

    //dataForm에 담기
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm(values => ({ ...values, [name]: value }));
    }
    //파일업로드
    /* const fileChange = (e) => {
        setDataForm({ ...dataForm, file_1: e.target.files[0] });
    } */

    //폼데이터 전송
    const formSubmit = async () => {
        const formData = new FormData();
        for (let key in dataForm) {
            formData.append(key, dataForm[key]);
            console.log("dataForm [%s] ", key, dataForm[key]);
        }
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL+'/uss/olh/dat/insertData.do',
                data: formData,
            });
            console.log(res);
            if (res.data.resultCode === 200) {
                alert(res.data.resultMessage);
                navigate('/community_manager/data_manager/EgovDataList');
            } else {
                alert('실패');
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>자료실 등록</strong>
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
                                        onChange={handleChange}
                                        maxLength="30"
                                        id='qestnSj'
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
                                    <CFormTextarea
                                        className="form-control form-control-sm"
                                        id="qestnCn"
                                        name="qestnCn"
                                        rows="3"
                                        onChange={handleChange}
                                    ></CFormTextarea>
                                </CCol>
                            </CRow>
                            
                            {/* 첨부파일 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="file_1"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    첨부파일
                                </CFormLabel>
                                <CCol sm={8}>
                                    {/* <CFormInput type="file" id="file_1" name='file_1'
                                        onChange={fileChange} /> */}
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
                                        mode={"등록"} />
                                </CCol>
                            </CRow>

                            <CRow className="mb-1 justify-content-end">
                                <CCol sm={1}>
                                    <CFormInput
                                        type="button"
                                        className="form-control form-control-sm"
                                        style={{ color: "white", backgroundColor: "navy" }}
                                        value="등록"
                                        onClick={() => formSubmit()}
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
