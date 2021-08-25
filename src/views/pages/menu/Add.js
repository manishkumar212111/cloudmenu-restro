import React, { useEffect, useState } from 'react';
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";

import { getModifierList } from "../../../actions/modifier"
import { createProduct , getProductById , updateProductById} from "../../../actions/product";
import { getCategoryList } from 'src/actions/category';
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
  CImg
} from '@coreui/react';

import { Draggable } from "react-drag-reorder";

import CIcon from '@coreui/icons-react';
import CreatableSelect from 'react-select/creatable';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from 'src/API/config';
import AsyncSelect from 'react-select/async';

const defaultProps = {
    fieldObj : {
        title: '',
        titleAr: "",
        description: "",
        descriptionAr: "",
        sellingPrice: "",
        sellingPriceAr : "",
        productImg : "",
        category: "",
        modifierGroup: []
    }
}

const Add = (props) => {
    const [ isEdit , setIsEdit] = useState(props.id)
    const [categoryList , setCategory] = useState([])
    const [preview , setPreview] = useState('');
    const [fieldObj , setfieldObj ] = useState({})
    const [errorObj , setErrorObj] = useState(
        {   title : { error : true , msg : "It should be valid" } , 
            titleAr : { error : true , msg : "It should be valid" },
            description : { error : true , msg : "It should be valid" },
            descriptionAr : { error : true , msg : "It should be valid" },
            sellingPrice : { error : true , msg : "It should be valid" },
            sellingPriceAr: { error : true , msg : "It should be valid" },
            productImg: { error : true , msg : "It should be valid" },
            category: { error : true , msg : "It should be valid" },
        })
    useEffect(() => {
    //   setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    }, [])
    
    useEffect(() => {
        if(props.id){
            props.getProductById(props.id)
            setIsEdit(props.id);
        }
    }, [props.id]);

    useEffect(() => {
      if(props.fieldObj && props.fieldObj.id){
        setfieldObj({...props.fieldObj, modifierGroup : props.fieldObj.modifierGroup ? props.fieldObj.modifierGroup.map((itm) => ({label : itm.label , value: itm.value})) : []})
      }
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
       
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview(objectUrl)
        let errOb = {}
        errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
        
    }
    const handleModifierChange = (value) => {
        let field = fieldObj.modifierGroup || [];
        if(field.map(itm =>  (itm.value)).indexOf(value.value) === -1){
            field.push(value)
            setfieldObj(fieldOb => ({...fieldOb ,  modifierGroup : field}))
        }

    }

    const handleDelete = (index) => {
        let field = fieldObj.modifierGroup || [];
        field.splice(index, 1);
        setfieldObj(fieldOb => ({...fieldOb , modifierGroup :field}))
    };
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                let option = { page: 1, limit: 12};
                if(inputValue){
                    option.name= inputValue
                }
               props.getModifierList( option, function(res){
                if(res && res.results && res.results.length){
                    resolve(res.results.map((itm) => ( { label: itm.name, value : itm.id})));
                } else{
                    resolve([]);
                }    
               });   
            // resolve(filterColors(inputValue));
        }, 1000);
    });

    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 
        switch(key) {
            case "title":
            case "titleAr" :
            case "description": 
            case "descriptionAr":
            case "sellingPrice":
            case "sellingPriceAr":
            case "category":
                return  validateUtility.required(value);
            case "productImg":
                return  validateUtility.required(fieldObj.imageUrl || value || "");
            
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['title', 'titleAr' ,'description', 'descriptionAr', 'sellingPrice', 'sellingPriceAr' , 'category', 'productImg'];
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


            props.updateProductById(isEdit , {...fieldObj , modifierGroup : JSON.stringify(fieldObj.modifierGroup)})
            return;
        }
        props.createProduct({...fieldObj , modifierGroup : JSON.stringify(fieldObj.modifierGroup)})  

    }
    useEffect(() => {
        props.getCategoryList();
    }, [props.getCategoryList]);

    useEffect(() =>{
        setCategory(props.categoryList);
    }, [props.categoryList])

    const handleCategoryChange = (inputValue, actionMeta) => {
        if(inputValue && inputValue.value && !inputValue.__isNew__){
            handleChange("" ,"category", inputValue.value);
        } else if(inputValue && inputValue.__isNew__){
            window.open("/#/category/create?name="+inputValue.value, "_blank");
        };
      };
      const handleCategoryInputChange = (inputValue, actionMeta) => {
        
      };

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
            <CRow>
                <CCol sm="6">

                    <CFormGroup>
                    <CLabel htmlFor="title">Title *</CLabel>
                    <CInput id="title" name="title" value={fieldObj.title} onChange={(e) => handleChange(e , 'title')} placeholder="Enter title" />
                    {!errorObj.title.error && <CFormText className="help-block error">{errorObj.title.msg}</CFormText>}
                
                    </CFormGroup>
              
                    <CFormGroup>
                        <CLabel htmlFor="titleAr">title (Arabic) * </CLabel>
                        <CInput id="titleAr" name="titleAr" value={fieldObj.titleAr} onChange={(e) => handleChange(e , 'titleAr')} placeholder="Enter title (arabic)" />
                        {!errorObj.titleAr.error && <CFormText className="help-block error">{errorObj.titleAr.msg}</CFormText>}
                    
                    </CFormGroup>
                
                    <CFormGroup>
                        <CLabel htmlFor="titleAr">Select Category * </CLabel>
                        <CreatableSelect 
                            isClearable
                            onChange={handleCategoryChange}
                            onInputChange={handleCategoryInputChange}
                            value={categoryList.map(itm => itm.id == fieldObj.category && {label : itm.name, value: itm.id })}
                            options={categoryList.map((itm) => ({label : itm.name, value: itm.id}))}
                        />
                        {/* <CInput id="titleAr" name="titleAr" value={fieldObj.titleAr} onChange={(e) => handleChange(e , 'titleAr')} placeholder="Enter title (arabic)" /> */}
                        {!errorObj.titleAr.error && <CFormText className="help-block error">{errorObj.titleAr.msg}</CFormText>}
                    
                    </CFormGroup>
            
                    <CFormGroup>
                        <CLabel htmlFor="description">Description * </CLabel>
                        <CInput id="description" name="description"  value={fieldObj.description} onChange={(e) => handleChange(e , 'description')} placeholder="Enter description" />
                        {!errorObj.description.error && <CFormText className="help-block error">{errorObj.description.msg}</CFormText>}

                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="descriptionAr">Description (Arabic) * </CLabel>
                        <CInput id="descriptionAr" name="descriptionAr" value={fieldObj.descriptionAr} onChange={(e) => handleChange(e , 'descriptionAr')} placeholder="Enter Description ( Arabic )" />
                        {!errorObj.descriptionAr.error && <CFormText className="help-block error">{errorObj.descriptionAr.msg}</CFormText>}                    
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="sellingPrice">Price * </CLabel>
                        <CInput type="text" id="sellingPrice" name="sellingPrice" value={fieldObj.sellingPrice} onChange={(e) => handleChange(e , 'sellingPrice')} placeholder="Enter Selling Price" />
                        {!errorObj.sellingPrice.error && <CFormText className="help-block error">{errorObj.sellingPrice.msg}</CFormText>}
                    
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="sellingPriceAr">Price (Arabic) *</CLabel>
                        <CInput id="sellingPriceAr" name="sellingPriceAr" value={fieldObj.sellingPriceAr} onChange={(e) => handleChange(e , 'sellingPriceAr')} placeholder="Enter Selling Price" />
                        {!errorObj.sellingPriceAr.error && <CFormText className="help-block error">{errorObj.sellingPriceAr.msg}</CFormText>}
                    
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="productImg">Product Image </CLabel>
                        <CInput type="file" id="productImg" name="productImg" onChange={(e) => handleFileUpload(e , 'productImg')} placeholder="Enter Product Image" />
                        {!errorObj.productImg.error && <CFormText className="help-block error">{errorObj.productImg.msg}</CFormText>}
                    </CFormGroup>
                    {preview ? <CImg src={preview} width="40" height="40"></CImg>:
                    fieldObj.imageUrl && <CImg src={BASE_URL+fieldObj.imageUrl} width="40" height="40"></CImg>}    
                    {props.product_detail_loading ? <CSpinner /> : <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{isEdit ? "Update" : "Submit"}</CButton>}
                </CCol>
                <CCol sm="6">
                    <AsyncSelect 
                        cacheOptions
                        defaultOptions
                        loadOptions={promiseOptions}
                        onChange={handleModifierChange}

                    />
                        {fieldObj && fieldObj.modifierGroup && fieldObj.modifierGroup.map((itm, index) => (
                            <><div>
                                {itm.label} <span onClick={() => handleDelete(index)}>Delete</span>
                            </div><br></br></>
                        ))}
                </CCol>
            </CRow>
            </CCardBody>
          </CCard>

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.Home.loading,
    fieldObj : state.product.productDetail,
    product_detail_loading : state.product.product_detail_loading,
    categoryList: state.category.categoryList,
    productDetail: state.product.productDetail,
    modifierList: state.modifier.modifierList,
    ModifierLoading: state.modifier.modifier_detail_loading,
  } );
  
  const mapDispatchToProps = {
    createProduct,
    getProductById,
    updateProductById,
    getCategoryList,
    getModifierList
  };
  
Add.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( Add );
  
  
  

