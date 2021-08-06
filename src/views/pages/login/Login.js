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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = (props) => {
  const [ email , setEmail ] = useState(null);
  const [ password , setPassword ] = useState(null);

  useEffect(() => {
    if(props.userDetail && props.userDetail.user){
        typeof localStorage !== 'undefined' &&  localStorage.setItem('userDetail', JSON.stringify(props.userDetail))
        window.location.href = '/';
      }
      
  }, [props.userDetail])
  console.log(props.userDetail)

  const handleLogin = ()=> {
    if(email && password){
      props.loginUser({
        email : email,
        password : password,
        role:"admin"
      })
    }
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
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }}  autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handleLogin}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CLink color="link" to="/forget-password" className="px-0">Forgot password?</CLink>
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
  userDetail: state.auth.userDetail,
} );

const mapDispatchToProps = {
  loginUser
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );

