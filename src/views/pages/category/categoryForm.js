import React, { useEffect, useState } from 'react';
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";


import { createCategory , getCategoryById , updateCategoryById} from "../../../actions/category";
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
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from '@coreui/react';


const defaultProps = {
    fieldObj : {
        name: ''
    }
}

const CategoryForm = (props) => {
    const [ isEdit , setIsEdit] = useState(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    console.log(props);
    
    const [ fieldObj , setfieldObj ] = useState({...defaultProps.fieldObj, name : props.location?.search.split("=")[1]})
    const [errorObj , setErrorObj] = useState(
        {   name : { error : true , msg : "It should be valid" } , 
        })
    useEffect(() => {
      setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    }, [props?.match?.params])
    
    useEffect(() => {
        if(isEdit){
            props.getCategoryById(isEdit)
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

    const handleFileUpload = (e , key, value) => {
        console.log(e.target.files[0])
        
        let field = {};
        field[key] = e.target.files[0];
        setfieldObj(fieldOb => ({...fieldOb , ...field}))
       
        let errOb = {}
        errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
        
    }
      
    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 
        switch(key) {
            case "name":
                return  validateUtility.required(value);
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['name'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        console.log(status)
        if(!status)
            return;
        
        if(isEdit){
            delete fieldObj.id;
            delete fieldObj.createdAt
            props.updateCategoryById(isEdit , {name: fieldObj.name})
            return;
        }
        props.createCategory(fieldObj)  

    }

    return (
    <>
      <CRow>
        <CCol xs="12" sm="12"  style={{"margin-top" : "10px"}}>
          {/* <CCard> */}
            {/* <CCardHeader>
              Add Category
            </CCardHeader> */}
            {/* <CCardBody> */}
            <CRow>
                <CCol sm="6">
                    <CFormGroup>
                    <CLabel htmlFor="name">Category Name *</CLabel>
                    <CInput id="name" name="name" value={fieldObj.name} onChange={(e) => handleChange(e , 'name')} placeholder="Enter category name" />
                    {!errorObj.name.error && <CFormText className="help-block error">{errorObj.name.msg}</CFormText>}
                
                    </CFormGroup>
                </CCol>
            </CRow>
                <CRow>
                    <CCol sm="4">
                   {     props.loading ? <><CSpinner /></> : 
                        <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{isEdit ? "Update" : "Submit"}</CButton>
                   } </CCol>
                </CRow>
            
            {/* </CCardBody> */}
          {/* </CCard> */}

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.category.category_detail_loading,
    fieldObj : state.category.categoryDetail,
    categoryOnbordingMessage : state.category.categoryOnbordingMessage
  } );
  
  const mapDispatchToProps = {
    createCategory,
    getCategoryById,
    updateCategoryById
  };
  
    CategoryForm.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( CategoryForm );
  
  
  

