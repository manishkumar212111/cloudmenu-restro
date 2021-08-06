import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import { getTransactions } from "../../actions/transaction";
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
  CSpinner
} from '@coreui/react'

const Transactions = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [transactions , setTransaction] = useState(props.transactions)
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/transactions?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setTransaction(props.transactions)
  }, [props.transactions]);

  useEffect(() => {
    props.getTransactions(currentPage);
  }, [props.getTransactions , currentPage]);
  
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
            Transactions
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={transactions}
            fields={[
              "Plan Name","User Email",
              'transaction_id', 'currency', 'amount', 'createdAt'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/transactions/${item.id}`)}
            scopedSlots = {{
                'Plan Name':
                (item, index)=>{
                  return(<td>{item.planId.name}</td>)
                },
                'User Email':
                (item, index)=>{
                    return(<td>{item.user.email}</td>)
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
  transactions: state.transaction.transactions,
  totalPages: state.transaction.totalPages,
  loading : state.Home.loading

} );

const mapDispatchToProps = {
  getTransactions
};

export default connect( mapStateToProps, mapDispatchToProps )( Transactions );


