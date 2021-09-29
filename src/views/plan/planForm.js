import React, { useEffect, useState } from 'react';
import validateUtility from "../../utils/ValidateUtility";

import { create , GetPlanById , UpdatePlanById} from "../../actions/plan";
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
        name: '',
        description: '',
        price: '',
        priceInDollar : "",
        discount: '',
        features: [],
        status: true,
        validity: '',
    }
}

const PlanForm = (props) => {
    console.log(props.match.params.id , "vdfvdf")
    const [ isEdit , setIsEdit] = useState(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    
    const [ fieldObj , setfieldObj ] = useState(isEdit ? props.fieldObj : defaultProps.fieldObj)
    const [ feature , setFeature] = useState('');
    const [ dragId , setDragId ] = useState(null);
    const [ edtFeature , setEditFeature] = useState(false);
    const [errorObj , setErrorObj] = useState(
        {   name : { error : true , msg : "It should be valid" } , 
            descripton : { error : true , msg : "It should be valid" },
            price : { error : true , msg : "It should be valid" },
            priceInDollar : { error : true , msg : "It should be valid" },
            discount : { error : true , msg : "It should be valid" },
            validity : { error : true , msg : "It should be valid" },
            status : { error : true , msg : "It should be valid" },
        })
    
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if(isEdit){
            props.GetPlanById(isEdit)
        }
    }, [isEdit]);

    useEffect(() => {
      props.fieldObj && setfieldObj(props.fieldObj)
    }, [props.fieldObj]);
    
    const toggle = ()=>{
        setModal(!modal);
        if(modal){
            setFeature('');
        }
    }

    const handleChange = (e , key) => {
        
        
        let field = {};
        field[key] = e.target.value;
        setfieldObj(fieldOb => ({...fieldOb , ...field}))
       
            let errOb = {}
            errOb[key] = { error : validateField(key , e.target.value) , msg : errorObj[key].msg};            
            setErrorObj( er => ( { ...er , ...errOb}))
          
        
        
    }
      
    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 

        switch(key) {
            case "name":
                return  validateUtility.required(value)
            case "description":
                return  validateUtility.required(value)
            case "price" :
            case 'priceInDollar':
            case "discount" :
            case "validity" :
                return  typeof value !== 'undefined' && parseInt(value) >= 0;
    
            default :
                return true;
        }
    }
    const handleFeatureSave = () => {
        if(edtFeature != false && feature){
            let h = {};
            h['features'] = fieldObj.features;
            
            h['features'][edtFeature] = feature
            setfieldObj(fieldOb => ({...fieldOb , ...h}))
            setEditFeature(false);
            toggle() 
        } else if(feature){
            let field = {};
            field['features'] = fieldObj.features;
            field['features'].push(feature);
            
            setfieldObj(fieldOb => ({...fieldOb , ...field}))
            toggle() 
        }
    }
    const handleClick = () => {
        let requiredObj = ['name', 'price' , 'validity' , 'discount'];
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
            props.UpdatePlanById(isEdit , fieldObj)
            return;
        }
        props.create(fieldObj)  

    }
    const array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };
    
    const deleteFeature = (index) => {
        let h = {};
        h['features'] = fieldObj.features;
        
        h['features'].splice(index , 1)
        setfieldObj(fieldOb => ({...fieldOb , ...h}))
    
    }

    const editFeature = (index , item) => {
        setEditFeature(index);
        setFeature(item);
        setModal(true);
    }

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
        //setDragId(ev.currentTarget.id);
      };
    
      const handleDrop = (ev) => {
        if(ev.currentTarget.id == dragId){
            return;
        }
        let h = {};
        h['features'] = fieldObj.features;
        
        h['features'] = array_move(h['features'] , parseInt(dragId) , parseInt(ev.currentTarget.id))
        setfieldObj(fieldOb => ({...fieldOb , ...h}))
      };


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
    <CCard>
    <CCardHeader>
              Plan
            </CCardHeader>
        
      <CRow>
        <CCol xs="12" sm="6"  style={{"margin-top" : "10px"}}>
          <CCard>
            <CCardHeader>
              Plan Detail
              {/* <small> Form</small> */}
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="name">Plan Name *</CLabel>
                <CInput id="name" name="name" value={fieldObj.name} onChange={(e) => handleChange(e , 'name')} placeholder="Enter Plan name" />
                {!errorObj.name.error && <CFormText className="help-block error">{errorObj.name.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="description">Plan description</CLabel>
                <CTextarea id="descripton" name="descripton" value={fieldObj.descripton} onChange={(e) => handleChange(e , 'descripton')} placeholder="descripton" />
                {!errorObj.descripton.error && <CFormText className="help-block">{errorObj.descripton.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="validity">Plan Validity * (<small> in months ( 0 for unlimited )</small>)</CLabel>
                <CInput type="number" id="validity" name="validity" value={fieldObj.validity} onChange={(e) => handleChange(e , 'validity')} placeholder="Enter validity" />
                {!errorObj.validity.error && <CFormText className="help-block">{errorObj.validity.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="price">Price * (<small> in INR</small>)</CLabel>
                <CInput type="number" id="price" name="price" value={fieldObj.price} onChange={(e) => handleChange(e , 'price')} placeholder="Enter price" />
                {!errorObj.price.error && <CFormText className="help-block">{errorObj.price.msg}</CFormText>}

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="price">Price * (<small> in Dollar</small>)</CLabel>
                <CInput type="number" id="priceInDollar" name="priceInDollar" value={fieldObj.priceInDollar} onChange={(e) => handleChange(e , 'priceInDollar')} placeholder="Enter price" />
                {!errorObj.priceInDollar.error && <CFormText className="help-block">{errorObj.priceInDollar.msg}</CFormText>}

              </CFormGroup>
              
              <CFormGroup>
                <CLabel htmlFor="street">Discount (<small> in percentage</small>)</CLabel>
                <CInput type="number" id="discount" name="discount" value={fieldObj.discount} onChange={(e) => handleChange(e , 'discount')} placeholder="Enter discount" />
                {!errorObj.discount.error && <CFormText className="help-block">{errorObj.discount.msg}</CFormText>}

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
        <CCol xs="12" sm="6"  style={{"margin-top" : "10px"}}>
            <CCard>
                <CCardHeader>
                    Plan features
                    <CButton block color="primary" variant="outline" style={{float:"right" , width : "20%"}} onClick={toggle}>Add New Feature</CButton>

                </CCardHeader>
            </CCard>
            <CCardBody>
                <div 
                    handleDrag={handleDrag}
                    handleDrop={handleDrop}
                
                >
                { fieldObj.features && fieldObj.features.map((item , index) => {return (
                    <>
                    <CListGroupItem
                    draggable={true}
                    id={index}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                    id={index} key={index} color="secondary" style={{ cursor : "move"}}>
                        {item}
                        
                        <span style={{ float:"right"}}>
                            <CIcon onClick={() => {editFeature(index , item)}} style={{ color : "green", margin:"5px" , cursor: "pointer"}} name="cil-pencil"/>
                            <CIcon onClick={() => deleteFeature(index)} style={{ color : "red", margin:"5px" , cursor: "pointer"}} name="cil-trash" />
                        </span>
                    </CListGroupItem>
                    </>
                )})
                }
                </div>
            </CCardBody>
        </CCol>
      </CRow>
      </CCard>

      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Enter description</CModalHeader>
        <CModalBody>
            <CTextarea id="feature" name="feature" value={feature} onChange={(e) => setFeature(e.target.value)} placeholder="Enter text" />        
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleFeatureSave}>Save</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.Home.loading,
    fieldObj : state.plan.planDetail
  } );
  
  const mapDispatchToProps = {
    create,
    GetPlanById,
    UpdatePlanById
  };
  
    PlanForm.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( PlanForm );
  
  
  

