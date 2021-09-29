import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { loginUser } from "../../../actions/auth";
import { connect } from "react-redux";

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
  const [ccode , setccode] = useState("966");
  useEffect(() => {
    if(props.userDetail && props.userDetail.user){
        typeof localStorage !== 'undefined' &&  localStorage.setItem('userDetail', JSON.stringify(props.userDetail))
        window.location.href = '/';
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
              <img class="img-fluid" src="https://ik.imagekit.io/lcq5etn9k/restro/logo__Kk7H9BvuBE.svg?updatedAt=1628352121941" alt="" />
            </div>
            <div class="main-form">
              <h5>Login to your account</h5>
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
                      <input placeholder="Phone Number" type="text" data-vu-type="number" onKeyPress={(e) => validateUtility.stopDefault(e)}  class="form-input" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                  <div class="col-md-12 form-group mb-2">
                    <input placeholder="Password" type="password" class="form-input"  value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div class="col-md-12">
                    <a href="/#/forget-password" class="forgot-link">forgot password ?</a>
                  </div>
                </div>
                <div class="connect-btn mt-4">
                  {props.loginLoading ? <div style={{width: "60%" , marginLeft: "43%"}}><CSpinner color="info" /> </div> : <button type="button" class="trans-btn" href="#" onClick={handleLogin}>LOGIN</button>}
                </div>
                <p class="login-bot mt-4 mb-0">Don’t have an account? <a href="/#/register">Register Here</a></p>
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

