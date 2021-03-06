import React , { useEffect , useState} from 'react'
import validateUtility from "../../../utils/ValidateUtility"
import { connect } from 'react-redux';
import { registerUser } from "../../../actions/auth"
import { CSpinner } from '@coreui/react';
import { t } from "../../../utils/language";

const Register = (props) => {
  console.log(props);
  const [planName , setPlanName] = useState(props.location && props.location.search ? props.location.search.split("=")[1] : "free");
  const [fieldobj , setFieldObj] = useState({ name : "",  ccode : "966" , mobile: "", password : "" });
  const [errorObj , setErrorObj] = useState({ email : { error : true , msg : t("Please enter valid email") } , 
                                              password : { error : true , msg : t("Please enter min 6 chars") },
                                              mobile : { error : true , msg : t("Please enter valid mobile number") },
                                              ccode : { error : true , msg : t("Please enter valid mobile number") },
                                              name : { error : true , msg : t("Please enter valid name") }
                                           })
  const validateField = (key , value) => {
      value = value ? value : fieldobj[key] 
      switch(key) {
          case "name":
              return  validateUtility.required(value)
          case "mobile" :
              return  value.length >= 9
          case "password" :
                return value.length >=6;
              // console.log(validateUtility.required(value) && validateUtility.minLength(value , 8) , value) && (!value.match(/\d/) || !value.match(/[a-zA-Z]/));
              // return  validateUtility.required(value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
          default :
              return true;
      }
  }

  useEffect(() => {
    console.log(props.userDetail);
  }, [props.userDetail]);
  const handleChange = (e) => {
      let field = fieldobj;
      field[e.target.name] = e.target.value;
      setFieldObj(fieldOb => ({...fieldOb , ...field}))

      let errOb = errorObj;
      errOb[e.target.name].error = validateField(e.target.name);

      setErrorObj( errorOb => ( { ...errorOb , errOb}))
  }
  
  const handleClick = () => {
      let requiredObj = ['name', 'mobile' , 'password'];
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
      
      console.log(fieldobj);  
      props.registerUser({...fieldobj, planName : planName})  

  }

  return (

  (props.userDetail && props.userDetail.user && !props.userDetail.user.status) ? <div class="form-page">
    <section class="main-form-wrapper">
      <div class="container-fluid">
        <div class="form-inner">
          <div class="form-logo">
            <img className="img-fluid" src={localStorage.getItem("language") == "ar" ? "https://ik.imagekit.io/lcq5etn9k/restro/logo/ar_v3_Plan_de_travail_1_wKVquXj-sF.png?updatedAt=1635607055252" : "https://ik.imagekit.io/lcq5etn9k/restro/logo/eng_vf_Plan_de_travail_1_YmU83YpQuQE.png?updatedAt=1635607055701"} alt="" />
          </div>
          <div class="main-form thank-you-page">
            <img src="https://ik.imagekit.io/lcq5etn9k/restro/tick_bHZRtBg2f1.png?updatedAt=1628352123585" class="img-fluid mb-5" alt="" />
            <h3>{t("THANK YOU !")}</h3>
            <p>{t("for your registration, your account will be activated in less than 24 hours")}</p>
          </div>
        </div>
      </div>
    </section>
  </div> :
    <div className="form-page">
      <section className="main-form-wrapper">
        <div className="container-fluid">
          <div className="form-inner">
            <div className="form-logo">
             <img className="img-fluid" src={localStorage.getItem("language") == "ar" ? "https://ik.imagekit.io/lcq5etn9k/restro/logo/ar_v3_Plan_de_travail_1_wKVquXj-sF.png?updatedAt=1635607055252" : "https://ik.imagekit.io/lcq5etn9k/restro/logo/eng_vf_Plan_de_travail_1_YmU83YpQuQE.png?updatedAt=1635607055701"} alt="" />
            </div>
            <form>
              <div className="main-form">
                <h5>{t("Register Yourself")} ({planName})</h5> 
                  <div className="row">
                    <div className="col-md-12 form-group mb-4">
                      <input placeholder={t("Your Name")} type="text" className="form-input" name="name" value={fieldobj.name} onChange={(e) => handleChange(e)}/>
                      <span className="error">{!errorObj.name.error && errorObj.name.msg}</span>
                    </div>
                    <div className="col-4 col-md-4 form-group mb-4">
                      <div className="custom-selected">
                        <select className="form-input" name="ccode" value={fieldobj.ccode} onChange={(e) => handleChange(e)}>
                          <option value="966">966</option>
                          <option value="91">91</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-8 col-md-8 form-group mb-4">
                      <input type="text" placeholder={t("Phone Number")}  data-vu-type="number" onKeyPress={(e) => validateUtility.stopDefault(e)} className="form-input" name="mobile" value={fieldobj.mobile} onChange={(e) => handleChange(e)} />
                      <span className="error">{!errorObj.mobile.error && errorObj.mobile.msg}</span>
                    </div>
                    <div className="col-md-12 form-group mb-2">
                      <input placeholder={t("Password")} type="password" className="form-input" name="password" value={fieldobj.password} onChange={(e) => handleChange(e)} />
                      <span className="error">{!errorObj.password.error && errorObj.password.msg}</span>
                    </div>
                  </div>
                  <div className="connect-btn mt-4">
                    {props.registerLoading ? <div style={{width: "60%" , marginLeft: "40%"}}><CSpinner color="info" /> </div>:<button type="button" className="trans-btn" onClick={handleClick}>{t("REGISTER")}</button>}
                  </div>
                  <p className="login-bot mt-4 mb-0">{t("Already have an account?")} <a href="/#/login">{t("Login")}</a></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  userDetail: state.auth.userDetail,
  registerLoading: state.auth.registerLoading
});

export default connect( mapStateToProps , { registerUser } )( Register );
