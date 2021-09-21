import React, { lazy , useEffect, useState} from 'react';
import { getHomePageData } from "../../actions/home";
import { connect } from "react-redux";
import "./style.scss";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CSpinner
} from '@coreui/react';

import first from "./images/$.svg";
import second from "./images/report.svg";
import revenue from "./images/revenue.png";
import order from "./images/orders.png";
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs';

//generete Label


const Dashboard = (props) => {
  console.log(props)
  const [data, setData] = useState({});
  const [revenueInWeek , setRevenueInWeek] = useState([])  
  const [orderInWeek , setOrderInWeek] = useState([])  
  
  useEffect(() => {
    props.getHomePageData()
  }, [props.getHomePageData])

  const GetDays = (d,Mention_today=false, itm)=>{
    //Mention today mean the array will have today date 
    var DateArray = [];
    var days=d;
    for(var i=0;i<days;i++){
    if(!Mention_today && i==0){i=1;days+=1}
    var date = new Date();
    var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
    const fulld = (Number(day)+'-'+Number(month)+'-'+Number(year)) // Format date as you like
    var obj = {key: fulld , value: itm[fulld] || 0}
    DateArray.push(obj);
    }
    return DateArray;
  }

    
  useEffect(()=>{
    if(props?.data?.result){
        setData(props?.data?.result);
        setRevenueInWeek(GetDays(7 ,true , props?.data?.result.revenueInWeek));
        setOrderInWeek(GetDays(7 ,true , props?.data?.result.orderInWeek));
    } 
  }, [props?.data])


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
                            {data.todayRevenue || 0 } 
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
            <div class="col-1"></div>             
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-orders">
                <div class="row dashboard-details-container-title mb-5">
                    Today’s Orders
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row dashboard-details-container-value">
                        {data.todayOrder || 0 } 
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
        <div class="row">
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-revenue">
                <div class="row dashboard-details-container-title mb-4">
                    Total Revenue Last 7 Days (SR {data.totalRevenue})
                </div>
                <div class="row">
                <CCard>
                    <CCardBody>
                    <CChartBar
                        datasets={[
                            {
                                label: 'Revenue',
                                backgroundColor: '#f87979',
                                data: revenueInWeek.reverse().map(itm => itm.value)
                            }
                        ]}
                        labels={revenueInWeek.reverse().map(itm => itm.key.split("-")[0] + "-" + itm.key.split("-")[1])}
                        options={{
                        tooltips: {
                            enabled: true
                        }
                        }}
                    />
                    </CCardBody>
                </CCard>

                    {/* <img src={revenue} alt="" style={{width: "100%"}} /> */}
                </div>
            </div>
            <div class="col-1"></div>
            <div class="col-12 col-sm-8 col-md-7 col-lg-5 mb-4 py-4 px-5 dashboard-details-container dashboard-details-container-orders dashboard-details-container-orders-bottom">
                <div class="row dashboard-details-container-title mb-4">
                    Total Orders Last 7 Days ({data.totalOrder})
                </div>
                <div class="row">
                <CCard>
                    <CCardBody>
                    <CChartBar
                        datasets={[
                            {
                                label: 'Order',
                                backgroundColor: '#f87979',
                                data: orderInWeek.reverse().map(itm => itm.value)
                            }
                        ]}
                        labels={orderInWeek.reverse().map(itm => itm.key.split("-")[0] + "-" + itm.key.split("-")[1])}
                        options={{
                            maintainAspectRatio: true,
                            tooltips: {
                                enabled: true
                            }
                        }}
                    />
                    </CCardBody>
                </CCard>

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
