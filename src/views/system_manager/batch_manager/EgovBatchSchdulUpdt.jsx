import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CODE from 'src/context/code'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Pagination} from 'src/context/Pagination'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovBatchSchdulUpdt()  {
  const location = useLocation();
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    batchOpertId:"",
    batchOpertNm:"",
    executCycle:"01",
    executSchdulMonth:"01",
    executSchdulDay:"01",
    executSchdulHour:"00",
    executSchdulMnt:"00",
    executSchdulSecnd:"00",
  });
  const [visible,setVisible] = useState(false);
  const batchOpertIdRef = useRef();
  const batchOpertNmRef = useRef();
  const timeRef = useRef();
  const dayRef = useRef();
  const monthRef = useRef();
  const dateRef = useRef();
  const pickerRef = useRef();
  const [executCycleList, setExecutCycleList] = useState();
  const [executSchdulDfkSeList, setExecutSchdulDfkSeList] = useState();
  const [executSchdulHourList, setExecutSchdulHourList] = useState();
  const [executSchdulMntList, setExecutSchdulMntList] = useState();
  const [executSchdulSecndList, setExecutSchdulSecndList] = useState();
  const [executSchdulMonthList, setExecutSchdulMonthList] = useState();
  const [executSchdulDateList, setExecutSchdulDateList] = useState();
  const [pickerDate, setPickerDate] = useState(new Date());
  const [resultList, setResultList] = useState();
  const [pageButton, setPageButton] = useState();
  const [searchVO, setSearchVO] = useState(location.state?.searchVO || { pageIndex: 1, searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [checkedDays,setCheckedDays] = useState(new Set());
  
  const callInfo = async() =>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchSchdulForUpdateAPI.do',{
        params:{
          batchSchdulId:location.state.batchSchdulId
        }
      })
      let mutCycleList = [];
      let mutDfkSeList = [];
      let mutHourList = [];
      let mutMntList = [];
      let mutSecndList = [];
      let mutMonthList = [];
      let mutDateList = [];

      resp.data.result.executCycleList.forEach(function(item){
        mutCycleList.push(
          <option value={item.code}>{item.codeNm}</option>
        );
      });
      setExecutCycleList(mutCycleList);

      resp.data.result.executSchdulDfkSeList.forEach(function(item){
        mutDfkSeList.push(
          <CFormCheck  value={item.code} label={item.codeNm}
            onChange={(e)=>{
              if(e.target.checked){
                checkedDays.add(e.target.value);
                console.log(checkedDays);
              }else if(!e.target.checked){
                checkedDays.delete(e.target.value);
              }
            }}
          />
        )
      })
      setExecutSchdulDfkSeList(mutDfkSeList);

      var hourListValues = Object.values(resp.data.result.executSchdulHourList);
      hourListValues.sort();
      hourListValues.forEach(function(item,index){
        mutHourList.push(
          <option value={item}>{item}</option>
        )
      })
      setExecutSchdulHourList(mutHourList);

      var mntListValues = Object.values(resp.data.result.executSchdulMntList);
      mntListValues.sort();
      mntListValues.forEach(function(item,index){
        mutMntList.push(
          <option value={item}>{item}</option>
        )
      })
      setExecutSchdulMntList(mutMntList);

      var secndListValues = Object.values(resp.data.result.executSchdulSecndList);
      secndListValues.sort();
      secndListValues.forEach(function(item,index){
        mutSecndList.push(
          <option value={item}>{item}</option>
        )
      })
      setExecutSchdulSecndList(mutSecndList);

      for(var i=1; i<13; i++){
        if(i<10){
          mutMonthList.push(
            <option value={"0"+i}>{"0"+i}</option>
          )
        }else if(i>=10){
          mutMonthList.push(
            <option value={i}>{i}</option>
          )
        }
      }
      setExecutSchdulMonthList(mutMonthList);

      for(var i=1; i<31; i++){
        if(i<10){
          mutDateList.push(
            <option value={"0"+i}>{"0"+i}</option>
          )
        }else if(i>=10){
          mutDateList.push(
            <option value={i}>{i}</option>
          )
        }
      }
      setExecutSchdulDateList(mutDateList);

      batchOpertIdRef.current.value=resp.data.result.batchSchdul.batchOpertId;
      batchOpertNmRef.current.value=resp.data.result.batchSchdul.batchOpertNm;
    }catch(error){
      console.error(error)
    }
  }

  const retrieveList = async(searchVO) =>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchOpertListAPI.do',{
        params:searchVO
      })
      let mutResultList = [];
          
      resp.data.result.resultList.forEach(function (item, index) {
        if (index === 0) mutResultList = []; // 목록 초기화
        mutResultList.push(
          <CTableRow onClick={()=>mordalClick(item)}>
            <CTableDataCell>{item.batchOpertId}</CTableDataCell>
            <CTableDataCell>{item.batchOpertNm}</CTableDataCell>
            <CTableDataCell>{item.batchProgrm}</CTableDataCell>
            <CTableDataCell>{item.paramtr}</CTableDataCell>
            
          </CTableRow>
        );
      });
      setResultList(mutResultList);

      setPageButton(
        Pagination(resp.data.result.paginationInfo,searchVO,retrieveList)
      )
    }catch(error){
      console.error(error)
    }
  }
  
  const formSubmit = async() => {
    var edeMonth = pickerDate.getMonth()+1;
    if(edeMonth<10){
      edeMonth="0"+edeMonth;
    }
    var edeDate = pickerDate.getDate();
    if(edeDate<10){
      edeDate="0"+edeDate;
    }
    if(registForm.executCycle=="02" && Array.from(checkedDays).length<1){
      alert('요일선택은 필수값입니다');
    }else{
      if(registForm.executCycle=="03"){
        console.log({
          ...registForm,
          batchOpertId:batchOpertIdRef.current.value,
          batchOpertNm:batchOpertNmRef.current.value,
          executSchdulDfkSes:Array.from(checkedDays),
          executSchdulDe:"000000"+registForm.executSchdulDay,
        });
      }else if(registForm.executCycle=="04"){
        console.log({
          ...registForm,
          batchOpertId:batchOpertIdRef.current.value,
          batchOpertNm:batchOpertNmRef.current.value,
          executSchdulDfkSes:Array.from(checkedDays),
          executSchdulDe:"0000"+registForm.executSchdulMonth+registForm.executSchdulDay,
        });
      }else if(registForm.executCycle=="05"){
        console.log({
          ...registForm,
          batchOpertId:batchOpertIdRef.current.value,
          batchOpertNm:batchOpertNmRef.current.value,
          executSchdulDfkSes:Array.from(checkedDays),
          executSchdulDe : String(pickerDate.getFullYear())+String(edeMonth)+String(edeDate),
        });
      }

      try{
        const resp = await axios.post(SERVER_URL+'/sym/bat/updateBatchSchdulAPI.do',{
          ...registForm,
          batchSchdulId:location.state.batchSchdulId,
          batchOpertId:batchOpertIdRef.current.value,
          batchOpertNm:batchOpertNmRef.current.value,
          executSchdulDfkSes:Array.from(checkedDays),
          executSchdulDe : String(pickerDate.getFullYear())+String(edeMonth)+String(edeDate),
        })
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          alert(resp.data.resultMessage);
          navigate('/system_manager/batch_manager/EgovBatchSchdulDetail',{state:{batchSchdulId:location.state.batchSchdulId}})
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  }

  function mordalClick(item){
    batchOpertIdRef.current.value=item.batchOpertId;
    batchOpertNmRef.current.value=item.batchOpertNm;
    setVisible(false);
  }
  function changeCycle(e){
    if(e.target.value=="01"){
      dayRef.current.style.display="none"
      monthRef.current.style.display="none"
      dateRef.current.style.display="none"
      pickerRef.current.style.display="none"
      setRegistForm({
        ...registForm,
        executCycle:e.target.value,
      });
      console.log(e.target.value);
      console.log(timeRef.current.style);
    }else if(e.target.value=="02"){
      dayRef.current.style.display=""
      monthRef.current.style.display="none"
      dateRef.current.style.display="none"
      pickerRef.current.style.display="none"
      setRegistForm({
        ...registForm,
        executCycle:e.target.value,
      });
    }else if(e.target.value=="03"){
      dayRef.current.style.display="none"
      monthRef.current.style.display="none"
      dateRef.current.style.display=""
      pickerRef.current.style.display="none"
      setRegistForm({
        ...registForm,
        executCycle:e.target.value,
      });
    }else if(e.target.value=="04"){
      dayRef.current.style.display="none"
      monthRef.current.style.display=""
      dateRef.current.style.display=""
      pickerRef.current.style.display="none"
      setRegistForm({
        ...registForm,
        executCycle:e.target.value,
      });
    }else if(e.target.value=="05"){
      dayRef.current.style.display="none"
      monthRef.current.style.display="none"
      dateRef.current.style.display="none"
      pickerRef.current.style.display=""
      setRegistForm({
        ...registForm,
        executCycle:e.target.value,
      });
    }
  }

  useEffect(() => {
    callInfo();
    retrieveList(searchVO);
    return () => {
    }
  }, []);
 
    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>배치스케줄 수정</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">
              <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치스케줄ID
                  </CFormLabel>
                  <CCol sm={10}>
                  <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      value={location.state.batchSchdulId}
                      disabled={true}
                    />
                  </CCol>

                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치작업ID
                  </CFormLabel>
                  <CCol sm={9}>
                  <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      ref={batchOpertIdRef}
                      maxLength="60"
                      disabled={true}
                    />
                  </CCol>
                  <CCol sm={1}>
                  <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="ㅇ"
                      onClick={()=>setVisible(true)}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    배치작업명
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      ref={batchOpertNmRef}
                      maxLength="60"
                      disabled={true}
                    />
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    실행주기
                  </CFormLabel>
                  <CCol sm={10}>
                  <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>changeCycle(e)}
                    >
                      {executCycleList}
                      
                    </CFormSelect>
                    </CCol>

                    <div ref={dayRef} style={{display:"none"}}>
                    
                    <DocsExample href="forms/checks-radios#inline">
                      {executSchdulDfkSeList}
                    </DocsExample>
                    
                    
                    </div>

                    <div ref={monthRef} style={{display:"none"}}>
                    <CRow>
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulMonth:e.target.value})}
                    >
                      {executSchdulMonthList}
                      
                    </CFormSelect>
                    </CCol>
                    월
                    </CRow>
                    </div>
                    <div ref={dateRef} style={{display:"none"}}>
                    <CRow>
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulDay:e.target.value})}
                    >
                      {executSchdulDateList}
                      
                    </CFormSelect>
                    </CCol>
                    일
                    </CRow>
                    </div>

                    <div ref={pickerRef} style={{display:"none"}}>
                    <DatePicker 
                      selected={pickerDate} 
                      onChange={date => setPickerDate(date)} 
                      dateFormant="yyyy-MM-dd"
                    />
                    </div>


                    <div ref={timeRef}>
                    <CRow>
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulHour:e.target.value})}
                    >
                      {executSchdulHourList}
                      
                    </CFormSelect>
                    </CCol>
                    시
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulMnt:e.target.value})}
                    >
                      {executSchdulMntList}
                      
                    </CFormSelect>
                    </CCol>
                    분
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulSecnd:e.target.value})}
                    >
                      {executSchdulSecndList}
                      
                    </CFormSelect>
                    </CCol>
                    초
                    </CRow>
                    </div>
                  </CCol>
                  
                 
                </CRow>

                
                <CRow className="mb-1 justify-content-end">
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="취소"
                      onClick={()=>navigate(-1)}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="저장"
                      onClick={()=>formSubmit()}
                    />
                  </CCol>
                </CRow>

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>


        </form>
        {/*배치작업 찾기 모달*/}
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>메뉴 목록</CModalTitle>
          </CModalHeader>
          <CModalBody>
          <CForm className="row g-3 d-flex justify-content-end">
          <CCol md={4}>
            <CFormSelect onChange={(e)=>setSearchVO({...searchVO,searchCondition:e.target.value})}>
              <option value="">선택하세요</option>
              <option value="0">배치작업명</option>
              <option value="1">배치프로그램</option>
            </CFormSelect>
            </CCol>
            <CCol md={5}>
            <CFormInput  name="searchKeyword" type="text" size="35" 
                    value={searchVO && searchVO.searchKeyword}
                    onChange={(e)=>setSearchVO({...searchVO,searchKeyword:e.target.value})}
                    maxLength="255"/>
            </CCol>
            <CCol md={2}>
            <CFormInput  type="button"
                    value="조회"
                    onClick={()=>retrieveList(searchVO)}/>
            </CCol>
          </CForm>
          <DocsExample >

            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">프로그램파일명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">프로그램명</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {resultList}
                  
                  

              </CTableBody>
              
            </CTable>
            {pageButton}
          </DocsExample>
            
          </CModalBody>
          <CModalFooter>
          
          </CModalFooter>
        </CModal>
    </CRow>
    
  )
};

export default EgovBatchSchdulUpdt;