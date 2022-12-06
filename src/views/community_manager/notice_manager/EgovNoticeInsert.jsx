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
    CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import EgovAttachFile from 'src/context/EgovAttachFile'
import { SERVER_URL } from 'src/context/config'

export default function EgovNoticeInsert() {
    //날짜
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;

    const [dataForm, setDataForm] = useState({ topAt: 'N' });//폼데이터
    const [dataAttachFiles, setDataAttachFiles] = useState();//첨부파일
    const navigate = useNavigate();

    const loginVO = sessionStorage.getItem('memId');//세션에서 작성자불러오기

    //dataForm에 담기
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataForm(values => ({ ...values, [name]: value }));
    }

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
                url: SERVER_URL+'/uss/olh/ntc/insertNotice.do',
                data: formData,
            });
            console.log(res);
            if (res.data.resultCode === 200) {
                alert(res.data.resultMessage);
                navigate('/community_manager/notice_manager/EgovNoticeList');
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
                        <strong>공지사항 등록</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DocsExample href="forms/layout#form-grid">
                            {/* 공지여부 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="topAt"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    공지여부
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormSelect
                                        id="topAt"
                                        name="topAt"
                                        onChange={handleChange}

                                    >
                                        <option value="0">N</option>
                                        <option value="1">Y</option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            {/* 등록일시 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="frstRegisterPnttm"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    등록일시
                                </CFormLabel>
                                <CCol sm={8}>
                                    {dateString}
                                </CCol>
                            </CRow>
                            {/* 제목 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="ntcSj"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    제목
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormInput
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="ntcSj"
                                        onChange={handleChange}
                                        maxLength="30"
                                        id='ntcSj'
                                    />
                                </CCol>
                            </CRow>
                            {/* 작성자 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="frstRegisterId"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    작성자
                                </CFormLabel>
                                <CCol sm={8}>
                                    {loginVO}
                                </CCol>
                            </CRow>
                            {/* 내용 */}
                            <CRow className="mb-3">
                                <CFormLabel
                                    htmlFor="ntcCn"
                                    className="col-sm-2 col-form-label col-form-label-sm"
                                >
                                    내용
                                </CFormLabel>
                                <CCol sm={8}>
                                    <CFormTextarea
                                        className="form-control form-control-sm"
                                        id="ntcCn"
                                        name="ntcCn"
                                        rows="3"
                                        onChange={handleChange}
                                    />
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
                                        onClick={() => navigate('/community_manager/notice_manager/EgovNoticeList')}
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
