import React from 'react';


export function validateDate(form) {
    var bValid = true;
    var focusField = null;
    var i = 0;
    var fields = new Array();
    oDate = new DateValidations();
    for (x in oDate) {
        var value = form[oDate[x][0]].value;
        var datePattern = oDate[x][2]("datePatternStrict");
        if ((form[oDate[x][0]].type == 'text' ||
             form[oDate[x][0]].type == 'textarea') &&
            (value.length > 0) &&
            (datePattern.length > 0)) {
          var MONTH = "MM";
          var DAY = "dd";
          var YEAR = "yyyy";
          var orderMonth = datePattern.indexOf(MONTH);
          var orderDay = datePattern.indexOf(DAY);
          var orderYear = datePattern.indexOf(YEAR);
          if ((orderDay < orderYear && orderDay > orderMonth)) {
              var iDelim1 = orderMonth + MONTH.length;
              var iDelim2 = orderDay + DAY.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderDay && iDelim2 == orderYear) {
                 dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
              } else if (iDelim1 == orderDay) {
                 dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
              } else if (iDelim2 == orderYear) {
                 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
              } else {
                 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                 if (!isValidDate(matched[2], matched[1], matched[3])) {
                    if (i == 0) {
                        focusField = form[oDate[x][0]];
                    }
                    fields[i++] = oDate[x][1];
                    bValid =  false;
                 }
              } else {
                 if (i == 0) {
                     focusField = form[oDate[x][0]];
                 }
                 fields[i++] = oDate[x][1];
                 bValid =  false;
              }
          } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
              var iDelim1 = orderDay + DAY.length;
              var iDelim2 = orderMonth + MONTH.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderMonth && iDelim2 == orderYear) {
                  dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
              } else if (iDelim1 == orderMonth) {
                  dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
              } else if (iDelim2 == orderYear) {
                  dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
              } else {
                  dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                  if (!isValidDate(matched[1], matched[2], matched[3])) {
                      if (i == 0) {
                          focusField = form[oDate[x][0]];
                      }
                      fields[i++] = oDate[x][1];
                      bValid =  false;
                   }
              } else {
                  if (i == 0) {
                      focusField = form[oDate[x][0]];
                  }
                  fields[i++] = oDate[x][1];
                  bValid =  false;
              }
          } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
              var iDelim1 = orderYear + YEAR.length;
              var iDelim2 = orderMonth + MONTH.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderMonth && iDelim2 == orderDay) {
                  dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
              } else if (iDelim1 == orderMonth) {
                  dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
              } else if (iDelim2 == orderDay) {
                  dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
              } else {
                  dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                  if (!isValidDate(matched[3], matched[2], matched[1])) {
                      if (i == 0) {
                          focusField = form[oDate[x][0]];
                       }
                       fields[i++] = oDate[x][1];
                       bValid =  false;
                   }
               } else {
                   if (i == 0) {
                       focusField = form[oDate[x][0]];
                   }
                   fields[i++] = oDate[x][1];
                   bValid =  false;
               }
          } else {
              if (i == 0) {
                  focusField = form[oDate[x][0]];
              }
              fields[i++] = oDate[x][1];
              bValid =  false;
          }
       }
    }
    if (fields.length > 0) {
       focusField.focus();
       alert(fields.join('\n'));
    }
    return bValid;
 }

 export function isValidDate(day, month, year) {
 if (month < 1 || month > 12) {
         return false;
     }
     if (day < 1 || day > 31) {
         return false;
     }
     if ((month == 4 || month == 6 || month == 9 || month == 11) &&
         (day == 31)) {
         return false;
     }
     if (month == 2) {
         var leap = (year % 4 == 0 &&
                    (year % 100 != 0 || year % 400 == 0));
         if (day>29 || (day == 29 && !leap)) {
             return false;
         }
     }
     return true;
 }
 export function validateMinLength(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oMinLength = new minlength();
     for (x in oMinLength) {
         var field = form[oMinLength[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea') {

             var iMin = parseInt(oMinLength[x][2]("minlength"));
             if ((trim(field.value).length > 0) && (field.value.length < iMin)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oMinLength[x][1];
                 isValid = false;
             }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return isValid;
 }
 export function validatePwdCheckRepeat(form) {
     
         var bValid = true;
         var focusField = null;
         var i = 0;
         var fields = new Array();
         oPassword = new pwdCheckRepeat();
         for (x in oPassword) {
             var field = form[oPassword[x][0]];
             if (field.type == 'password') {
                 if (trim(field.value).length==0 || isRepeatCharacter(field)) {
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oPassword[x][1];
                     bValid = false;
                 }
             }
         }
         if (fields.length > 0) {
             focusField.focus();
             alert(fields.join('\n'));
         }
         return bValid;
     }

     //반복된 숫자,문자
     export  function isRepeatCharacter(pwdField) {
     
         //패스워드 확인
         var rawPassword = pwdField.value;
         
         //최대 반복 횟수
         var MAX_REPEAT_CNT = 2; 
         
         //반복 Cnt 초기화
         var repeatCnt = 1;	
 
         for(var i=0; i < rawPassword.length ; i++){
             //현재 CharCode , 다음 CharCode 초기화
             var currentCharCode=0,	nextCharCode=0;	
             
                currentCharCode		=	rawPassword.charCodeAt(i);
                nextCharCode		=	rawPassword.charCodeAt(i+1);
                
                //반복 판단
                currentCharCode 	== nextCharCode 	? 	repeatCnt++ : repeatCnt = 1;
                
             if (repeatCnt > MAX_REPEAT_CNT) break;
         }
            
         if (repeatCnt > MAX_REPEAT_CNT){
             pwdField.value ="";
             pwdField.focus();
             return pwdField;
         }
         
         return false;
     }
export function validateRange(form) {
     return validateIntRange(form);
 }
 export function validateMinInteger(form){
    var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oInteger = new minInteger();
     for (x in oInteger) {
         var field = form[oInteger[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'select-one' ||
             field.type == 'radio') {

             var value = '';
             // get field's value
             if (field.type == "select-one") {
                 var si = field.selectedIndex;
                 if (si >= 0) {
                     value = field.options[si].value;
                 }
             } else {
                 value = field.value;
             }

             if (value.length > 0) {

                 if (!isOK(value)) {
                     bValid = false;
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oInteger[x][1];

                 } else {
                     var iValue = parseInt(value);
                     if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)) {
                         if (i == 0) {
                             focusField = field;
                         }
                         fields[i++] = oInteger[x][1];
                         bValid = false;
                    }
                }
            }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return bValid;
 }

 export  function isOK(vv){
     if (vv >0) return true;
     else return false;
}
export function validateInteger(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oInteger = new IntegerValidations();
     for (x in oInteger) {
         var field = form[oInteger[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'select-one' ||
             field.type == 'radio') {

             var value = '';
             // get field's value
             if (field.type == "select-one") {
                 var si = field.selectedIndex;
                 if (si >= 0) {
                     value = field.options[si].value;
                 }
             } else {
                 value = field.value;
             }

             if (value.length > 0) {

                 if (!isAllDigits(value)) {
                     bValid = false;
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oInteger[x][1];

                 } else {
                     var iValue = parseInt(value);
                     if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)) {
                         if (i == 0) {
                             focusField = field;
                         }
                         fields[i++] = oInteger[x][1];
                         bValid = false;
                    }
                }
            }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return bValid;
 }

 export function isAllDigits(argvalue) {
     argvalue = argvalue.toString();
     var validChars = "0123456789";
     var startFrom = 0;
     if (argvalue.substring(0, 2) == "0x") {
        validChars = "0123456789abcdefABCDEF";
        startFrom = 2;
     } else if (argvalue.charAt(0) == "0") {
        validChars = "01234567";
        startFrom = 1;
     } else if (argvalue.charAt(0) == "-") {
         startFrom = 1;
     }

     for (var n = startFrom; n < argvalue.length; n++) {
         if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
     }
     return true;
 }
 export function validateFloat(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oFloat = new FloatValidations();
     for (x in oFloat) {
         var field = form[oFloat[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'select-one' ||
             field.type == 'radio') {

             var value = '';
             // get field's value
             if (field.type == "select-one") {
                 var si = field.selectedIndex;
                 if (si >= 0) {
                     value = field.options[si].value;
                 }
             } else {
                 value = field.value;
             }

             if (value.length > 0) {
                 // remove '.' before checking digits
                 var tempArray = value.split('.');
                 var joinedString= tempArray.join('');

                 if (!isAllDigits(joinedString)) {
                     bValid = false;
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oFloat[x][1];

                 } else {
                     var iValue = parseFloat(value);
                     if (isNaN(iValue)) {
                         if (i == 0) {
                             focusField = field;
                         }
                         fields[i++] = oFloat[x][1];
                         bValid = false;
                     }
                 }
             }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return bValid;
 }
 export function validateRequired(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oRequired = new required();                                
     for (x in oRequired) {
     var field = form[oRequired[x][0]];                 

if ((field.type == 'hidden' ||
    field.type == 'text' ||
    field.type == 'textarea' ||
    field.type == 'file' ||
    field.type == 'radio' ||
    field.type == 'checkbox' ||
    field.type == 'select-one' ||
    field.type == 'password')) { 
    var value = '';
    // get field's value
    if (field.type == "select-one") {
        var si = field.selectedIndex;
        if (si >= 0) {
            value = field.options[si].value;
        }
    } else if (field.type == 'radio' || field.type == 'checkbox') {
        if (field.checked) {
            value = field.value;
        }
    } else {
        value = field.value;
    }
    if (trim(value).length == 0) {
        if ((i == 0) && (field.type != 'hidden')) {
            focusField = field;
        }
        fields[i++] = oRequired[x][1];
        isValid = false;
    }
} else if (field.type == "select-multiple") { 
    var numOptions = field.options.length;
    lastSelected=-1;
    for(loop=numOptions-1;loop>=0;loop--) {
        if(field.options[loop].selected) {
            lastSelected = loop;
            value = field.options[loop].value;
            break;
        }
    }
    if(lastSelected < 0 || trim(value).length == 0) {
        if(i == 0) {
            focusField = field;
        }
        fields[i++] = oRequired[x][1];
        isValid=false;
    }
} else if ((field.length > 0) && (field[0].type == 'radio' || field[0].type == 'checkbox')) {
    isChecked=-1;
    for (loop=0;loop < field.length;loop++) {
        if (field[loop].checked) {
            isChecked=loop;
            break; // only one needs to be checked
        }
    }
    if (isChecked < 0) {
        if (i == 0) {
            focusField = field[0];
        }
        fields[i++] = oRequired[x][1];
        isValid=false;
    }
}
     }
     if (fields.length > 0) {
                try{
                    fields.focus();
                }catch(e){
                 console.log(e);
             }
        alert(fields.join('\n'));
     }
     return isValid;
 }
 
 // Trim whitespace from left and right sides of s.
 export function trim(s) {
     return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
 }
 export function validateIhIdNum(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oIhidnum = new ihidnum();
     for (x in oIhidnum) {
         var field = form[oIhidnum[x][0]];
         if (field.type == 'text' ||
             field.type == 'hidden' ||
             field.type == 'textarea') {
             if (trim(field.value).length==0 || !checkIhIdNum(field.value)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oIhidnum[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
 }

 /**
  * Reference: JS Guide
  * http://jsguide.net/ver2/articles/frame.php?artnum=002
  */
  export function checkIhIdNum(ihidnum){

     fmt = /^\d{13}$/;
     if(!fmt.test(ihidnum)){
         return false;
     }

     switch(ihidnum.charAt(6)*1) {
         case 9,0:
             birthYear = "18";
             break;
         case 1,2,5,6: // 외국인 5,6
             birthYear = "19";
             break;
         case 3,4,7,8: // 외국인 7,8
             birthYear = "20";
             break;
         default:
             birthYear = "19";
     }
     
     birthYear += ihidnum.substr(0, 2);
     birthMonth = ihidnum.substr(2, 2) - 1;
     birthDate = ihidnum.substr(4, 2);
     birth = new Date(birthYear, birthMonth, birthDate);

     if( birth.getYear() % 100 != ihidnum.substr(0, 2) ||
         birth.getMonth() != birthMonth ||
         birth.getDate() != birthDate) {
         return false;
     }

     var arrDivide = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
     var checkdigit = 0;
     for(var i=0;i<ihidnum.length-1;i++){
         checkdigit += parseInt(ihidnum.charAt(i)) * parseInt(arrDivide[i]);
     }
     checkdigit = (11 - (checkdigit%11))%10;
     if(checkdigit != ihidnum.charAt(12)){
         return false;
     }else{
         return true;
     }
 }
 export function validatePassword4(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new password4();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !checkPassword4(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkPassword4(pwd) {
     p_pass = pwd.value;
     var cnt=0,cnt2=1,cnt3=1;
     var temp="";

     for(i=0;i < p_pass.length;i++){
             temp_pass1 = p_pass.charAt(i);
             next_pass = (parseInt(temp_pass1.charCodeAt(0)))+1;
             temp_p = p_pass.charAt(i+1);
             temp_pass2 = (parseInt(temp_p.charCodeAt(0)));
             if (temp_pass2 == next_pass)
                 cnt2 = cnt2 + 1;
             else
                 cnt2 = 1;
             if (temp_pass1 == temp_p)
                 cnt3 = cnt3 + 1;
             else
                 cnt3 = 1;
             if (cnt2 > 3) break;
             if (cnt3 > 3) break;
     }
     if (cnt3 > 3){
             pwd.value ="";
             pwd.focus();
             return false;
     }
     return pwd;
 }
function validatePwdCheckComb4(form) {

     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new pwdCheckComb4();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !isMoreThan3CharTypeComb(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function isMoreThan3CharTypeComb(pwdField) {
 
      var pwd = pwdField.value;
     
     var passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*?])[A-Za-z\d~!@#$%^&*?]+$/;
     
     return passRegex.test(pwd) ? pwdField : false;
 }
 export function validatePassword3(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new password3();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !checkPassword3(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkPassword3(pwd) {
     p_pass = pwd.value;
     var cnt=0,cnt2=1,cnt3=1;
     var temp="";

     for(i=0;i < p_pass.length;i++){
             temp_pass1 = p_pass.charAt(i);
             next_pass = (parseInt(temp_pass1.charCodeAt(0)))+1;
             temp_p = p_pass.charAt(i+1);
             temp_pass2 = (parseInt(temp_p.charCodeAt(0)));
             if (temp_pass2 == next_pass)
                 cnt2 = cnt2 + 1;
             else
                 cnt2 = 1;
             if (temp_pass1 == temp_p)
                 cnt3 = cnt3 + 1;
             else
                 cnt3 = 1;
             if (cnt2 > 3) break;
             if (cnt3 > 3) break;
     }
     if (cnt2 > 3){
             pwd.value ="";
             pwd.focus();
             return false;
     }
     return pwd;
 }
 export function validateEnglish(form){
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oEnglish = new english();
     for (x in oEnglish) {
         var field = form[oEnglish[x][0]];
         if (field.type == 'text' || field.type == 'textarea') {
             if (trim(field.value).length==0 || !checkEnglish(field.value)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oEnglish[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkEnglish(EnglishStr){
       for(var i=0;i<EnglishStr.length;i++){
           var EnglishChar = EnglishStr.charCodeAt(i);
           if( !( 0x61 <= EnglishChar && EnglishChar <= 0x7A ) && !( 0x41 <= EnglishChar && EnglishChar <= 0x5A ) ) {
               return false;
           }
       }
       return true;
}
export function validatePwdCheckSeries(form) {
     
         var bValid = true;
         var focusField = null;
         var i = 0;
         var fields = new Array();
         oPassword = new pwdCheckSeries();
         for (x in oPassword) {
             var field = form[oPassword[x][0]];
             if (field.type == 'password') {
                 if (trim(field.value).length==0 || isSeriesCharacter(field)) {
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oPassword[x][1];
                     bValid = false;
                 }
             }
         }
         if (fields.length > 0) {
             focusField.focus();
             alert(fields.join('\n'));
         }
         return bValid;
     }

     //연속된 숫자,문자
     export function isSeriesCharacter(pwdField) {
     
         //패스워드 확인
         var rawPassword = pwdField.value;
         
         //최대 연속 횟수 설정
         var MAX_SERIES_CNT = 2; 
         
         //감소 Cnt, 증가 Cnt 초기화
         var seriesDecCnt=1	,	seriesIncCnt=1;	
     
         for(var i=0; i < rawPassword.length ; i++){
             //현재 CharCode , 다음 CharCode 초기화
             var currentCharCode=0,	nextCharCode=0;	
             
               currentCharCode		=	rawPassword.charCodeAt(i);
               nextCharCode		=	rawPassword.charCodeAt(i+1);
                   
             //연속 판단
             //감소된 CharCode, 증가된 CharCode	초기화	
             var decreasedCharCode=0,	increasedCharCode=0;	
             
               decreasedCharCode 	=	currentCharCode - 1;
               increasedCharCode 	=	currentCharCode + 1;
               
               decreasedCharCode 	== nextCharCode 	? 	seriesDecCnt++ : seriesDecCnt = 1;
               increasedCharCode 	== nextCharCode 	? 	seriesIncCnt++ : seriesIncCnt = 1;
                   
             if (seriesDecCnt > MAX_SERIES_CNT) break;
             if (seriesIncCnt > MAX_SERIES_CNT) break;
         }
               
         if (seriesDecCnt > MAX_SERIES_CNT || seriesIncCnt > MAX_SERIES_CNT ){
             pwdField.value ="";
             pwdField.focus();
             return pwdField;
         }
            
         return false;
     }
     export function validatePassword2(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new password2();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !checkPassword2(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkPassword2(pwd) {
     var str = pwd.value;
     for (var i=0; i < str .length; i++) {
         ch_char = str .charAt(i);
         ch = ch_char.charCodeAt();
             if( (ch >= 33 && ch <= 47) || (ch >= 58 && ch <= 64) || (ch >= 91 && ch <= 96) || (ch >= 123 && ch <= 126) ) {
                 return false;
             }
     }
     return pwd;
 }
 export function validatePassword1(form) {

     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new password1();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !checkPassword1(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkPassword1(pwd) {
 
     p_pass = pwd.value;

     if (pwd.value.length < 8 || pwd.value.length > 20 ){

             pwd.value ="";
             pwd.focus();
             return false;
     }
     return pwd;
 }
 export function validatePwdCheckComb3(form) {

     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oPassword = new pwdCheckComb3();
     for (x in oPassword) {
         var field = form[oPassword[x][0]];
         if (field.type == 'password') {
             if (trim(field.value).length==0 || !isMoreThan2CharTypeComb(field)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oPassword[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function isMoreThan2CharTypeComb(pwdField) {
 
      var pwd = pwdField.value;
     
     var passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*?])[A-Za-z\d~!@#$%^&*?]+$/;
     
     return passRegex.test(pwd) ? pwdField : false;
 }
 export function validateEmail(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oEmail = new email();
     for (x in oEmail) {
         if ((form[oEmail[x][0]].type == 'text' ||
              form[oEmail[x][0]].type == 'textarea') &&
             (form[oEmail[x][0]].value.length > 0)) {
             if (!checkEmail(form[oEmail[x][0]].value)) {
                 if (i == 0) {
                     focusField = form[oEmail[x][0]];
                 }
                 fields[i++] = oEmail[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
 }

 /**
  * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
  * http://javascript.internet.com
  */
  export function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
           if (IPArray[i] > 255) {
              return false;
           }
        }
        return true;
    }
    var domainArray=domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat=new RegExp(atom,"g");
    var domArr=domain.match(atomPat);
    var len=domArr.length;
    if ((domArr[domArr.length-1].length < 2) ||
        (domArr[domArr.length-1].length > 3)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;
 }
 export function validateMask(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oMasked = new mask();
     for (x in oMasked) {
         var field = form[oMasked[x][0]];

         if ((field.type == 'text' ||
              field.type == 'textarea') &&
              (field.value.length > 0)) {

             if (!matchPattern(field.value, oMasked[x][2]("mask"))) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oMasked[x][1];
                 isValid = false;
             }
         }
     }

     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return isValid;
 }

 export function matchPattern(value, mask) {
    return mask.exec(value);
 }
 export function validateIntRange(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oRange = new intRange();
     for (x in oRange) {
         var field = form[oRange[x][0]];

         if ((field.type == 'text' ||
              field.type == 'textarea') &&
             (field.value.length > 0)) {

             var iMin = parseInt(oRange[x][2]("min"));
             var iMax = parseInt(oRange[x][2]("max"));
             var iValue = parseInt(field.value);
             if (!(iValue >= iMin && iValue <= iMax)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oRange[x][1];
                 isValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return isValid;
 }
 export function validateMaxLength(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oMaxLength = new maxlength();
     for (x in oMaxLength) {
         var field = form[oMaxLength[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea') {

             var iMax = parseInt(oMaxLength[x][2]("maxlength"));
             if (field.value.length > iMax) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oMaxLength[x][1];
                 isValid = false;
             }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return isValid;
 }
 export function validateFloatRange(form) {
     var isValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oRange = new floatRange();
     for (x in oRange) {
         var field = form[oRange[x][0]];

         if ((field.type == 'text' ||
              field.type == 'textarea') &&
             (field.value.length > 0)) {

             var fMin = parseFloat(oRange[x][2]("min"));
             var fMax = parseFloat(oRange[x][2]("max"));
             var fValue = parseFloat(field.value);
             if (!(fValue >= fMin && fValue <= fMax)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oRange[x][1];
                 isValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return isValid;
 }
 export function validateByte(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oByte = new ByteValidations();
     for (x in oByte) {
         var field = form[oByte[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'select-one' ||
             field.type == 'radio') {

             var value = '';
             // get field's value
             if (field.type == "select-one") {
                 var si = field.selectedIndex;
                 if (si >= 0) {
                     value = field.options[si].value;
                 }
             } else {
                 value = field.value;
             }

             if (value.length > 0) {
                 if (!isAllDigits(value)) {
                     bValid = false;
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oByte[x][1];

                 } else {

                     var iValue = parseInt(value);
                     if (isNaN(iValue) || !(iValue >= -128 && iValue <= 127)) {
                         if (i == 0) {
                             focusField = field;
                         }
                         fields[i++] = oByte[x][1];
                         bValid = false;
                     }
                 }
             }

         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return bValid;
 }
 export function validateKorean(form){
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oKorean = new korean();
     for (x in oKorean) {
         var field = form[oKorean[x][0]];
         if (field.type == 'text' || field.type == 'textarea') {
             if (trim(field.value).length==0 || !checkKorean(field.value)) {
                 if (i == 0) {
                     focusField = field;
                 }
                 fields[i++] = oKorean[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
}

export function checkKorean(koreanStr){
       for(var i=0;i<koreanStr.length;i++){
           var koreanChar = koreanStr.charCodeAt(i);
           if( !( 0xAC00 <= koreanChar && koreanChar <= 0xD7A3 ) && !( 0x3131 <= koreanChar && koreanChar <= 0x318E ) ) {
               return false;
           }
       }
       return true;
}
export function validateShort(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oShort = new ShortValidations();
     for (x in oShort) {
         var field = form[oShort[x][0]];

         if (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'select-one' ||
             field.type == 'radio') {

             var value = '';
             // get field's value
             if (field.type == "select-one") {
                 var si = field.selectedIndex;
                 if (si >= 0) {
                     value = field.options[si].value;
                 }
             } else {
                 value = field.value;
             }

             if (value.length > 0) {
                 if (!isAllDigits(value)) {
                     bValid = false;
                     if (i == 0) {
                         focusField = field;
                     }
                     fields[i++] = oShort[x][1];

                 } else {

                     var iValue = parseInt(value);
                     if (isNaN(iValue) || !(iValue >= -32768 && iValue <= 32767)) {
                         if (i == 0) {
                             focusField = field;
                         }
                         fields[i++] = oShort[x][1];
                         bValid = false;
                     }
                }
            }
         }
     }
     if (fields.length > 0) {
        focusField.focus();
        alert(fields.join('\n'));
     }
     return bValid;
 }
 export function validateCreditCard(form) {
     var bValid = true;
     var focusField = null;
     var i = 0;
     var fields = new Array();
     oCreditCard = new creditCard();
     for (x in oCreditCard) {
         if ((form[oCreditCard[x][0]].type == 'text' ||
              form[oCreditCard[x][0]].type == 'textarea') &&
             (form[oCreditCard[x][0]].value.length > 0)) {
             if (!luhnCheck(form[oCreditCard[x][0]].value)) {
                 if (i == 0) {
                     focusField = form[oCreditCard[x][0]];
                 }
                 fields[i++] = oCreditCard[x][1];
                 bValid = false;
             }
         }
     }
     if (fields.length > 0) {
         focusField.focus();
         alert(fields.join('\n'));
     }
     return bValid;
 }

 /**
  * Reference: http://www.ling.nwu.edu/~sburke/pub/luhn_lib.pl
  */
  export function luhnCheck(cardNumber) {
     if (isLuhnNum(cardNumber)) {
         var no_digit = cardNumber.length;
         var oddoeven = no_digit & 1;
         var sum = 0;
         for (var count = 0; count < no_digit; count++) {
             var digit = parseInt(cardNumber.charAt(count));
             if (!((count & 1) ^ oddoeven)) {
                 digit *= 2;
                 if (digit > 9) digit -= 9;
             };
             sum += digit;
         };
         if (sum == 0) return false;
         if (sum % 10 == 0) return true;
     };
     return false;
 }

 export function isLuhnNum(argvalue) {
     argvalue = argvalue.toString();
     if (argvalue.length == 0) {
         return false;
     }
     for (var n = 0; n < argvalue.length; n++) {
         if ((argvalue.substring(n, n+1) < "0") ||
             (argvalue.substring(n,n+1) > "9")) {
             return false;
         }
     }
     return true;
 }