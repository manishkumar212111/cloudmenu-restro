import React from 'react';
import Category from './views/pages/category';
import CategoryForm from './views/pages/category/categoryForm';
import FAQ from './views/pages/Faq';
import ForgotPassword from './views/pages/ForgotPassword';
import Login from './views/pages/login/Login';
import Page404 from './views/pages/page404/Page404';
import Page500 from './views/pages/page500/Page500';
import Plan from './views/pages/Plan';
import profile from './views/pages/profile';
import newProfile from './views/pages/profile/indexNew';
import Register from './views/pages/register/Register';
import ResetPassword from './views/pages/ResetPassword';
import QR from './views/pages/QR';
import menu from './views/pages/menu';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Plans = React.lazy(() => import("./views/plan/planList"));
const PlanForm = React.lazy(() => import("./views/plan/planForm"));
const Transaction = React.lazy(() => import("./views/transactions/transaction"));
const Enquiry = React.lazy(() => import("./views/enquiry/enquiry"));
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
  { path: '/profile', exact: true, name: "Profile", component : profile},
  { path: '/profile/:id', exact: true, name: "Profile", component : newProfile},
  
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/plan', exact: true,  name: 'Plans', component: Plans },
  { path: '/plan/add', exact: true,  name: 'Add Plans', component: PlanForm },
  { path: '/plan/:id', exact: true, name: 'Plan Details', component: PlanForm },
  { path: '/transactions', exact: true,  name: 'Transaction', component: Transaction },
  { path: '/enquiry', exact: true,  name: 'Enquiry', component: Enquiry },
  { path: '/qr', exact: true,  name: 'QR Manage', component: QR },
  { path: '/category', exact: true,  name: 'Category', component: Category },
  { path: '/category/create', exact: true,  name: 'Create Category', component: CategoryForm },
  { path: '/category/:id', exact: true,  name: 'Category', component: CategoryForm },
  { path: '/menu-management', exact: true,  name: 'Manu Management', component: menu },

  { path: "/email-template",  exact: true, name: 'Email Template', component: EmailTemplate},
  { path: "/404",  name: 'Page 404', component: Page404},
  { path: "/500",  name: 'Page 500', component: Page500}
];

export default routes;
