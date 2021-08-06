import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import { getEnquirys , updateEnquiry} from "../../actions/enquiry";
import { connect } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSpinner,
  CSwitch
} from '@coreui/react'

const Enquirys = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [enquirys , setEnquiry] = useState(props.enquirys)
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/enquirys?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setEnquiry(props.enquirys)
  }, [props.enquirys]);

  useEffect(() => {
    props.getEnquirys(currentPage);
  }, [props.getEnquirys , currentPage]);
  
  if(props.loading){
    return (
        <CSpinner
            color="primary"
            style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
        />
    )
  }

  const handleStatusUpdate = (id , status) => {
    console.log(status)
    props.updateEnquiry(id , status , currentPage)
  }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Enquirys
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={enquirys}
            fields={[
              "email","mobile",
              'message', 'createdAt' , 'status'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/enquirys/${item.id}`)}
            scopedSlots = {{
                'Plan Name':
                (item, index)=>{
                  return(<td>{item.planId.name}</td>)
                },
                'status':
                (item, index)=>{
                    return(<CSwitch className={'mx-1 mt-10'} onChange={() => handleStatusUpdate(item.id, item.status == 'resolved' ? 'pending' : "resolved")} shape={'pill'} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'} defaultChecked = {item.status == 'resolved'} />
                    )
                  },                
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
  enquirys: state.enquiry.enquirys,
  totalPages: state.enquiry.totalPages,
  loading : state.Home.loading

} );

const mapDispatchToProps = {
  getEnquirys,
  updateEnquiry
};

export default connect( mapStateToProps, mapDispatchToProps )( Enquirys );


