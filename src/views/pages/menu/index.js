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
    CListGroupItem
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Items from './items';
import Modifier from './modifier';

  
const Index = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    
    useEffect(() => {
        let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
        if(restaurantDetail && restaurantDetail.id){
            console.log("dfvndfj kjhkj");
            // props.getProductList({restaurant : restaurantDetail.id});
        }
    }, [props.getProductList])
    
    console.log(props)
    return(
            <CContainer>
                <h3>Menu Management</h3>
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