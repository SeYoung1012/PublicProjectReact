import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

function TreeView({prop,treeClick,checkBoxClick}){

    const allMenu = prop || []; //메뉴배열
    const data = []; 
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
                    text: allMenu[i].menuNm,
                    isLeaf: true,
                    state:1,
                    children:childTemp,
                },
                
              })
            }else{
              temp.push({
                key:allMenu[i].upperMenuId,
                value:{
                    id: allMenu[i].menuNo,
                    text: allMenu[i].menuNm,
                    isLeaf: true,
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
                    text: allMenu[i].menuNm,
                    state:1,
                    isLeaf: true
                },
              })
            }else{
              temp.push({
                key:allMenu[i].upperMenuId,
                value:{
                    id: allMenu[i].menuNo,
                    text: allMenu[i].menuNm,
                    isLeaf: true
                },
              })
            }
            
          }
        }
      }
    }

    temp.forEach(function(item){
      data.push(item.value);
    })

    function onSelectItemHandler(item) {
      var menuInfo={};
      allMenu.find(function(element){

        if(element.menuNo == item.id){
          menuInfo={
            menuNo : element.menuNo,
            menuOrdr : element.menuOrdr,
            menuNm : element.menuNm,
            upperMenuId : element.upperMenuId,
            menuDc : element.menuDc,
            relateImagePath : element.relateImagePath,
            relateImageNm : element.relateImageNm,
            progrmFileNm : element.progrmFileNm,
          }
          return;
        }
      })
      console.log(menuInfo);
      treeClick(menuInfo);
    }

    function onCheckItemHandler(item){
      checkBoxClick(item);
    }
    
  if(checkBoxClick == null || checkBoxClick == ''){
    return <DeniReactTreeView items={ data } onSelectItem={ onSelectItemHandler } />
  }else{
    return <DeniReactTreeView items={ data } 
                              onSelectItem={ onSelectItemHandler } 
                              showCheckbox={true}
                              onCheckItem={onCheckItemHandler}/>
  }
  
    
  
}

function tv({prop,treeClick,checkBoxClick}){
  return <TreeView prop={prop} treeClick={treeClick} checkBoxClick={checkBoxClick}  />
}


export default React.memo(tv);
