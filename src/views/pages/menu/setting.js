import { CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CRow, CSelect, CSpinner, CSwitch } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GetRestaurantById, UpdateRestaurantById } from 'src/actions/restaurant';

const defaultProps ={
    settings : {
        language: "en",
        digitalPayment: true,
        takeAwayOrder: false,
        payment: {
            cash: true,
            paymentTerminal: true,
            creditCard: true,
            mada: false,
            applePay: false
        }
    }
}
const Setting = (props) => {
    const [setting , setSetting] = useState(props.settings);

    useEffect(() => {
        props.settings && setSetting(set => ({...set , ...props.settings}))
    }, [props.settings])
    
    const handleChange = (e , key , value) => {
        
        let field = {};
        field[key] = value;
        setSetting(fieldOb => ({...fieldOb , ...field}))

    }

    const handleChangePayment = (e, key, value) =>{
        let field = setting.payment;
        field[key] = value;
        setSetting(fieldOb => ({...fieldOb , payment: field}))

    }
    const handleClick = () => {
        props.submitCb(setting)
    };

    console.log(props, setting)
    if(!(setting && setting.language)){
        return null;
    }
    return(
        <CRow>
            <CCol xs="12" sm="12"  style={{"margin-top" : "10px"}}>
                <CCard style={{border: "none"}}>
                    <CCardBody >
                        <CFormGroup>
                            <CLabel htmlFor="title">Default language</CLabel>
                            <select className="form-control" name="language" value={setting.language} onChange={(e) => handleChange(e , 'language', e.target.value)}>
                                <option value="en">en</option>
                                <option value="ar">ar</option>
                            </select>    
                            {/* <CInput id="title" name="title" value={setting.title} onChange={(e) => handleChange(e , 'title')} placeholder="Enter title" /> */}
                        
                        </CFormGroup>
                        <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                            <div class="col-8 text-left">
                                <label class="form-check-label form-check-switch-label" for="flexSwitchCheckDefault">Allow Digital Payments</label>
                            </div>
                            <div class="col-4 d-flex justify-content-end px-4">
                                <input checked={setting.digitalPayment} onChange={(e) => handleChange(e , 'digitalPayment' , e.target.checked)} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />                    
                            </div>                                        
                        </div>

                        <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                            <div class="col-8 text-left">
                                <label class="form-check-label form-check-switch-label" for="flexTakeDefault">Allow Takeaway Orders</label>
                            </div>
                            <div class="col-4 d-flex justify-content-end px-4">
                                <input checked={setting.takeAwayOrder} onChange={(e) => handleChange(e , 'takeAwayOrder' , e.target.checked)} class="form-check-input" type="checkbox" id="flexTakeDefault" />                    
                            </div>                                        
                        </div>


                        <div class="row mt-4 mb-4 menu-settings-payment-heading px-4">
                            Payment Methods
                        </div>

                        <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                        <label class="form-check-label form-check-switch-label" for="flexCashCheckDefault">Cash</label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                        <input class="form-check-input" type="checkbox" id="flexCashCheckDefault" checked={setting.payment.cash} onChange={(e) => handleChangePayment(e , 'cash' , e.target.checked)} />                    
                    </div>                                        
                </div>

                <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                        <label class="form-check-label form-check-switch-label" for="flexPaymentCheckDefault">Payment Terminal</label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                        <input class="form-check-input" type="checkbox" id="flexPaymentCheckDefault" checked={setting.payment.paymentTerminal} onChange={(e) => handleChangePayment(e , 'paymentTerminal' , e.target.checked)} />                    
                    </div>                                        
                </div>

                <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                        <label class="form-check-label form-check-switch-label" for="flexCreditCheckDefault">Credit Card</label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                        <input class="form-check-input" type="checkbox" id="flexCreditCheckDefault"  checked={setting.payment.creditCard} onChange={(e) => handleChangePayment(e , 'creditCard' , e.target.checked)} />                    
                    </div>                                        
                </div>

                <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                        <label class="form-check-label form-check-switch-label" for="flexMadaCheckDefault">Mada</label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                        <input class="form-check-input" type="checkbox" id="flexMadaCheckDefault" checked={setting.payment.mada} onChange={(e) => handleChangePayment(e , 'mada' , e.target.checked)} />                    
                    </div>                                        
                </div>

                <div class="row form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                        <label class="form-check-label form-check-switch-label" for="flexAppleCheckDefault">Apple Pay</label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                        <input class="form-check-input" type="checkbox" id="flexAppleCheckDefault" checked={setting.payment.applePay} onChange={(e) => handleChangePayment(e , 'applePay' , e.target.checked)} />                    
                    </div>                                        
                </div>
                <div class="form-group col-3 mx-auto d-flex justify-content-center">

                        {props.loading ? <CSpinner /> : <button className="btn add-dish-btn" block color="primary" variant="outline"  onClick={handleClick} value="Submit">{props.setting ? "Update" : "Create"}</button>}
                    </div>
                    </CCardBody>
                </CCard>
                </CCol>
        </CRow>
      
    )
}


const mapStateToProps = ( state ) => ( {
    // loading : state.restaurant.restaurant_detail_loading,
    // restaurantDetail: state.restaurant.restaurantDetail
  } );

const mapDispatchToProps = {
    GetRestaurantById,
    UpdateRestaurantById
};

Setting.defaultProps = defaultProps;
export default connect(mapStateToProps , mapDispatchToProps)(Setting)