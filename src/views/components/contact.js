import React, {useEffect, useState} from 'react';
import validateUtility from 'src/utils/ValidateUtility';
import { connect } from "react-redux";
import { submitContact } from 'src/actions/contact';
import { CSpinner } from '@coreui/react';

const Contact = (props) => {
    const [fieldobj , setFieldObj] = useState({ name : "",  email : "" , mobile: "", subject : "", description: "" });
  const [errorObj , setErrorObj] = useState({ name : { error : true , msg : "Please enter valid email" } , 
                                              email : { error : true , msg : "Please enter correct email" },
                                              mobile : { error : true , msg : "Please enter valid mobile number" },
                                              subject : { error : true , msg : "Please enter valid subject" },
                                              description : { error : true , msg : "Please enter atleast 10 chars" }
                                           })
  const validateField = (key , value) => {
      value = value ? value : fieldobj[key] 
      switch(key) {
        case "name":
            return  validateUtility.required(value)
        case "email" :
            return  validateUtility.required(value) && validateUtility.email(value);
        case "mobile" :
            return  validateUtility.required(value) && validateUtility.minLength(value, 8);
        case "subject":
            return  validateUtility.required(value)
        case "description" :  
            return  validateUtility.required(value) && validateUtility.minLength(value, 10)
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
      let requiredObj = ['name', 'mobile' , 'email', 'subject', 'description'];
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
      props.submitContact({...fieldobj})  

  }
    return(
        <div className="col-lg-7 col-md-6">
            <div className="connect-form-wrapper">
            <h5>Write To Us</h5>
                <div className="row">
                <div className="col-md-6 form-group mb-4">
                    <span className="error">{!errorObj.name.error && errorObj.name.msg}</span>
                    <input placeholder="Full Name" type="text" className="form-input" name="name" value={fieldobj.name} onChange={(e) => handleChange(e)}/>
                
                </div>
                <div className="col-md-6 form-group mb-4">
                    <span className="error">{!errorObj.email.error && errorObj.email.msg}</span>
                    <input placeholder="Email Id" type="email" className="form-input" name="email" value={fieldobj.email} onChange={(e) => handleChange(e)}/>
                
                </div>
                <div className="col-md-6 form-group mb-4">
                    <span className="error">{!errorObj.mobile.error && errorObj.mobile.msg}</span>
                    <input placeholder="Phone Number" type="text" data-vu-type="number" onKeyPress={(e) => validateUtility.stopDefault(e)} className="form-input" name="mobile" value={fieldobj.mobile} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="col-md-6 form-group mb-4">
                    <span className="error">{!errorObj.subject.error && errorObj.subject.msg}</span>
                    <input placeholder="Subject" type="text" className="form-input" name="subject" value={fieldobj.subject} onChange={(e) => handleChange(e)}/> 
                </div>
                <div className="col-md-12 form-group">
                    <span className="error">{!errorObj.description.error && errorObj.description.msg}</span>
                    <textarea placeholder="Your Message" className="form-input" name="" id="" cols="30" rows="5" name="description" value={fieldobj.description} onChange={(e) => handleChange(e)}></textarea>
                </div>
                </div>
                <div className="connect-btn">
                    {props.submitLoading ? <div style={{width: "60%" , marginLeft: "40%"}}><CSpinner color="info" /> </div>: <button type="button" className="trans-btn" onClick={handleClick}>Send</button>}
                </div>
                
                {props.message && <span style={{color : "green"}}>{props.message}</span>}
            
            </div>
        </div>
    )
};

const mapStateToProps = ( state ) => ( {
    message: state.contact.message,
    submitLoading: state.contact.submitLoading
  } );
  
  const mapDispatchToProps = {
    submitContact
  };
  
  export default connect( mapStateToProps, mapDispatchToProps )( Contact );
  
  