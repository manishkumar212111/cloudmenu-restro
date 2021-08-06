import React, { useEffect, useState } from 'react';
import validateUtility from "../../utils/ValidateUtility";
import CKEditor from "ckeditor4-react";


import { create , GetCmsById , UpdateCmsById} from "../../actions/cms";
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
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react';

import { Draggable } from "react-drag-reorder";

import CIcon from '@coreui/icons-react';

const defaultProps = {
    fieldObj : {
        title: '',
        url: "",
        metaDescription: '',
        status: true,
        description: '',
        images: ''
    }
}

const CmsForm = (props) => {
    const [ isEdit , setIsEdit] = useState(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    console.log(props);
    
    const [ fieldObj , setfieldObj ] = useState(defaultProps.fieldObj)
    const [errorObj , setErrorObj] = useState(
        {   title : { error : true , msg : "It should be valid" } , 
            metaDescription : { error : true , msg : "It should be valid" },
            description : { error : true , msg : "It should be valid" },
            status : { error : true , msg : "It should be valid" },
            images : { error : true , msg : "It should be valid" },
            url: { error : true , msg : "It should be valid" }
        })
    useEffect(() => {
      setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    }, [props.match.params])
    
    useEffect(() => {
        if(isEdit){
            props.GetCmsById(isEdit)
        }
    }, [isEdit]);

    useEffect(() => {
      props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj)
    }, [props.fieldObj]);
    

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
            case "title":
            case "description" :
            case "images":  
            case "url":
            case "metaDescription":
                return  validateUtility.required(value)
            
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['title', 'metaDescription' , 'description'];
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
        
        if(isEdit){
            delete fieldObj.id;
            delete fieldObj.createdAt
            props.UpdateCmsById(isEdit , fieldObj)
            return;
        }
        props.create(fieldObj)  

    }

    if(props.loading){
        return (
            <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
            />
        )
    }
    return (
    <>
      <CRow>
        <CCol xs="12" sm="6"  style={{"margin-top" : "10px"}}>
          <CCard>
            <CCardHeader>
              Cms Detail
              {/* <small> Form</small> */}
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="name">Cms Title *</CLabel>
                <CInput id="title" name="title" value={fieldObj.title} onChange={(e) => handleChange(e , 'title')} placeholder="Enter Title" />
                {!errorObj.title.error && <CFormText className="help-block error">{errorObj.title.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Thumbnail image Url </CLabel>
                <CInput id="images" name="images" value={fieldObj.images} onChange={(e) => handleChange(e , 'images')} placeholder="Enter url" />
                {!errorObj.images.error && <CFormText className="help-block error">{errorObj.images.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">website routes </CLabel>
                <CInput id="url" name="url" value={fieldObj.url} onChange={(e) => handleChange(e , 'url')} placeholder="Enter url" />
                {!errorObj.url.error && <CFormText className="help-block error">{errorObj.url.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="description">Cms description *</CLabel>
                <CKEditor
                    data={fieldObj.description ? fieldObj.description.replaceAll('&lt;','<') : "Write description here"}
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
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = event.editor.getData();
                        console.log(data);
                        handleChange(event , 'description' , data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }

                />
                {!errorObj.description.error && <CFormText className="help-block">{errorObj.description.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="metaDescription">Meta Description * </CLabel>
                <CInput type="text" id="validity" name="metaDescription" value={fieldObj.metaDescription} onChange={(e) => handleChange(e , 'metaDescription')} placeholder="Enter Meta Description" />
                {!errorObj.metaDescription.error && <CFormText className="help-block">{errorObj.metaDescription.msg}</CFormText>}
              
              </CFormGroup>
              
              <CFormGroup>
                <CLabel htmlFor="status">Status </CLabel>
                <CSelect name="status" id="status" value={fieldObj.status} onChange={(e) => handleChange(e , 'status')} >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </CSelect>
                </CFormGroup>
                <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{isEdit ? "Update" : "Submit"}</CButton>
            </CCardBody>
          </CCard>

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.Home.loading,
    fieldObj : state.cms.cmsDetail
  } );
  
  const mapDispatchToProps = {
    create,
    GetCmsById,
    UpdateCmsById
  };
  
    CmsForm.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( CmsForm );
  
  
  

