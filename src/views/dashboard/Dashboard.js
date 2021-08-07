import React, { lazy , useEffect} from 'react';
import { getHomePageData } from "../../actions/home";
import { connect } from "react-redux";

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

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
    <div>hjghgjhgjh</div>
      // <WidgetsDropdown data = {props.data} />
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
