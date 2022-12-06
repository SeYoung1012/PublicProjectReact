const CODE = {
    RCV_SUCCESS             : "200", // 성공
    
    RCV_ERROR_AUTH          : "403", // 인증 오류
    RCV_ERROR_DELETE        : "700", // 삭제 오류
    RCV_ERROR_SAVE          : "800", // 저장 오류
    RCV_ERROR_VALIDATION    : "900", // 입력 오류

    MODE_CREATE         : "create", // 등록 모드
    MODE_MODIFY         : "modify", // 수정 모드 
    MODE_READ           : "read",   // 읽기 모드
    MODE_REPLY          : "reply",  // 답글 모드

    DATE_YEAR           : "year",
    DATE_MONTH          : "month",
    DATE_DATE           : "date",
    DATE_WEEK           : "week",
    DATE_DAY            : "day",

    CONFIRM_DELETE : "정말 삭제하시겠습니까?",
    CONFIRM_CANCEL_UPDT : "변경 사항이 저장되지 않습니다. 계속하시겠습니까?",
    CONFIRM_CANCEL_RGST : "현재까지 입력한 항목들이 전부 삭제됩니다. 계속하시겠습니까?",

    ALERT_UPDT : "변경사항이 저장되었습니다.",
    ALERT_RGST : "등록되었습니다.",
    
    ALERT_INPUT : "을(를) 입력해주세요.",
}

export default CODE;