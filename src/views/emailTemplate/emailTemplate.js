import React, { useEffect, useState } from 'react';
import validateUtility from "../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";


import { create , GetEmailTemplateById ,getEmailTemplates, UpdateEmailTemplateById} from "../../actions/emailTemplate";
import { connect } from "react-redux";
import {
  CButton,
  CSelect,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormText,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from '@coreui/react';

import { Draggable } from "react-drag-reorder";

import CIcon from '@coreui/icons-react';

const defaultProps = {
    email_templates : [],
    fieldObj : {
        type: '',
        dynamic_var: [],
        subject: '',
        content: ''
    }
}

const EmailTemplate = (props) => {
    
    const [ fieldObj , setfieldObj ] = useState(defaultProps.fieldObj)
    const [type , setType] = useState([])
    const [errorObj , setErrorObj] = useState(
        {   type : { error : true , msg : "It should be valid" } , 
            subject : { error : true , msg : "It should be valid" },
            content : { error : true , msg : "It should be valid" },
        })
    
    
    // useEffect(() => {
    //   props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj)
    // }, [props.fieldObj]);
    
    useEffect(() => {
      props.getEmailTemplates()
    }, [props.getEmailTemplates])

    useEffect(() => {
      // create select object
      if(props.email_templates.length){

      let h = [];
      props.email_templates.forEach((elem)=>{
        h.push({ label : elem.type , value : elem.id})
      })
      setType(h);
        setfieldObj({
          id : props.email_templates[0].id,
          type: props.email_templates[0].type,
          dynamic_var: props.email_templates[0].dynamic_var,
          subject: props.email_templates[0].subject,
          content: props.email_templates[0].content
        })
      }
    }, [props.email_templates])
    const handleChange = (e , key , value) => {
        
        
        let field = {};
        field[key] = value ? value : e.target.value;
        setfieldObj(fieldOb => ({...fieldOb , ...field}))
       
        let errOb = {}
        errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
          
        
        
    }
      
    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 

        switch(key) {
            case "subject":
            case "content":
                return  validateUtility.required(value)
            
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['subject', 'content'];
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
        
        props.UpdateEmailTemplateById(fieldObj.id , {
          subject : fieldObj.subject,
          content : fieldObj.content.replaceAll('&lt;','<')
        })
        return;
        

    }

    const handleTypeChange = (e) => {
      console.log(e.target.value)
      props.email_templates.forEach(element => {
        if(element.id == e.target.value){
          setfieldObj({
            id: element.id,
            type: element.type,
            dynamic_var: element.dynamic_var,
            subject: element.subject,
            content: element.content
          })
        }
      });
      
      
    }
    console.log(props);

    if(props.loading){
        return (
            <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
            />
        )
    }
    const dynamic_var = Array.isArray(fieldObj.dynamic_var) ? fieldObj.dynamic_var.join(', ') : ""
    return (
    <>
      <CRow>
        <CCol xs="12" sm="6"  style={{"margin-top" : "10px"}}>
          <CCard>
            <CCardHeader>
              EmailTemplate Detail
              {/* <small> Form</small> */}
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="name">EmailTemplate Type *</CLabel>
                <CSelect name="type" id="type" value={fieldObj.id} onChange={(e) => handleTypeChange(e)} >
                    {Array.isArray(type) && type.map(el => {return(
                      <option value={el.value}>{el.label}</option>
                    )})}
                </CSelect>
                
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="subject">Subject * </CLabel>
                <CInput type="text" id="subject" name="subject" value={fieldObj.subject} onChange={(e) => handleChange(e , 'subject')} placeholder="Enter subject" />
                {!errorObj.subject.error && <CFormText className="help-block">{errorObj.subject.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="content"> content *</CLabel>
                <p>Dynamic variable that can be used : {dynamic_var}</p>
                <textarea id="w3review" name="content" rows="20" cols="80" value={fieldObj.content ? fieldObj.content.replaceAll('&lt;','<') : "Write content here"} onChange={(event) => handleChange(event , 'content')}>
                  
                </textarea>
                {/* <CKEditor
                    data={fieldObj.content ? fieldObj.content : "Write content here"}
                    config={{
                      height: 200,
                      toolbar: [
                        ["Cut", "Copy", "Paste"],
                        ["Undo", "Redo"],
                        ["SpellChecker"],
                        ["Link", "Unlink", "Anchor"],
                        [
                          "Image",
                          "Table",
                          "Horizontal Line",
                          "Special Character"
                        ],
                        ["Maximize"],
                        ["Source"],
                        ["Bold", "Italic", "Strike"],
                        ["RemoveFormat"],
                        ["NumberedList", "BulletedList"],
                        ["DecreaseIndent", "IncreaseIndent"],
                        ["BlockQuote"],
                        ["Styles"],
                        ["Format"],
                        ["About"]
                      ]}}
                      onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }

                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = event.editor.getData();
                        console.log(data);
                        handleChange(event , 'content' , data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}
                {!errorObj.content.error && <CFormText className="help-block">{errorObj.content.msg}</CFormText>}
              
              </CFormGroup>
                <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{"Submit"}</CButton>
            </CCardBody>
          </CCard>

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.Home.loading,
    email_templates : state.emailTemplate.email_templates
  } );
  
  const mapDispatchToProps = {
    create,
    GetEmailTemplateById,
    UpdateEmailTemplateById,
    getEmailTemplates
  };
  
    EmailTemplate.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( EmailTemplate );
  
  
  

