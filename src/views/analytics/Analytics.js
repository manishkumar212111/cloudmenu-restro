import React, { lazy , useEffect, useState} from 'react';
import { getHomePageDataByDate } from "../../actions/home";
import { connect } from "react-redux";
import "./style.scss";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CPagination,
  CSpinner
} from '@coreui/react';

import first from "./images/$.svg";
import second from "./images/report.svg";
import revenue from "./images/revenue.png";
import order from "./images/orders.png";
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs';
import moment from 'moment';
import Detail from '../pages/order/detail';

//generete Label


const Dashboard = (props) => {
  console.log(props)
  const [data, setData] = useState({});
  const [orders , setOrders] = useState([])  
  const [page, setPage] = useState(1)
  const [showOrderDetail , setShowOrderDetail] = useState(false);
  const [from , setFrom] = useState("")
  const [to , setTo] = useState("")
  useEffect(() => {
    props.getHomePageDataByDate({limit:12})
  }, [props.getHomePageDataByDate])

  useEffect(()=>{
    console.log(props.data)
    if(props?.data?.analytics){
        setData(props?.data?.analytics);
        setOrders(props?.data?.orders);
    } 
  }, [props?.data])
  const handleFromDateSelect = (val) => {
    setFrom(val);
    if(to && val){
      console.log(from , val)
      props.getHomePageDataByDate({ from : new Date(val).toISOString() , to : new Date(to).toISOString()  });

    }
  }
  const handleDateSelect = (val) => {
    setTo(val);
    if(from && val){
      console.log(from , val)
      props.getHomePageDataByDate({ from : new Date(from).toISOString() , to : new Date(val).toISOString()  });

    }
  }
  const handlePaginationChange = (page) => {
    setPage(page);
    let options = {
      page: page
    }
    if(from && to){
      options['from'] = new Date(from).toISOString()
      options['to'] = new Date(to).toISOString()
    }
    props.getHomePageDataByDate(options);
  };


  if(props.loading){
    return ( <CSpinner
      color="primary"
      style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
  />)
  }
  return (
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <div class="dashboard-container">
        <div class="row">
          <div class="row col-12 justify-content-end">
            <div class="col-5">
              <div class=" d-flex date-container justify-content-end">
                <div class="col-4">
                  <div class="row">
                    Start Date
                  </div>
                  <div class="row">
                    <input type="date" value={from} onChange={(e) => handleFromDateSelect(e.target.value)} name="" id="" class="analytics-date-input" />
                  </div>
                </div>
                <div class="col-1"></div>
                <div class="col-4">
                  <div class="row">
                    End Date
                  </div>
                  <div class="row">
                    <input type="date" name="" value={to} onChange={(e) => handleDateSelect(e.target.value)} id="" class="analytics-date-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row py-4 justify-content-center">
          <div class="row col-12">
            <div class="col-12 col-lg-6 mb-4 py-4">
              <div class="dashboard-details-container">
                <div class="row dashboard-details-container-title mb-5">
                    Total Revenue
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row dashboard-details-container-value">
                            {data.totalRevenue || 0 } 
                        </div>
                        <div class="row">                                    
                            {/* <button type="button" class="btn dashboard-details-container-btn">View All</button> */}
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <img src={first} alt="" class="dashboard-details-container-icon" />
                    </div>
                </div>
              </div>
            </div>            
            <div class="col-12 col-lg-6 mb-4 py-4">
              <div class="dashboard-details-container dashboard-details-container-orders">
                <div class="row dashboard-details-container-title mb-5">
                    Total Orders
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row dashboard-details-container-value">
                        {data.totalOrder || 0 } 
                        </div>
                        <div class="row">
                            {/* <button type="button" class="btn dashboard-details-container-btn dashboard-details-container-btn-orders">View All</button> */}
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <img src={second} alt="" class="dashboard-details-container-icon" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
      <div className="col-12 px-5">
        <div className="row menu-header">
          <div className="col-6 menu-heading">Orders</div>
        </div>

        <div className="row menu-display-container bg-white mt-4">
          <div className="table-responsive">
            <table className="table table-borderless">
              <tr className="menu-display-header pt-3">
                <th className="col-1 text-center menu-display-heading py-4">
                  Date/Time
                </th>
                <th className="col-1 text-right menu-display-heading py-4">
                  Type
                </th>
                <th className="col-2 text-center menu-display-heading py-4">
                  Order Number
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  Table No
                </th>
                <th className="col-2 text-center menu-display-heading py-4">
                  Payment Type
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  Status
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  Pay
                </th>
                <th className="col-1 text-center menu-display-heading py-4">Details</th>
                {/* <th className="col-1 text-center menu-display-heading py-4">Status</th> */}
                <th></th>
              </tr>
            {orders && orders.results && 
              orders.results.length &&
              orders.results.map((itm) => (
                <tr className="item-row py-4 align-items-center px-0">
                  <td className="col-1 text-center py-4">
                     {moment(itm.createdAt).format("DD/MM/YYYY")}
                      {moment(itm.createdAt).format("HH:mm")}
                  </td>
                  <td className="col-1 text-right py-4">{itm.orderType}</td>
                  <td className="col-2 text-center py-4">{itm.orderNo}</td>
                  <td className="col-1 text-center py-4">{itm.tableNo || "NA"}</td>
                  <td className="col-2 text-center py-4">{itm.paymentType}</td>
                  <td className="col-1 text-center py-4">{itm.paymentStatus}</td>
                  <td className="col-1 text-center py-4">SR {itm.totalAmount}</td>
                  <td className="col-1">
                    <button
                      type="button"
                      className="btn item-view-btn item-view-btn-details"
                      onClick={() =>setShowOrderDetail(itm)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              </table>
              <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={orders.totalPages}
                    onActivePageChange={(i) => handlePaginationChange(i)}
                  ></CPagination>
              </div>
          </div>
        </div>
      </div>
      {showOrderDetail && (
          <CModal show={showOrderDetail} className="temp" onClose={setShowOrderDetail}>
            <CModalHeader closeButton>
            <div class="col add-dish-header">
               Dish
            </div>
            </CModalHeader>
            <CModalBody>
              {/* <Add id={activeId} /> */}
              <Detail productDetail = {showOrderDetail}/>
            </CModalBody>
          </CModal>
        )}
        
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
  getHomePageDataByDate
};

export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );
