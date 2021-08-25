import React, { useEffect, useState } from 'react';
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";


import { createModifier , getModifierById , updateModifierById} from "../../../actions/modifier";
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
  CModalFooter,
  CImg,
  CSwitch,
  CListGroup
} from '@coreui/react';


import CreatableSelect from 'react-select/creatable';
import { BASE_URL } from 'src/API/config';

const defaultProps = {
    fieldObj : {
        name: '',
        nameAr: "",
        isRequired: false,
        min: 1,
        max: 20,
        modifiers : []
    }
}

const AddModifier = (props) => {
    const [ isEdit , setIsEdit] = useState(props.id)
    const [categoryList , setCategory] = useState([])
    const [preview , setPreview] = useState('');
    const [ fieldObj , setfieldObj ] = useState({})
    const [addNew, setAddNew] = useState(true);
    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [errorObj , setErrorObj] = useState(
        {   name : { error : true , msg : "It should be valid" } , 
            nameAr : { error : true , msg : "It should be valid" },
            isRequired : { error : true , msg : "It should be valid" },
            min : { error : true , msg : "It should be valid" },
            max : { error : true , msg : "It should be valid" },
            modifiers: { error : true , msg : "It should be valid" },
        })
    useEffect(() => {
    //   setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    }, [])
    
    useEffect(() => {
        if(props.id){
            props.getModifierById(props.id)
            setIsEdit(props.id);
        }
    }, [props.id]);

    useEffect(() => {
      props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj)
    }, [props.fieldObj]);
    

    const handleChange = (e , key , value) => {
        console.log(e.target)
        window.temp = e;    
        let field = {};
        field[key] = typeof value !== "undefined" ? value : e.target.value;
        setfieldObj(fieldOb => ({...fieldOb , ...field}))
       
        let errOb = {}
        errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
        
    }

      
    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 
        switch(key) {
            case "name":
            case "nameAr" :
            case "min": 
            case "max":
                return  validateUtility.required(value);
            case "modifiers":
                return value && value.length 
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['name', 'nameAr', 'modifiers'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            console.log(errorStatus , element)
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        console.log(status)
        if(!status)
            return;
        
        if(isEdit){
            delete fieldObj.id;
            delete fieldObj.createdAt;
            delete fieldObj.imageUrl;
            delete fieldObj.inStock;
            delete fieldObj.status;
            delete fieldObj.updatedAt;
            delete fieldObj.restaurant;

            props.updateModifierById(isEdit , fieldObj)
            return;
        }
        props.createModifier(fieldObj)  

    }

    const handleSubmit = () => {
        let field = fieldObj['modifiers'] || [];
        field.push({name: name, price: price});
        setfieldObj(fieldOb => ({...fieldOb , modifiers :field}))
       
        let errOb = {}
        errOb['modifiers'] = { error : validateField('modifiers' , field['modifiers']) , msg : errorObj['modifiers'].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
        
        setName("");
        setPrice("");
    }

    const handleDelete = (index) => {
        let field = fieldObj['modifiers'] || [];
        field.splice(index, 1);
        setfieldObj(fieldOb => ({...fieldOb , modifiers :field}))
       
        let errOb = {}
        errOb['modifiers'] = { error : validateField('modifiers' , field['modifiers']) , msg : errorObj['modifiers'].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
        
    }
    useEffect(() =>{
        setCategory(props.categoryList);
    }, [props.categoryList])


    if(props.loading){
        return (
            <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
            />
        )
    }
    console.log(fieldObj)
    return (
    <>
      <CRow>
        <CCol xs="12" sm="12"  style={{"margin-top" : "10px"}}>
          <CCard>
            <CCardBody>
            
                <CCol sm="12">

                    <CFormGroup>
                    <CLabel htmlFor="name">Name *</CLabel>
                    <CInput id="name" name="name" value={fieldObj.name} onChange={(e) => handleChange(e , 'name')} placeholder="Enter name" />
                    {!errorObj.name.error && <CFormText className="help-block error">{errorObj.name.msg}</CFormText>}
                
                    </CFormGroup>
              
                    <CFormGroup>
                        <CLabel htmlFor="nameAr">Name (Arabic) * </CLabel>
                        <CInput id="nameAr" name="nameAr" value={fieldObj.nameAr} onChange={(e) => handleChange(e , 'nameAr')} placeholder="Enter name (arabic)" />
                        {!errorObj.nameAr.error && <CFormText className="help-block error">{errorObj.nameAr.msg}</CFormText>}
                    
                    </CFormGroup>
                    <CFormGroup>
                       isRequired <CSwitch checked={fieldObj.isRequired} onChange={(e) => handleChange(e , 'isRequired' , e.target.checked)} shape="pill" size="lg" color="success"/>
                    </CFormGroup>

                    <CRow>
                        <CCol sm="6">
                            <CFormGroup>
                                <CLabel htmlFor="min">Min Quantity </CLabel>
                                <CInput type="number" id="min" name="min" value={fieldObj.min} onChange={(e) => handleChange(e , 'min')} placeholder="Enter min quantity" />
                                {!errorObj.min.error && <CFormText className="help-block error">{errorObj.min.msg}</CFormText>}
                        
                            </CFormGroup>
                        </CCol>

                        <CCol sm="6">

                        <CFormGroup>
                            <CLabel htmlFor="max">Max Quantity </CLabel>
                            <CInput type="number" id="max" name="max" value={fieldObj.max} onChange={(e) => handleChange(e , 'max')} placeholder="Enter max quantity" />
                            {!errorObj.max.error && <CFormText className="help-block error">{errorObj.max.msg}</CFormText>}
                    
                        </CFormGroup>
                            </CCol>
                            <CRow>
                                <table>
                                    <tr><td>Name</td><td>Price</td></tr>
                                    {fieldObj && fieldObj.modifiers && fieldObj.modifiers.map((itm, index) => (
                                        <tr>
                                            <td>{itm.name}</td>
                                            <td>{itm.price}</td>
                                            <td><CButton onClick={() => handleDelete(index)}>Delete</CButton></td>
                                        </tr>
                                    ))}
                                    {addNew && <tr>
                                        <td>
                                            <CInput type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                                        </td>
                                        <td>
                                            <CInput type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
                                        </td>
                                        <td><CButton onClick={() => {setPrice("");setName('');}}>Cancel</CButton><CButton onClick={handleSubmit}>Submit</CButton></td>
                                    </tr>}    
                                </table>
                            </CRow>
                    </CRow>
                    {props.modifier_detail_loading ? <CSpinner /> : <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{isEdit ? "Update" : "Submit"}</CButton>}
                </CCol>
                <CCol sm="6">
                </CCol>
            </CCardBody>
          </CCard>

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.Home.loading,
    fieldObj : state.modifier.modifierDetail,
    modifier_detail_loading : state.modifier.modifier_detail_loading,
    modifierDetail: state.modifier.modifierDetail
  } );
  
  const mapDispatchToProps = {
    createModifier,
    getModifierById,
    updateModifierById,
  };
  
AddModifier.defaultProps = defaultProps;

export default connect( mapStateToProps, mapDispatchToProps )( AddModifier );
  
  
  

