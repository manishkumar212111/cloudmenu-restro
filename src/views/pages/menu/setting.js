import { CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CRow, CSelect, CSpinner, CSwitch } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GetRestaurantById, UpdateRestaurantById } from 'src/actions/restaurant';

const Setting = (props) => {
    const [setting , setSetting] = useState({});

    useEffect(() => {
        props.id && props.GetRestaurantById(props.id);
    }, [props.id , props.GetRestaurantById])

    useEffect(() => {
        setSetting(props.restaurantDetail?.settings)
    }, [props.restaurantDetail])
    
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
        props.UpdateRestaurantById(props.id, { settings : JSON.stringify(setting)})
    }
    console.log(props, setting)
    if(!(setting && setting.language)){
        return null;
    }
    return(
        <CRow>
            <CCol xs="12" sm="12"  style={{"margin-top" : "10px"}}>
                <CCard>
                    <CCardBody>
                        <CFormGroup>
                            <CLabel htmlFor="title">Default language</CLabel>
                            <select className="form-control" name="language" value={setting.language} onChange={(e) => handleChange(e , 'language')}>
                                <option>en</option>
                                <option>ar</option>
                            </select>    
                            {/* <CInput id="title" name="title" value={setting.title} onChange={(e) => handleChange(e , 'title')} placeholder="Enter title" /> */}
                        
                        </CFormGroup>

                        <CFormGroup>
                            Allow Digital Payment <CSwitch checked={setting.digitalPayment} onChange={(e) => handleChange(e , 'digitalPayment' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>

                        <CFormGroup>
                            Allow Take Away Orders <CSwitch checked={setting.takeAwayOrder} onChange={(e) => handleChange(e , 'takeAwayOrder' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>
                        <h3>Payment Method</h3>
                        <CFormGroup>
                            Cash <CSwitch checked={setting.payment.cash} onChange={(e) => handleChangePayment(e , 'cash' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>

                        <CFormGroup>
                            Payment Terminal <CSwitch checked={setting.payment.paymentTerminal} onChange={(e) => handleChangePayment(e , 'paymentTerminal' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>

                        <CFormGroup>
                            Credit Card <CSwitch checked={setting.payment.creditCard} onChange={(e) => handleChangePayment(e , 'creditCard' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>

                        <CFormGroup>
                            Mada <CSwitch checked={setting.payment.mada} onChange={(e) => handleChangePayment(e , 'Mada' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>

                        <CFormGroup>
                            Apple Pay <CSwitch checked={setting.payment.applePay} onChange={(e) => handleChangePayment(e , 'applePay' , e.target.checked)} shape="pill" size="lg" color="success"/>
                        </CFormGroup>
                        {props.loading ? <CSpinner /> : <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">Update</CButton>}
                    
                    </CCardBody>
                </CCard>
                </CCol>
        </CRow>
      
    )
}


const mapStateToProps = ( state ) => ( {
    loading : state.restaurant.restaurant_detail_loading,
    restaurantDetail: state.restaurant.restaurantDetail
  } );

const mapDispatchToProps = {
    GetRestaurantById,
    UpdateRestaurantById
};

export default connect(mapStateToProps , mapDispatchToProps)(Setting)