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
    CForm,
    CInput,CLink,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { connect } from "react-redux";

import {sendResetLink} from "../../../actions/auth"  

const ForgotPassword = (props) => {

    const history = useHistory()
    const [fieldobj , setFieldObj] = useState({ email : ""});
    const [errorObj , setErrorObj] = useState({ email : { error : true , msg : "Please enter valid email" } })
    const validateField = (key , value) => {
        value = value ? value : fieldobj[key] 
        switch(key) {
            case "email" :
                return  validateUtility.email(value);
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
        let requiredObj = ['email'];
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
    const gotoHome = () => {
        history.push("/")
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
                      <h1>Forget Password</h1>
                        <p className="fb">Enter email associated with your account to get reset password link over email</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Enter Email" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)} required />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" disabled={props.login_user_loading} type="button" onClick={handleClick}>Send Email</CButton>
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
    sendResetLink
  };
  
export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword );
