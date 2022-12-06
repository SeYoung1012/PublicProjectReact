import React from 'react';
import {
    CPagination,
    CPaginationItem,
  } from '@coreui/react'
  import { DocsExample } from 'src/components'

export function Pagination(pi,searchVO,retrieveList) {
    console.log("in pagnation");
    console.log(pi);


    var totalPageCount = Math.floor((pi.totalRecordCount - 1) / pi.recordCountPerPage) + 1
    var firstPageNoOnPageList = Math.floor((pi.currentPageNo - 1) / pi.pageSize) * pi.pageSize + 1;
    var lastPageNoOnPageList = firstPageNoOnPageList + pi.pageSize -1;
    if(lastPageNoOnPageList > pi.totalPageCount){
        lastPageNoOnPageList = pi.totalPageCount;
    }
    var firstRecordIndex = (pi.currentPageNo - 1) * pi.recordCountPerPage;
    var lastRecordIndex = (pi.currentPageNo) * pi.recordCountPerPage;

    const paginationInfo = {
        currentPageNo : pi.currentPageNo,
        recordCountPerPage : pi.recordCountPerPage,
        pageSize : pi.pageSize,
        totalRecordCount : pi.totalRecordCount,
        totalPageCount : totalPageCount,
        firstPageNoOnPageList : firstPageNoOnPageList,
        lastPageNoOnPageList : lastPageNoOnPageList,
        firstRecordIndex : firstRecordIndex,
        lastRecordIndex : lastRecordIndex
    };

    const paginationButton = [];
    
    if(paginationInfo.currentPageNo > 1){
        paginationButton.push(
            <CPaginationItem aria-label="Previous" 
                onClick={(e)=>pageFirst()}
            >
                <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
        )
        paginationButton.push(
            <CPaginationItem aria-label="Previous" 
                id={'prev'}
                onClick={(e)=>pagePrev()}
            >
                <span aria-hidden="true">&lt;</span>
            </CPaginationItem>
        )
    }
    
    for(var i=paginationInfo.firstPageNoOnPageList-1;i<paginationInfo.lastPageNoOnPageList;i++){

        if(i==paginationInfo.currentPageNo-1){
            paginationButton.push(
                <CPaginationItem active>{i+1}</CPaginationItem>
            )
        }else{
            paginationButton.push(
                <CPaginationItem 
                    id={i+1}
                    onClick={(e)=>pageMove(e.target.id)
                }>{i+1}</CPaginationItem>
            )
        }
    }

    if(paginationInfo.currentPageNo != paginationInfo.totalPageCount){
        paginationButton.push(
            <CPaginationItem aria-label="Next"
                onClick={(e)=>pageNext()}
            >
                <span aria-hidden="true">&gt;</span>
            </CPaginationItem>
        )
        paginationButton.push(
            <CPaginationItem aria-label="Next"
                onClick={(e)=>pageLast()}
            >
                <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
        )
    }
    

    function pageMove(index){

        searchVO={...searchVO,pageIndex:index};

        retrieveList(searchVO);  
    }
    function pagePrev(){
        
        var pageIndex = paginationInfo.firstPageNoOnPageList-1;
        if(pageIndex < 1) {
            pageIndex = 1;
        }
        retrieveList({...searchVO,pageIndex:pageIndex});  
    }
    function pageNext(){
        
        var pageIndex = paginationInfo.lastPageNoOnPageList+1;
        if(pageIndex > paginationInfo.totalPageCount) pageIndex = paginationInfo.totalPageCount;
        retrieveList({...searchVO,pageIndex:pageIndex});  
    }function pageFirst(){
        
        var pageIndex = 1;
        retrieveList({...searchVO,pageIndex:pageIndex});  
    }function pageLast(){
        
        var pageIndex = paginationInfo.totalPageCount;
        retrieveList({...searchVO,pageIndex:pageIndex});  
    }
    
    return (
        <DocsExample href="components/pagination#disabled-and-active-states" >
              <CPagination aria-label="Page navigation example" className='d-flex justify-content-center'>
                {paginationButton}
            </CPagination>
        </DocsExample>
    );
};
