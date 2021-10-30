import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { loginUser } from "../../../actions/auth";
import { connect } from "react-redux";
import { t } from "../../../utils/language";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import validateUtility from 'src/utils/ValidateUtility';

const Login = (props) => {
  const [ mobile , setMobile ] = useState('8005804379');
  const [ password , setPassword ] = useState("Man@12345");
  const [ccode , setccode] = useState("91");
  useEffect(() => {
    if(props.userDetail && props.userDetail.user){
        typeof localStorage !== 'undefined' &&  localStorage.setItem('userDetail', JSON.stringify(props.userDetail))
        
        let userDetail = props.userDetail.user;
        let restaurantDetail = props.userDetail.restaurant;
        
        if(userDetail.status){
          console.log(userDetail);
          if(restaurantDetail && restaurantDetail.status){
            window.location.href = '/#/dashboard';
          } else if(restaurantDetail && restaurantDetail.status == 0){
            window.location.href = '/#/profile/update';
          } else {
            window.location.href = '/#/profile/update'
          }
        }

      
      }
      
  }, [props.userDetail])
  console.log(props.userDetail)

  const handleLogin = ()=> {
    if(mobile && password){
      props.loginUser({
        mobile : mobile,
        ccode : ccode,
        password : password,
        role:"user"
      })
    }
  }
  return (
    <div class="form-page">
      <section class="main-form-wrapper">
        <div class="container-fluid">
          <div class="form-inner">
            <div class="form-logo">
              <img class="img-fluid" src={localStorage.getItem("language") == "ar" ? "https://ik.imagekit.io/lcq5etn9k/restro/logo/ar_v3_Plan_de_travail_1_wKVquXj-sF.png?updatedAt=1635607055252" : "https://ik.imagekit.io/lcq5etn9k/restro/logo/eng_vf_Plan_de_travail_1_YmU83YpQuQE.png?updatedAt=1635607055701"} alt="" />
            </div>
            <div class="main-form">
              <h5>{t("Login to your account")}</h5>
              <form>
                <div class="row">
                    <div className="col-4 col-md-3 form-group mb-4">
                        <div className="custom-selected">
                          <select className="form-input" name="ccode" value={ccode} onChange={(e) => setccode(e.target.value)}>
                            <option value="966">966</option>
                            <option value="91">91</option>
                          </select>
                        </div>
                      </div>
                    <div class="col-8 col-md-9 form-group mb-4">
                      <input placeholder={t("Phone Number")} type="text" data-vu-type="number" onKeyPress={(e) => validateUtility.stopDefault(e)}  class="form-input" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                  <div class="col-md-12 form-group mb-2">
                    <input placeholder={t("Password")} type="password" class="form-input"  value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div class="col-md-12">
                    <a href="/#/forget-password" class="forgot-link">{t("forgot password ?")}</a>
                  </div>
                </div>
                <div class="connect-btn mt-4">
                  {props.loginLoading ? <div style={{width: "60%" , marginLeft: "43%"}}><CSpinner color="info" /> </div> : <button type="button" class="trans-btn" href="#" onClick={handleLogin}>{t("LOGIN")}</button>}
                </div>
                <p class="login-bot mt-4 mb-0">{t("Don’t have an account?")} <a href="/#/register">{t("Register Here")}</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}


const mapStateToProps = ( state ) => ( {
  userDetail: state.auth.userDetail,
  loginLoading: state.auth.loginLoading
} );

const mapDispatchToProps = {
  loginUser
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );

