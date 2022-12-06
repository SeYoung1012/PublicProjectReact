import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'
import {
  TreeList,
  orderBy,
  filterBy,
  mapTree,
  extendDataItem,
  TreeListTextFilter,
  TreeListNumericFilter,
  TreeListDateFilter,
  TreeListBooleanFilter,
} from "@progress/kendo-react-treelist";

function TreeTable({prop,treeClick,checkBoxClick}){

  const allMenu = prop || []; //메뉴배열
  const employees = []; 
  let lastTreeNo = 0;

  allMenu.forEach(function(item, index){
    var curTreeNo = item.menuTreeNo;
    console.log(curTreeNo);
    if(curTreeNo > lastTreeNo){
      lastTreeNo = curTreeNo;
    };
  })


  /** 하위 트리노드 존재여부 확인 */
  function hasChildTreeNode(parentNode){

    for(var i = 0; i<allMenu.length; i++){
      if(allMenu[i].upperMenuId == parentNode) return true;
    }
    
    return false;
  }


  var temp=[];
  for(var j=lastTreeNo; j>0;j--){
    for(var i=0; i<allMenu.length; i++){
      if(allMenu[i].menuTreeNo == j){
        if(hasChildTreeNode(allMenu[i].menuNo)){
          var childTemp = [];

          temp.find(function(element){
            if(element.key == allMenu[i].menuNo){
              childTemp.push(element.value);
              
            }
          })

          for(var k = 0; k < temp.length; k++) {
            if(temp[k].key == allMenu[i].menuNo)  {
              temp.splice(k, 1);
              k--;
              console.log('a');
            }
          }
          if(allMenu[i].chkYeoBu&&allMenu[i].chkYeoBu>0){
            temp.push({
              key:allMenu[i].upperMenuId,
              value:{
                  id: allMenu[i].menuNo,
                  reportsTo:allMenu[i].upperMenuId,
                  menuNo:allMenu[i].menuNo,
                  menuNm:allMenu[i].menuNm,
                  menuDc:allMenu[i].menuDc,
                  progrmNm:allMenu[i].progrmFileNm,
                  text: allMenu[i].menuNm,
                  employees:childTemp,
              },
              
            })
          }else{
            temp.push({
              key:allMenu[i].upperMenuId,
              value:{
                  id: allMenu[i].menuNo,
                  reportsTo:allMenu[i].upperMenuId,
                  menuNo:allMenu[i].menuNo,
                  menuNm:allMenu[i].menuNm,
                  menuDc:allMenu[i].menuDc,
                  progrmNm:allMenu[i].progrmFileNm,
                  text: allMenu[i].menuNm,
                  children:childTemp,
              },
              
            })
          }
          
        }else{
          if(allMenu[i].chkYeoBu&&allMenu[i].chkYeoBu>0){
            temp.push({
              key:allMenu[i].upperMenuId,
              value:{
                  id: allMenu[i].menuNo,
                  reportsTo:allMenu[i].upperMenuId,
                  menuNo:allMenu[i].menuNo,
                  menuNm:allMenu[i].menuNm,
                  menuDc:allMenu[i].menuDc,
                  progrmNm:allMenu[i].progrmFileNm,
                  text: allMenu[i].menuNm,
              },
            })
          }else{
            temp.push({
              key:allMenu[i].upperMenuId,
              value:{
                  id: allMenu[i].menuNo,
                  reportsTo:allMenu[i].upperMenuId,
                  menuNo:allMenu[i].menuNo,
                  menuNm:allMenu[i].menuNm,
                  menuDc:allMenu[i].menuDc,
                  progrmNm:allMenu[i].progrmFileNm,
                  text: allMenu[i].menuNm,
              },
            })
          }
          
        }
      }
    }
  }

  temp.forEach(function(item){
    employees.push(item.value);
  })


const subItemsField = "employees";
const expandField = "expanded";
const columns = [
  {
    field: "menuNo",
    title: "메뉴 번호",
    width: "250px",
    filter: TreeListTextFilter,
    expandable: true,
  },
  {
    field: "menuNm",
    title: "메뉴 한글명",
    width: "200px",
    filter: TreeListTextFilter,
  },
  {
    field: "progrmNm",
    title: "프로그램명",
    width: "200px",
    filter: TreeListTextFilter,
  },
  {
    field: "menuDc",
    title: "메뉴 설명",
    width: "100px",
    filter: TreeListTextFilter,
  },
];

const [state, setState] = React.useState({
  data: employees,
  dataState: {
    sort: [
      {
        field: "name",
        dir: "asc",
      },
    ],
    filter: [],
  },
  expanded: [1, 2, 32],
});
const onExpandChange = (e) => {
  setState({
    ...state,
    expanded: e.value
      ? state.expanded.filter((id) => id !== e.dataItem.id)
      : [...state.expanded, e.dataItem.id],
  });
};
const handleDataStateChange = (event) => {
  setState({
    ...state,
    dataState: event.dataState,
  });
};
const addExpandField = (dataTree) => {
  const expanded = state.expanded;
  return mapTree(dataTree, subItemsField, (item) =>
    extendDataItem(item, subItemsField, {
      [expandField]: expanded.includes(item.id),
    })
  );
};
const processData = () => {
  let { data, dataState } = state;
  let filteredData = filterBy(data, dataState.filter, subItemsField);
  let sortedData = orderBy(filteredData, dataState.sort, subItemsField);
  return addExpandField(sortedData);
};


    
 
    return <TreeList
            style={{
              maxHeight: "510px",
              overflow: "auto",
            }}
            expandField={expandField}
            subItemsField={subItemsField}
            onExpandChange={onExpandChange}
            sortable={{
              mode: "multiple",
            }}
            {...state.dataState}
            data={processData()}
            onDataStateChange={handleDataStateChange}
            columns={columns}
          />
  
    
  
}

function tv({prop}){
  return <TreeTable prop={prop} />
}


export default React.memo(tv);
