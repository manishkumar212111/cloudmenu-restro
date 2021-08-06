import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import MDBIcon from 'mdbreact';
import { getPlans } from "../../actions/plan";
import { connect } from "react-redux";
import PlanForm from "./planForm"
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react';


const getBadge = status => {
  if(status){
    return 'success'
  } else {
    return 'danger'
  }
}

const Plans = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [plans , setPlan] = useState(props.plans)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/plans?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setPlan(props.plans)
  }, [props.plans]);

  useEffect(() => {
    props.getPlans(currentPage);
  }, [props.getPlans , currentPage]);
  
  if(props.loading){
    return (
        <CSpinner
            color="primary"
            style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
        />
    )
   }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Plans
            <Link to="/plan/add"><CButton block color="primary" variant="outline" style={{float:"right" , width : "10%"}}>Add New Plan</CButton></Link>

            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={plans}
            fields={[
              { key: 'name',label:'Name'},
              'description','price', 'discount', 'validity', 'status', 'Actions'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/plans/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status ? 'Active' : 'InActive'}
                    </CBadge>
                  </td>
                ),
                'Actions':
                (item, index)=>{
                  return(<span>
                    <CBadge style={{ margin : "12px", padding : "7px" }} color={getBadge(item.status)}>
                      <Link to={`/plan/${item.id}`}><CIcon name="cilPencil" /></Link>
                    </CBadge>
                  </span>)
                }
            }}
          />
          <CPagination
            activePage={currentPage}
            onActivePageChange={pageChange}
            pages={props.totalPages}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = ( state ) => ( {
  plans: state.plan.plans,
  totalPages: state.plan.totalPages,
  loading : state.Home.loading,

} );

const mapDispatchToProps = {
  getPlans
};

export default connect( mapStateToProps, mapDispatchToProps )( Plans );


