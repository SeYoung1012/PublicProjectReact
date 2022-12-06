import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useState, useEffect, useContext } from 'react'
import * as EgovNet from 'src/context/egovFetch';

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [datasets,setDatasets] = useState([]);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const retrieveList = ()=>{
    var url = '/sym/bat/getBatchDashboard.do'
    var options = {
      
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify()
      
    }

    EgovNet.requestFetch(url,options,
      (resp) => {

          let mutResultList = [];
          let allList = resp.allList.reverse();
          let successList=resp.successList.reverse();
          let failList= resp.failList.reverse();
          let mutData = [];
          let mutDatasets = [];
          let mutLabel = [];
          
          allList.forEach(function (item, index) {
            mutLabel.push(item.executBeginTime);
            mutData.push(item.count);
          });
          setLabel(mutLabel);

          mutDatasets.push(
            {
              label: '배치 작업 수',
              backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: mutData,
              fill: true,
            }
          )
          mutData=[]
          allList.forEach(function (item, index) {
            var chk=0;
            for(var i=0; i<successList.length; i++){
              if(successList[i].executBeginTime==item.executBeginTime){
                mutData.push(successList[i].count);
                chk = 1;
              }
              if(i==successList.length-1 && chk==0){
                mutData.push(0)
              }
            }
          });

          mutDatasets.push(
            {
              label: '배치작업 성공수',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: mutData,
            }
          )
          mutData=[]
          allList.forEach(function (item, index) {
            var chk = 0;
            for(var i=0; i<failList.length; i++){
              if(failList[i].executBeginTime==item.executBeginTime){
                mutData.push(failList[i].count);
                chk = 1;
              }
              if(i==failList.length-1 && chk==0){
                mutData.push(0);
              }
            }
          });

          mutDatasets.push(
            {
              label: '배치작업 실패 수',
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 2,
              data: mutData,
            }
          )

          setDatasets(mutDatasets);
 


          

          
      },
      function (resp) {
          console.log("err response : ", resp);
      }
    )
  } //retrieveList()

  
  useEffect(() => {
    retrieveList();
    return () => {
    }
  }, []);


  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                배치 차트 테스트
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: label,
              datasets: datasets,
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        
      </CCard>

    
    </>
  )
}

export default Dashboard
