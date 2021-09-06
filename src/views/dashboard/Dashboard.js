import React, { lazy , useEffect} from 'react';
import { getHomePageData } from "../../actions/home";
import { connect } from "react-redux";
import "./style.scss";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CSpinner
} from '@coreui/react';

import first from "./images/$.svg";
import second from "./images/report.svg";
import revenue from "./images/revenue.png";
import order from "./images/orders.png";

const Dashboard = (props) => {
  console.log(props)

  useEffect(() => {
    // props.getHomePageData()
  }, [props.getHomePageData])
  if(props.loading){
    return ( <CSpinner
      color="primary"
      style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
  />)
  }
  return (
    <div class="col-12 col-sm-12 col-md-12 col-lg-11 px-4">
      <div class="dashboard-container">
        <div class="row py-4">
            <div class="ccol-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container">
                <div class="row dashboard-details-container-title mb-5">
                    Today’s Revenue
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row dashboard-details-container-value">
                            256
                        </div>
                        <div class="row">                                    
                            <button type="button" class="btn dashboard-details-container-btn">View All</button>
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <img src={first} alt="" class="dashboard-details-container-icon" />
                    </div>
                </div>
            </div>   
            <div class="col-1"></div>             
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-orders">
                <div class="row dashboard-details-container-title mb-5">
                    Today’s Orders
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row dashboard-details-container-value">
                            14
                        </div>
                        <div class="row">
                            <button type="button" class="btn dashboard-details-container-btn dashboard-details-container-btn-orders">View All</button>
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <img src={second} alt="" class="dashboard-details-container-icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-revenue">
                <div class="row dashboard-details-container-title mb-4">
                    Total Revenue Last 7 Days
                </div>
                <div class="row">
                    <img src={revenue} alt="" style={{width: "100%"}} />
                </div>
            </div>
            <div class="col-1"></div>
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-orders dashboard-details-container-orders-bottom">
                <div class="row dashboard-details-container-title mb-4">
                    Total Orders Last 7 Days
                </div>
                <div class="row">
                    <img src={order} alt="" style={{width: "100%"}} />
                </div>
            </div>
        </div>
    </div>
</div>

  )
}


const mapStateToProps = ( state ) => ( {
  data: state.Home.data,
  loading : state.Home.loading
} );

const mapDispatchToProps = {
  getHomePageData
};

export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );
