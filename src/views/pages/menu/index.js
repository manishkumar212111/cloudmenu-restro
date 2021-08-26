import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"
import { getProductById , getProductList, deleteProductById } from 'src/actions/product';
import {
    CButton,
    CCol,
    CContainer,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupAppend,
    CInputGroupText,
    CRow,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalHeader,
    CModalBody
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Items from './items';
import Modifier from './modifier';
import Setting from './setting';

  
const Index = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [viewOpen , setViewOpen] = useState(false);
    const [restaurant , setRestaurant] = useState('');
    useEffect(() => {
        let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
        if(restaurantDetail && restaurantDetail.id){
            setRestaurant(restaurantDetail.id);
            console.log("dfvndfj kjhkj");
            // props.getProductList({restaurant : restaurantDetail.id});
        }
    }, [props.getProductList])
    
    console.log(props)
    return(
            <CContainer>
                <h3>Menu Management</h3>
                <div style={{float: "right"}} onClick={() => setViewOpen(true)}>Settings</div>
                <CRow>
                    <CListGroup style={{flexDirection : "row", cursor: "pointer"}}>
                        <CListGroupItem onClick={() => setActiveTab(0)}>
                             Menus
                        </CListGroupItem>
                        <CListGroupItem onClick={() => setActiveTab(1)}>
                            Categories and items
                        </CListGroupItem>
                        <CListGroupItem onClick={() => setActiveTab(2)}>
                            Modifiers
                        </CListGroupItem>
                    </CListGroup>
                </CRow>
                {activeTab == 1 && <CRow>
                    <Items />
                </CRow>}
                {activeTab == 2 && <CRow>
                    <Modifier />
                </CRow>}
                {activeTab == 0 && <CRow>

                </CRow>}


            {viewOpen && <CModal show={viewOpen} onClose={setViewOpen}>
                <CModalHeader closeButton>Menu Settings</CModalHeader>
                <CModalBody>
                        <Setting id={restaurant}/>
                </CModalBody>
                {/* <CModalF>
                </CModalFooter> */}
            </CModal>}
            </CContainer>
    )
};
const mapStateToProps = ( state ) => ( {
    productList: state.product.productList,
    totalPages: state.product.totalPages,
    loading : state.product.product_detail_loading
  
  } );

const mapDispatchToProps = {
    getProductList,
    deleteProductById,
    getProductById
};

export default connect(mapStateToProps , mapDispatchToProps)(Index)