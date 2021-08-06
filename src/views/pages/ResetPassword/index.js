import React , { useState } from "react";
import validateUtility from "../../../utils/ValidateUtility"
import { useHistory } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CLink,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { connect } from "react-redux";

import {resetPassword} from "../../../actions/auth"  

const ResetPassword = (props) => {
    const token = props.match.params.token;

    const [fieldobj , setFieldObj] = useState({ password : "" , repeat_password : ""});
    const [errorObj , setErrorObj] = useState({ repeat_password : { error : true , msg : "Repeated password is not same" } , 
                                                password : { error : true , msg : "Password don't match" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "password" :
                return  validateUtility.required(value);
            case "repeat_password":
                return  validateUtility.required(value) && fieldobj.password == value;
            default :
                return true;
        }
    }
    const handleChange = (e) => {
        let field = fieldobj;
        field[e.target.name] = e.target.value;
        setFieldObj(fieldOb => ({...fieldOb , ...field}))

        let errOb = errorObj;
        errOb[e.target.name].error = validateField(e.target.name);

        setErrorObj( errorOb => ( { ...errorOb , errOb}))
    }
    
    const handleClick = () => {
        let requiredObj = ['password', "repeat_password"];
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
        
        props.resetPassword(token, fieldobj.password)  

    }
    console.log(token, props.match)

    if(!token){
        return <div>No token found</div>
    }
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
            <CRow className="justify-content-center">
                <CCol md="4">
                <CCardGroup>
                    <CCard className="p-4">
                    <CCardBody>
                        <CForm>
                        <h1>Reset Password</h1>
                            {/* <p className="fb">Enter email associated with your account to get reset password link over email</p> */}
                            <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>

                        <CInputGroup className="mb-3">

                            <CInputGroupPrepend>
                            <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="password" placeholder="Enter Password" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)} required />
                        </CInputGroup>
                        <span className="error">{!errorObj.repeat_password.error && errorObj.repeat_password.msg}</span><br></br>

                        <CInputGroup className="mb-3">

                            <CInputGroupPrepend>
                            <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput className="form-control f-12" type="password" placeholder="Enter Password" name="repeat_password" value={fieldobj.repeat_password} onChange={(e) => handleChange(e)} required />
                        </CInputGroup>
                        <CRow>
                            <CCol xs="6">
                            <CButton color="primary" className="px-4"type="button" disabled={props.login_user_loading} type="button" onClick={handleClick} value="Reset password" >Send Email</CButton>
                            </CCol>

                            <CCol xs="6" className="text-right">
                            <CLink color="link" to="/login" className="px-0">Login</CLink>
                            </CCol>
                        </CRow>
                        </CForm>
                    </CCardBody>
                    </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
            </CContainer>
        </div>
    )
}

const mapStateToProps = ( state ) => ( {
    login_user_loading: state.auth.login_user_loading,
  } );
  
  const mapDispatchToProps = {
    resetPassword
  };
  
export default connect( mapStateToProps, mapDispatchToProps )( ResetPassword );
