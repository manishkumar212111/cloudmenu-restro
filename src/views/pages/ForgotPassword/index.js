import React , { useState } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

import {sendResetLink} from "../../../actions/auth"  
import { CSpinner } from "@coreui/react";

const ForgotPassword = (props) => {

    const history = useHistory()
    const [fieldobj , setFieldObj] = useState({ ccode: "" ,mobile : ""});
    const [errorObj , setErrorObj] = useState({ mobile : { error : true , msg : "Please enter valid mobile" },ccode : { error : true , msg : "Please enter valid ccode" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "mobile" :
                return  validateUtility.required(value) && validateUtility.minLength(value, 8);
            case "ccode" :
                return  validateUtility.required(value);
            default :
                return true;
        }
    }
    const handleChange = (e) => {
      console.log(e.target.value)
        let field = fieldobj;
        field[e.target.name] = e.target.value;
        setFieldObj(fieldOb => ({...fieldOb , ...field}))

        let errOb = errorObj;
        errOb[e.target.name].error = validateField(e.target.name);

        setErrorObj( errorOb => ( { ...errorOb , errOb}))
    }
    
    const handleClick = () => {
        let requiredObj = ['mobile', 'ccode'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        if(!status)
            return;
        
        props.sendResetLink(fieldobj)  

    }
    console.log(fieldobj)
    return (
      <div class="form-page">
        <section class="main-form-wrapper">
            <div class="container-fluid">
              <div class="form-inner">
                <div class="form-logo">
                  <img class="img-fluid" src={localStorage.getItem("language") == "ar" ? "https://ik.imagekit.io/lcq5etn9k/restro/logo/ar_v3_Plan_de_travail_1_wKVquXj-sF.png?updatedAt=1635607055252" : "https://ik.imagekit.io/lcq5etn9k/restro/logo/eng_vf_Plan_de_travail_1_YmU83YpQuQE.png?updatedAt=1635607055701"} alt="" />
                </div>
                <div class="main-form">
                  <h5>Forgot Password ?</h5>
                    <div class="row">
                      <div class="col-md-12 form-group mb-1">
                        <p>Get OTP</p>
                      </div>
                      <div class="col-4 col-md-3 form-group mb-4">
                        <div class="custom-selected">
                          <select class="form-input" name="ccode" value={fieldobj.ccode} onChange={(e) => handleChange(e)}>
                            <option value="966">966</option>
                            <option value="91">91</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-8 col-md-9 form-group mb-4">
                        <input type="tel" type="text" placeholder="Enter mobile number" name="mobile" value={fieldobj.mobile} onChange={(e) => handleChange(e)} class="form-input" />
                      </div>
                    </div>
                    {props.login_user_loading ? <div style={{ marginLeft : "45%"}}><CSpinner /></div> : <>
                      {fieldobj.ccode && fieldobj.mobile.length > 8 && <div class="connect-btn mt-4">
                      <button class="trans-btn" onClick={handleClick}>SEND</button>
                    </div>}
                    </>}                    
                </div>
              </div>
            </div>
          </section>
        </div>

    )
}


const mapStateToProps = ( state ) => ( {
    login_user_loading: state.auth.login_user_loading,
  } );
  
  const mapDispatchToProps = {
    sendResetLink
  };
  
export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword );
