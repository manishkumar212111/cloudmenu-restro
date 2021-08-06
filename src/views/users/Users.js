import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import { getUsers , updateStatus } from "../../actions/user";
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

import usersData from './UsersData'

const getBadge = status => {
  if(status){
    return 'success'
  } else {
    return 'danger'
  }
}

const Users = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [users , setUser] = useState(props.users)
  console.log(props.users)
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setUser(props.users)
  }, [props.users]);

  useEffect(() => {
    props.getUsers(currentPage);
  }, [props.getUsers , currentPage]);
  
  const handleStatusChange =(status , id) => {
    console.log(id)
    props.updateStatus(id , {status: !status})
  }
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
            Users
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={users}
            fields={[
              { key: 'full_name',label:'First Name', _classes: 'font-weight-bold' },
              'planName',
              'email', 'role', 'status'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CSwitch onChange={(e) => handleStatusChange(item.status, item.id)} variant="3d" checked={item.status} color="success" size="lg" shape="pill"/>
                  </td>
                ),
                'full_name':
                (item, index)=>{
                  return(<td>{item.first_name} {item.last_name}</td>)
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
  users: state.user.users,
  totalPages: state.user.totalPages,
  loading : state.Home.loading

} );

const mapDispatchToProps = {
  getUsers,
  updateStatus
};

export default connect( mapStateToProps, mapDispatchToProps )( Users );


