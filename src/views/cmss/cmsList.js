import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import MDBIcon from 'mdbreact';
import { getCmss } from "../../actions/cms";
import { connect } from "react-redux";
import CmsForm from "./cmsForm"
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

const Cmss = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [cmss , setCms] = useState(props.cmss)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/cmss?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setCms(props.cmss)
  }, [props.cmss]);

  useEffect(() => {
    props.getCmss(currentPage);
  }, [props.getCmss , currentPage]);
  
  if(props.loading){
    return (
        <CSpinner
            color="primary"
            style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
        />
    )
   }
   const getSubstring = (it) => {
    return it;
   }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Cmss
            <Link to="/cms/add"><CButton block color="primary" variant="outline" style={{float:"right" , width : "10%"}}>Add New Cms</CButton></Link>

            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={cmss}
            fields={[
              'title','url', 'description','status', 'Actions'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/cmss/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=> (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status ? 'Active' : 'InActive'}
                    </CBadge>
                  </td>
                ),
              'description':
                (item)=>(
                  <td>
                      {item.description.substring(0 , 50)}
                  </td>
                ),
                'Actions':
                (item, index)=>{
                  return(<td>
                       <span>
                            <Link to={`/cms/${item.id}`}><CIcon style={{ color : "green", margin:"5px" , cursor: "pointer"}} name="cil-pencil"/></Link>
                            {/* <CIcon style={{ color : "red", margin:"5px" , cursor: "pointer"}} name="cil-trash" /> */}
                        </span>
                    
                    </td>)
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
  cmss: state.cms.cmss,
  totalPages: state.cms.totalPages,
  loading : state.Home.loading,

} );

const mapDispatchToProps = {
  getCmss
};

export default connect( mapStateToProps, mapDispatchToProps )( Cmss );


