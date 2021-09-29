import React, { Fragment, useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { subscribeUser } from './subscription';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const ForgetPassword =React.lazy(() => import("./views/pages/ForgotPassword/index"));
const ResetPassword =React.lazy(() => import("./views/pages/ResetPassword/index"));

const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = (props) => {
    const [language, setLanguage] = useState("en");
    useEffect(() => {
      let alerts = props.alerts || [];
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert, idx) => {
        createNotification(`${alert.alertType}`, alert.msg);
      });

    } , [props.alerts]);

    useEffect(() => {
      setLanguage(props.language)
    }, [props.language]);

    useEffect(() => {
      let users = props.userDetail && props.userDetail.user ? props.userDetail : localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')); 
      let userDetail = users ? users.user : false;
      if(userDetail?.id){
        subscribeUser({id: userDetail?.id});
      }   
    }, [props.userDetail]);
    const createNotification = (type, message) => {
      console.log(type , message);
      let configs = {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }
      switch (type) {
        case "info":
          return toast.info(message, configs);
        case "success":
          return toast.success(message, configs);
        case "warning":
          return toast.warn(message, configs);
        case "danger":
          return toast.error(message, configs);
      }
    }
    console.log(props)
  return (
    <div className={language === "ar" ? "arabic-section" : ""} dir={language === "ar" ? "rtl": ""}>
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss = {false}
          draggable
          pauseOnHover
          style={{zIndex : 99999}}
      />
      
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              
            </Switch>
          </React.Suspense>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  alerts: state.alert,
  language: state.language.language,
  userDetail: state.auth.userDetail,

});

export default connect( mapStateToProps )( App );
