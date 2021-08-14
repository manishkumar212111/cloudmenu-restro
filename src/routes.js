import React from 'react';
import FAQ from './views/pages/Faq';
import ForgotPassword from './views/pages/ForgotPassword';
import Login from './views/pages/login/Login';
import Page404 from './views/pages/page404/Page404';
import Page500 from './views/pages/page500/Page500';
import Plan from './views/pages/Plan';
import Register from './views/pages/register/Register';
import ResetPassword from './views/pages/ResetPassword';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Plans = React.lazy(() => import("./views/plan/planList"));
const PlanForm = React.lazy(() => import("./views/plan/planForm"));
const Transaction = React.lazy(() => import("./views/transactions/transaction"));
const Enquiry = React.lazy(() => import("./views/enquiry/enquiry"));
const Cmss = React.lazy(() => import("./views/cmss/cmsList"));
const CmsForm = React.lazy(() => import("./views/cmss/cmsForm"));
const EmailTemplate = React.lazy(() => import("./views/emailTemplate/emailTemplate"));
const HomePage = React.lazy(() => import('./views/pages/home/index'));

const routes = [
  { path: '/', exact: true, name: 'Home', component : HomePage },
  { path: '/register', exact: true, name: "Register Page", component : Register},
  { path: '/login', exact: true, name: "Login Page", component : Login},
  { path: '/forget-password', exact: true, name: "Forget Password", component : ForgotPassword},
  { path: '/reset-password/:token', exact: true, name: "Reset Password", component : ResetPassword},
  { path: '/pricing', exact: true, name: "Pricing Page", component : Plan},
  { path: '/faqs', exact: true, name: "FAQs", component : FAQ},
  
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/plan', exact: true,  name: 'Plans', component: Plans },
  { path: '/plan/add', exact: true,  name: 'Add Plans', component: PlanForm },
  { path: '/plan/:id', exact: true, name: 'Plan Details', component: PlanForm },
  { path: '/transactions', exact: true,  name: 'Transaction', component: Transaction },
  { path: '/enquiry', exact: true,  name: 'Enquiry', component: Enquiry },

  { path: '/cms', exact: true,  name: 'Plans', component: Cmss },
  { path: '/cms/add', exact: true,  name: 'Add Plans', component: CmsForm },
  { path: '/cms/:id', exact: true, name: 'Plan Details', component: CmsForm },
  { path: "/email-template",  exact: true, name: 'Email Template', component: EmailTemplate},
  { path: "/404",  name: 'Page 404', component: Page404},
  { path: "/500",  name: 'Page 500', component: Page500}
];

export default routes;
