import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCode,
  cilMenu,
  cilPeople,
  cilDataTransferUp,
  cilSitemap,
  cilHistory
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  
  {
    component: CNavTitle,
    name: '시스템관리',
  },
  {
    component: CNavGroup,
    name: '코드관리',
    to: '/system_manager/',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '공통코드기존버전',
        to: '/system_manager/code_manager/CodeManagercopy',
      },
      {
        component: CNavItem,
        name: '공통코드수정버전',
        to: '/system_manager/code_manager/CodeManager',
      },
      {
        component: CNavItem,
        name: '공통상세코드',
        to: '/system_manager/code_manager/DetailCodeManager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '메뉴관리',
    to: '/system_manager/menu_manager/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '프로그램관리',
        to: '/system_manager/menu_manager/EgovProgramListManageSelect',
      },
      {
        component: CNavItem,
        name: '메뉴관리',
        to: '/system_manager/menu_manager/MenuManager',
      },
      {
        component: CNavItem,
        name: '권한별 메뉴 관리',
        to: '/system_manager/menu_manager/EgovMenuCreatManageSelect',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '권한 관리',
    to: '/system_manager/member_manager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '권한 관리',
        to: '/system_manager/author_manager/EgovAuthorManage',
      },
      {
        component: CNavItem,
        name: '사용자별 권한 관리',
        to: '/system_manager/author_manager/EgovUserAuthorManage',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '회원관리',
    to: '/system_manager/member_manager',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '업무사용자관리',
        to: '/system_manager/member_manager/UserManager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '배치관리',
    to: '/system_manager/batch_manager',
    icon: <CIcon icon={cilDataTransferUp} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '배치작업관리',
        to: '/system_manager/batch_manager/EgovBatchOpertList',
      },
      {
        component: CNavItem,
        name: '배치결과관리',
        to: '/system_manager/batch_manager/EgovBatchResultList',
      },
      {
        component: CNavItem,
        name: '배치스케줄관리',
        to: '/system_manager/batch_manager/EgovBatchSchdulList',
      },
    ],
  },
 //배너관리
 {
  component: CNavGroup,
  name: '배너관리',
  to: '/system_manager/banner_manager',
  icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  items:[
      {
          component: CNavItem,
          name: '배너관리',
          to: '/system_manager/banner_manager/EgovBannerList'
      },
    ],
  },
  {
    component: CNavGroup,
    name: '로그관리',
    to: '/system_manager/log_manager',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '로그관리',
        to: '/system_manager/log_manager/EgovSysLogList',
      },
      {
        component: CNavItem,
        name: '사용자로그관리',
        to: '/system_manager/log_manager/EgovUserLogList',
      },
      {
        component: CNavItem,
        name: '웹로그관리',
        to: '/system_manager/log_manager/EgovWebLogList',
      },
      {
        component: CNavItem,
        name: '접속로그 관리',
        to: '/system_manager/log_manager/EgovLoginLogList',
      },
      {
        component: CNavItem,
        name: '개인정보조회관리',
        to: '/system_manager/log_manager/EgovPrivacyLogList',
      },
    ],
  },
  {
    component: CNavGroup,
    name: '팝업관리',
    to: '/system_manager/popup_manager',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '팝업관리',
        to: '/system_manager/popup_manager/EgovPopupList',
      },
    ],
  },
  {
    component: CNavTitle,
    name: '커뮤니티관리',
  },
  {
    component: CNavItem,
    name: '공지사항',
    to: '/community_manager/notice_manager/EgovNoticeList',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'FAQ',
    to: '/system_manager/community_manager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'FAQ 목록',
        to: '/system_manager/community_manager/EgovFaqManager',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Q&A',
    to: '/system_manager/community_manager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Q&A 목록',
        to: '/system_manager/community_manager/EgovQnaManager',
      },
      {
        component: CNavItem,
        name: 'Q&A 답변 목록',
        to: '/system_manager/community_manager/EgovQnaAnswerManager',
      },
    ],
  },
  {
    component: CNavItem,
    name: '자료실',
    to: '/community_manager/data_manager/EgovDataList',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: '서비스개선요청',
    to: '/community_manager/serviceImprovement_manager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '서비스개선요청 ',
        to: '/community_manager/serviceImprovement_manager/EgovImproveRequestManager',
      },
    ]
  },
  {
    component: CNavTitle,
    name: '서비스관리',
  },
  {
    component: CNavItem,
    name: '기관정보관리',
    to: '/service_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '서비스신청관리',
    to: '/service_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'API정보관리',
    to: '/service_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '연계정보관리',
    to: '/service_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '이용약관관리',
    to: '/service_manager/terms_manager/SvcTermsmanageList',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '현황 및 통계',
  },
  {
    component: CNavItem,
    name: '서비스이용현황',
    to: '/system_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '서비스이용통계',
    to: '/system_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '송수신현황',
    to: '/system_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '장애내역',
    to: '/system_manager/member_manager/UserManager',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
