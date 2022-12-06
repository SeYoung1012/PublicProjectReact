import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//좌측메뉴 컴포넌트

//시스템관리
//시스템관리-코드관리
const CodeManager = React.lazy(() => import('./views/system_manager/code_manager/CodeManager'))
const CodeManagercopy = React.lazy(() => import('./views/system_manager/code_manager/CodeManagercopy'))
const EgovCcmCmmnCodeRegist = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnCodeRegist'))
const EgovCcmCmmnCodeDetail = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnCodeDetail'))
const EgovCcmCmmnCodeUpdt = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnCodeUpdt'))

const DetailCodeManager = React.lazy(() => import('./views/system_manager/code_manager/DetailCodeManager'))
const EgovCcmCmmnDetailCodeRegist = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnDetailCodeRegist'))
const EgovCcmCmmnDetailCodeDetail = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnDetailCodeDetail'))
const EgovCcmCmmnDetailCodeUpdt = React.lazy(() => import('./views/system_manager/code_manager/EgovCcmCmmnDetailCodeUpdt'))

//시스템관리-메뉴관리
const EgovProgramListManageSelect = React.lazy(() => import('./views/system_manager/menu_manager/EgovProgramListManageSelect'))
const EgovProgramListDetailSelect = React.lazy(() => import('./views/system_manager/menu_manager/EgovProgramListDetailSelect'))
const EgovProgramListDetailSelectUpdt = React.lazy(() => import('./views/system_manager/menu_manager/EgovProgramListDetailSelectUpdt'))
const EgovProgramListRegist = React.lazy(() => import('./views/system_manager/menu_manager/EgovProgramListRegist'))

const MenuManager = React.lazy(() => import('./views/system_manager/menu_manager/MenuManager'))
const EgovMenuRegist = React.lazy(() => import('./views/system_manager/menu_manager/EgovMenuRegist'))
const EgovMenuDetail = React.lazy(() => import('./views/system_manager/menu_manager/EgovMenuDetail'))

const EgovMenuCreatManageSelect = React.lazy(() => import('./views/system_manager/menu_manager/EgovMenuCreatManageSelect'))
const EgovMenuCreatInsert = React.lazy(() => import('./views/system_manager/menu_manager/EgovMenuCreatInsert'))

//시스템관리-권한관리
const EgovAuthorManage = React.lazy(() => import('./views/system_manager/author_manager/EgovAuthorManage'))
const EgovAuthorInsert = React.lazy(() => import('./views/system_manager/author_manager/EgovAuthorInsert'))
const EgovAuthorUpdate = React.lazy(() => import('./views/system_manager/author_manager/EgovAuthorUpdate'))
const EgovAuthorDetail = React.lazy(() => import('./views/system_manager/author_manager/EgovAuthorDetail'))

const EgovUserAuthorManage = React.lazy(() => import('./views/system_manager/author_manager/EgovUserAuthorManage'))

//시스템관리-회원관리
const UserManager = React.lazy(() => import('./views/system_manager/member_manager/UserManager'))
const UserInsert = React.lazy(() => import('./views/system_manager/member_manager/UserInsert'))
const UserUpdate = React.lazy(() => import('./views/system_manager/member_manager/UserUpdate'))

//시스템관리-배치관리
const EgovBatchOpertList = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchOpertList'))
const EgovBatchOpertRegist = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchOpertRegist'))
const EgovBatchOpertDetail = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchOpertDetail'))
const EgovBatchOpertUpdt = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchOpertUpdt'))

const EgovBatchResultList = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchResultList'))
const EgovBatchResultDetail = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchResultDetail'))

const EgovBatchSchdulList = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchSchdulList'))
const EgovBatchSchdulRegist = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchSchdulRegist'))
const EgovBatchSchdulDetail = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchSchdulDetail'))
const EgovBatchSchdulUpdt = React.lazy(() => import('./views/system_manager/batch_manager/EgovBatchSchdulUpdt'))

// 시스템 관리 - 로그관리
const EgovSysLogList = React.lazy(() => import('./views/system_manager/log_manager/EgovSysLogList'))
const EgovSysLogDetail = React.lazy(() => import('./views/system_manager/log_manager/EgovSysLogDetail'))

//시스템 관리 - 사용자로그관리
const EgovUserLogList = React.lazy(() => import('./views/system_manager/log_manager/EgovUserLogList'))
const EgovUserLogDetail = React.lazy(() => import('./views/system_manager/log_manager/EgovUserLogDetail'))

//시스템 관리 - 웹로그 관리
const EgovWebLogList = React.lazy(() => import('./views/system_manager/log_manager/EgovWebLogList'))
const EgovWebLogDetail = React.lazy(() => import ('./views/system_manager/log_manager/EgovWebLogDetail'))

//시스템 관리 - 접속로그 관리
const EgovLoginLogList = React.lazy(() => import ('./views/system_manager/log_manager/EgovLoginLogList'))
const EgovLoginLogDetail = React.lazy(() => import ('./views/system_manager/log_manager/EgovLoginLogDetail'))


//시스템 관리 - 개인정보 조회 로그 관리
const EgovPrivacyLogList = React.lazy(() => import('./views/system_manager/log_manager/EgovPrivacyLogList'))
const EgovPrivacyLogDetail = React.lazy(() => import('./views/system_manager/log_manager/EgovPrivacyLogDetail'))


//시스템관리-배너관리
const EgovBannerList = React.lazy(() => import('./views/system_manager/banner_manager/EgovBannerList'))
const EgovBannerInsert = React.lazy(() => import('./views/system_manager/banner_manager/EgovBannerInsert'))
const EgovBannerDetail = React.lazy(() => import('./views/system_manager/banner_manager/EgovBannerDetail'))
const EgovBannerUpdate = React.lazy(()=>import('./views/system_manager/banner_manager/EgovBannerUpdate'))

// 시스템 관리 - 팝업관리
const EgovPopupList = React.lazy(() => import('./views/system_manager/popup_manager/EgovPopupList'))
const EgovPopupRegist = React.lazy(() => import('./views/system_manager/popup_manager/EgovPopupRegist'))
const EgovPopupDetail = React.lazy(() => import('./views/system_manager/popup_manager/EgovPopupDetail'))
const EgovPopupUpdt = React.lazy(() => import('./views/system_manager/popup_manager/EgovPopupUpdt'))


//커뮤니티관리
//커뮤니티관리-FAQ
const EgovFaqManager = React.lazy(() => import('./views/community_manager/faq_manager/EgovFaqManager'))
const EgovFaqManagerDetail = React.lazy(()=> import('./views/community_manager/faq_manager/EgovFaqManagerDetail'))
const EgovFaqManagerRegist = React.lazy(() => import('./views/community_manager/faq_manager/EgovFaqManagerRegist'))
const EgovFaqManagerUpdt = React.lazy(() => import('./views/community_manager/faq_manager/EgovFaqManagerUpdt'))

//커뮤니티관리-Q&A
const EgovQnaManager = React.lazy(() => import('./views/community_manager/qna_manager/EgovQnaManager'))
const EgovQnaManagerDetail = React.lazy(() => import('./views/community_manager/qna_manager/EgovQnaManagerDetail'))
const EgovQnaManagerRegist = React.lazy(() => import('./views/community_manager/qna_manager/EgovQnaManagerRegist'))
const EgovQnaManagerUpdt = React.lazy(()=> import('./views/community_manager/qna_manager/EgovQnaManagerUpdt'))


//커뮤니티관리-Q&A 답변
const EgovQnaAnswerManager = React.lazy(() => import('./views/community_manager/qna_manager/EgovQnaAnswerManager'))
const EgovQnaAnswerManagerDetail = React.lazy(() => import('./views/community_manager/qna_manager/EgovQnaAnswerManagerDetail'))
const EgovQnaAnswerManagerUpdt = React.lazy(() => import ('./views/community_manager/qna_manager/EgovQnaAnswerManagerUpdt'))

//커뮤니티관리-자료실
const EgovDataList = React.lazy(() => import('./views/community_manager/data_manager/EgovDataList'))
const EgovDataInsert = React.lazy(() => import('./views/community_manager/data_manager/EgovDataInsert'))
const EgovDataDetail = React.lazy(() => import('./views/community_manager/data_manager/EgovDataDetail'))
const EgovDataUpdate = React.lazy(() => import('./views/community_manager/data_manager/EgovDataUpdate'))

//커뮤니티관리-공지사항
const EgovNoticeList = React.lazy(() => import('./views/community_manager/notice_manager/EgovNoticeList'))
const EgovNoticeInsert = React.lazy(() => import('./views/community_manager/notice_manager/EgovNoticeInsert'))
const EgovNoticeDetail = React.lazy(() => import('./views/community_manager/notice_manager/EgovNoticeDetail'))
const EgovNoticeUpdate = React.lazy(() => import('./views/community_manager/notice_manager/EgovNoticeUpdate'))

//커뮤니티관리-서비스개선 요청
const EgovImproveRequestManager = React.lazy(() => import('./views/community_manager/serviceImprovement_manager/EgovImproveRequestManager'))
const EgovImproveRequestManagerDetail = React.lazy(()=> import ('./views/community_manager/serviceImprovement_manager/EgovImproveRequestManagerDetail'))
const EgovImproveRequestManagerRegist = React.lazy(() => import('./views/community_manager/serviceImprovement_manager/EgovImproveRequestManagerRegist'))
const EgovImproveRequestManagerUpdt = React.lazy(() => import('./views/community_manager/serviceImprovement_manager/EgovImproveRequestManagerUpdt'))





//서비스관리
//서비스관리 - 기관관리

//서비스관리 - 서비스신청관리

//서비스관리 - API관리

//서비스관리 - 연계관리

//서비스관리 - 약관관리
const SvcTermsManageList = React.lazy(() => import('./views/service_manager/terms_manager/SvcTermsManageList'))
const SvcTermsManageDetail = React.lazy(() => import('./views/service_manager/terms_manager/SvcTermsManageDetail'))
const SvcTermsManageUpdate = React.lazy(() => import('./views/service_manager/terms_manager/SvcTermsManageUpdate'))
const SvcTermsManageRegist = React.lazy(() => import('./views/service_manager/terms_manager/SvcTermsManageRegist'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  
  //시스템관리
  //시스템관리-공통코드관리
  { path: '/system_manager/code_manager/CodeManager', name: 'CodeManager', element: CodeManager },
  { path: '/system_manager/code_manager/CodeManagercopy', name: 'CodeManagercopy', element: CodeManagercopy },
  { path: '/system_manager/code_manager/EgovCcmCmmnCodeRegist', name: 'EgovCcmCmmnCodeRegist', element: EgovCcmCmmnCodeRegist },
  { path: '/system_manager/code_manager/EgovCcmCmmnCodeDetail', name: 'EgovCcmCmmnCodeDetaul', element: EgovCcmCmmnCodeDetail },
  { path: '/system_manager/code_manager/EgovCcmCmmnCodeUpdt', name: 'EgovCcmCmmnCodeUpdt', element: EgovCcmCmmnCodeUpdt },
  
  { path: '/system_manager/code_manager/DetailCodeManager', name: 'DetailCodeManager', element: DetailCodeManager },
  { path: '/system_manager/code_manager/EgovCcmCmmnDetailCodeRegist', name: 'EgovCcmCmmnDetailCodeRegist', element: EgovCcmCmmnDetailCodeRegist },
  { path: '/system_manager/code_manager/EgovCcmCmmnDetailCodeDetail', name: 'EgovCcmCmmnDetailCodeDetail', element: EgovCcmCmmnDetailCodeDetail },
  { path: '/system_manager/code_manager/EgovCcmCmmnDetailCodeUpdt', name: 'EgovCcmCmmnDetailCodeUpdt', element: EgovCcmCmmnDetailCodeUpdt },

  //시스템관리-메뉴관리
  { path: '/system_manager/menu_manager/EgovProgramListManageSelect', name: 'EgovProgramListManageSelect', element: EgovProgramListManageSelect },
  { path: '/system_manager/menu_manager/EgovProgramListDetailSelect', name: 'EgovProgramListDetailSelect', element: EgovProgramListDetailSelect },
  { path: '/system_manager/menu_manager/EgovProgramListDetailSelectUpdt', name: 'EgovProgramListDetailSelectUpdt', element: EgovProgramListDetailSelectUpdt },
  { path: '/system_manager/menu_manager/EgovProgramListRegist', name: 'EgovProgramListRegist', element: EgovProgramListRegist },

  { path: '/system_manager/menu_manager/MenuManager', name: 'MenuManager', element: MenuManager },
  { path: '/system_manager/menu_manager/EgovMenuRegist', name: 'EgovMenuRegist', element: EgovMenuRegist },
  { path: '/system_manager/menu_manager/EgovMenuDetail', name: 'EgovMenuDetail', element: EgovMenuDetail },

  { path: '/system_manager/menu_manager/EgovMenuCreatManageSelect', name: 'EgovMenuCreatManageSelect', element: EgovMenuCreatManageSelect },
  { path: '/system_manager/menu_manager/EgovMenuCreatInsert', name: 'EgovMenuCreatInsert', element: EgovMenuCreatInsert },
  
  //시스템관리-권한관리
  { path: '/system_manager/author_manager/EgovAuthorManage', name: 'EgovAuthorManage', element: EgovAuthorManage },
  { path: '/system_manager/author_manager/EgovAuthorInsert', name: 'EgovAuthorInsert', element: EgovAuthorInsert },
  { path: '/system_manager/author_manager/EgovAuthorUpdate', name: 'EgovAuthorUpdate', element: EgovAuthorUpdate },
  { path: '/system_manager/author_manager/EgovAuthorDetail', name: 'EgovAuthorUpdate', element: EgovAuthorDetail },

  { path: '/system_manager/author_manager/EgovUserAuthorManage', name: 'EgovUserAuthorManage', element: EgovUserAuthorManage },

  //시스템관리-업무사용자관리
  { path: '/system_manager/member_manager/UserManager', name: 'UserManager', element: UserManager },
  { path: '/system_manager/member_manager/UserInsert', name: 'UserInsert', element: UserInsert },
  { path: '/system_manager/member_manager/UserUpdate', name: 'UserUpdate', element: UserUpdate },

  //시스템관리-배치관리
  { path: '/system_manager/batch_manager/EgovBatchOpertList', name: 'EgovBatchOpertList', element: EgovBatchOpertList },
  { path: '/system_manager/batch_manager/EgovBatchOpertRegist', name: 'EgovBatchOpertRegist', element: EgovBatchOpertRegist },
  { path: '/system_manager/batch_manager/EgovBatchOpertDetail', name: 'EgovBatchOpertDetail', element: EgovBatchOpertDetail },
  { path: '/system_manager/batch_manager/EgovBatchOpertUpdt', name: 'EgovBatchOpertUpdt', element: EgovBatchOpertUpdt },
  
  { path: '/system_manager/batch_manager/EgovBatchResultList', name: 'EgovBatchResultList', element: EgovBatchResultList },
  { path: '/system_manager/batch_manager/EgovBatchResultDetail', name: 'EgovBatchResultDetail', element: EgovBatchResultDetail },

  { path: '/system_manager/batch_manager/EgovBatchSchdulList', name: 'EgovBatchSchdulList', element: EgovBatchSchdulList },
  { path: '/system_manager/batch_manager/EgovBatchSchdulRegist', name: 'EgovBatchSchdulRegist', element: EgovBatchSchdulRegist },
  { path: '/system_manager/batch_manager/EgovBatchSchdulDetail', name: 'EgovBatchSchdulDetail', element: EgovBatchSchdulDetail },
  { path: '/system_manager/batch_manager/EgovBatchSchdulUpdt', name: 'EgovBatchSchdulUpdt', element: EgovBatchSchdulUpdt },

  // 시스템관리 - 로그관리
  { path: '/system_manager/log_manager/EgovSysLogList', name : 'EgovSysLogList', element: EgovSysLogList },
  { path: '/system_manager/log_manager/EgovSysLogDetail', name : 'EgovSysLogDetail', element: EgovSysLogDetail },

  // 시스템관리 - 사용자로그관리
  { path: '/system_manager/log_manager/EgovUserLogList', name: 'EgovUserLogList', element: EgovUserLogList},
  { path: '/system_manager/log_manager/EgovUserLogDetail', name: 'EgovUserLogDetail', element: EgovUserLogDetail},

  // 시스템관리 - 웹로그관리
  { path: '/system_manager/log_manager/EgovWebLogList', name: 'EgovWebLogList', element: EgovWebLogList},
  { path: '/system_manager/log_manager/EgovWebLogDetail', name:'EgovWebLogDetail', element: EgovWebLogDetail },

  // 시스템관리 - 접속로그 관리
  { path: '/system_manager/log_manager/EgovLoginLogList', name:'EgovLoginLogList', element: EgovLoginLogList},
  { path: '/system_manager/log_manager/EgovLoginLogDetail', name: 'EgovLoginLogDetail', element:EgovLoginLogDetail},


  //시스템관리 - 개인정보 조회 로그 관리
  { path: '/system_manager/log_manager/EgovPrivacyLogList', name: 'EgovPrivacyLogList', element:EgovPrivacyLogList},
  { path: '/system_manager/log_manager/EgovPrivacyLogDetail', name:'EgovPrivacyLogDetail', element:EgovPrivacyLogDetail},

  //시스템관리-배너관리
  { path: '/system_manager/banner_manager/EgovBannerList', name: 'EgovBannerList', element: EgovBannerList },
  { path: '/system_manager/banner_manager/EgovBannerInsert', name: 'EgovBannerInsert', element: EgovBannerInsert },
  { path: '/system_manager/banner_manager/EgovBannerDetail', name: 'EgovBannerDetail', element: EgovBannerDetail },
  { path: '/system_manager/banner_manager/EgovBannerUpdate', name: 'EgovBannerUpdate', element: EgovBannerUpdate },

  // 시스템관리 - 팝업관리
  { path: '/system_manager/popup_manager/EgovPopupList', name: 'EgovPopupList', element: EgovPopupList },
  { path: '/system_manager/popup_manager/EgovPopupRegist', name: 'EgovPopupRegist', element: EgovPopupRegist },
  { path: '/system_manager/popup_manager/EgovPopupDetail', name: 'EgovPopupDetail', element: EgovPopupDetail },
  { path: '/system_manager/popup_manager/EgovPopupUpdt', name: 'EgovPopupUpdt', element: EgovPopupUpdt },
  

  //커뮤니티관리
  //커뮤니티관리 -FAQ
  { path: '/system_manager/community_manager/EgovFaqManager', name: 'EgovFaqManager', element: EgovFaqManager},
  { path: '/system_manager/community_manager/EgovFaqManagerDetail', name: 'EgovFaqManagerDetail', element: EgovFaqManagerDetail},
  { path: '/system_manager/community_manager/EgovFaqManagerRegist', name: 'EgovFaqManagerRegist', element: EgovFaqManagerRegist},
  { path: '/system_manager/community_manager/EgovFaqManagerUpdt', name: 'EgovFaqManagerUpdt', element: EgovFaqManagerUpdt},

  //커뮤니티관리 -Qna
  { path: '/system_manager/community_manager/EgovQnaManager', name:'EgovQnaManager', element:EgovQnaManager },
  { path: '/system_manager/community_manager/EgovQnaManagerDetail', name:'EgovQnaManagerDetail', element:EgovQnaManagerDetail},
  { path: '/system_manager/community_manager/EgovQnaManagerRegist', name: 'EgovQnaManagerRegist', element:EgovQnaManagerRegist },
  { path:'/system_manager/community_manager/EgovQnaManagerUpdt', name: 'EgovQnaManagerUpdt', element: EgovQnaManagerUpdt},

  //커뮤니티관리 -QnaAnswer
  { path: '/system_manager/community_manager/EgovQnaAnswerManager', name:'EgovQnaAnswerManager', element:EgovQnaAnswerManager },
  { path: '/system_manager/community_manager/EgovQnaAnswerManagerDetail', name:'EgovQnaAnswerManagerDetail', element:EgovQnaAnswerManagerDetail},
  { path: '/system_manager/community_manager/EgovQnaAnswerManagerUpdt', name:'EgovQnaAnswerManagerUpdt', element:EgovQnaAnswerManagerUpdt},


  //커뮤니티관리-자료실
  { path: '/community_manager/data_manager/EgovDataList', name: 'EgovDataList', element: EgovDataList },
  { path: '/community_manager/data_manager/EgovDataInsert', name: 'EgovDataInsert', element: EgovDataInsert },
  { path: '/community_manager/data_manager/EgovDataDetail', name: 'EgovDataDetail', element: EgovDataDetail },
  { path: '/community_manager/data_manager/EgovDataUpdate', name: 'EgovDataUpdate', element: EgovDataUpdate },

  //커뮤니티관리-공지사항
  { path: '/community_manager/notice_manager/EgovNoticeList', name: 'EgovNoticeList', element: EgovNoticeList },
  { path: '/community_manager/notice_manager/EgovNoticeInsert', name: 'EgovNoticeInsert', element: EgovNoticeInsert },
  { path: '/community_manager/notice_manager/EgovNoticeUpdate', name: 'EgovNoticeUpdate', element: EgovNoticeUpdate },
  { path: '/community_manager/notice_manager/EgovNoticeDetail', name: 'EgovNoticeDetail', element: EgovNoticeDetail },

  //커뮤니티관리 - 서비스 개선 요청
  { path: '/community_manager/serviceImprovement_manager/EgovImproveRequestManager', name:'EgovImproveRequestManager', element:EgovImproveRequestManager},
  { path: '/community_manager/serviceImprovement_manager/EgovImproveRequestManagerDetail', name:'EgovImproveRequestManagerDetail', element:EgovImproveRequestManagerDetail},
  { path: '/community_manager/serviceImprovement_manager/EgovImproveRequestManagerRegist', name:'EgovImproveRequestManagerRegist', element:EgovImproveRequestManagerRegist},
  { path: '/community_manager/serviceImprovement_manager/EgovImproveRequestManagerUpdt', name:'EgovImproveRequestManagerUpdt', element:EgovImproveRequestManagerUpdt},


  //서비스관리
  //서비스관리 - 기관관리

  //서비스관리 - 서비스신청관리

  //서비스관리 - API관리

  //서비스관리 - 연계관리

  //서비스관리 - 약관관리
  { path: '/service_manager/terms_manager/SvcTermsManageList', name: 'SvcTermsManageList', element: SvcTermsManageList },
  { path: '/service_manager/terms_manager/SvcTermsManageDetail', name: 'SvcTermsManageDetail', element: SvcTermsManageDetail },
  { path: '/service_manager/terms_manager/SvcTermsManageUpdate', name: 'SvcTermsManageUpdate', element: SvcTermsManageUpdate },
  { path: '/service_manager/terms_manager/SvcTermsManageRegist', name: 'SvcTermsManageRegist', element: SvcTermsManageRegist },
  


]
export default routes
