import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CODE from 'src/context/code'
import axios from 'axios';
import { SERVER_URL } from 'src/context/config';

function EgovBatchOpertRegist()  {
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
  const [checkedDays,setCheckedDays] = useState(new Set());
  const navigate = useNavigate();
  const [registForm, setRegistForm] = useState({
    useAt : 'Y',
    batchOpertId:"",
    batchOpertNm:"",
    executCycle:"01",
    executSchdulMonth:"01",
    executSchdulDay:"01",
    executSchdulHour:"00",
    executSchdulMnt:"00",
    executSchdulSecnd:"00",
  });
  const callInfo = async() =>{
    try{
      const resp = await axios.get(SERVER_URL+'/sym/bat/getBatchSchdulForRegistAPI.do')
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
    }catch(error){
      console.error(error)
    }
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

  const formSubmit=async()=>{
    console.log(registForm);
    var edeMonth = pickerDate.getMonth()+1;
    if(edeMonth<10){
      edeMonth="0"+edeMonth;
    }
    var edeDate = pickerDate.getDate();
    if(edeDate<10){
      edeDate="0"+edeDate;
    }
    if(registForm.batchOpertNm==null || registForm.batchOpertNm=="") alert('?????????????????? ?????????????????? ?????????.');
    else if(registForm.batchProgrm==null || registForm.batchProgrm=="") alert('?????????????????? ?????????????????? ?????????');
    else if(registForm.executCycle=="02" && Array.from(checkedDays).length<1){
      alert('??????????????? ??????????????????');
    }else{
      try{
        const resp = await axios.post(SERVER_URL+'/sym/bat/addBatchOpertAPI.do',registForm)
        if(resp.data.resultCode == CODE.RCV_SUCCESS){
          console.log('asd');
          console.log({
            ...registForm,
            batchOpertId:resp.data.result.batchOpertId,
            batchOpertNm:registForm.batchOpertNm,
            executSchdulDfkSes:Array.from(checkedDays),
            executSchdulDe : String(pickerDate.getFullYear())+String(edeMonth)+String(edeDate),
          })
          try{
            const schedresp = await axios.post(SERVER_URL+'/sym/bat/addBatchSchdul.do',{
              ...registForm,
              batchOpertId:resp.data.result.batchOpertId,
              batchOpertNm:registForm.batchOpertNm,
              executSchdulDfkSes:Array.from(checkedDays),
              executSchdulDe : String(pickerDate.getFullYear())+String(edeMonth)+String(edeDate),
            })
            if(schedresp.data.resultCode == CODE.RCV_SUCCESS){
              alert(schedresp.data.resultMessage);
              window.location.reload();
            }else{
              alert(schedresp.data.resultMessage);
            }
          }catch(error){
            console.error(error)
          }
        }else{
          alert(resp.data.resultMessage);
        }
      }catch(error){
        console.error(error)
      }
    }
  }

  const formCancel = () => {
    if(confirm(CODE.CONFIRM_CANCEL_RGST)){
      navigate(-1);
    }
  }

  useEffect(() => {
    callInfo();
    return () => {
    }
  }, []);
 
    
  return (
    <CRow>
      <form>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>???????????? ??????</strong> <small></small>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/layout#form-grid">

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ???????????????
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,batchOpertNm:e.target.value})}
                      maxLength="15"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ???????????????
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,batchProgrm:e.target.value})}
                  
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormLabel
                    className="col-form-label col-form-label-sm">
                    - "????????????????????? globals.properties - SHELL.(UNIX/WINDOWS).batchShellFiles??? ?????? ??????????????? ????????? ????????????.(WhiteList)<br/>
                    - "???????????? ?????? ??????"<br></br>
                    </CFormLabel>
                  </CCol>
                </CRow>


                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ????????????
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,paramtr:e.target.value})}
                      maxLength="15"
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="colFormLabelSm"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ????????????
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
                    ???
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
                    ???
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
                    ???
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulMnt:e.target.value})}
                    >
                      {executSchdulMntList}
                      
                    </CFormSelect>
                    </CCol>
                    ???
                    <CCol sm={2}>
                    <CFormSelect
                      className="form-control form-control-sm"
                      onChange={(e)=>setRegistForm({...registForm,executSchdulSecnd:e.target.value})}
                    >
                      {executSchdulSecndList}
                      
                    </CFormSelect>
                    </CCol>
                    ???
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
                      value="??????"
                      onClick={()=>formCancel()}
                    />
                  </CCol>
                  <CCol sm={1}>
                    <CFormInput
                      type="button"
                      className="form-control form-control-sm"
                      style={{color:"white", backgroundColor:"navy"}}
                      value="??????"
                      onClick={()=>formSubmit()}
                    />
                  </CCol>
                </CRow>

              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>


        </form>
    </CRow>
    
  )
};

export default EgovBatchOpertRegist;