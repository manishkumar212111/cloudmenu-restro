import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { getCategoryList,deleteCategoryById } from "../../../actions/category";
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
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { getUserData } from 'src/utils/globals';

const CategoryList = (props) => {
    console.log(props)
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [categoryList , setUser] = useState(props.categoryList)
  const [description , setDescription] = useState(null);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/admin/categorys?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setUser(props.categoryList)
  }, [props.categoryList]);

  useEffect(() => {
    props.getCategoryList({page : currentPage});
  }, [props.getCategoryList , currentPage]);
  
  const toggle = () => {
      setDescription(null);
  }

  const handleDelete= (id) => {
    props.deleteCategoryById(id , {page : currentPage})
  }

  const handleCsv = () => {
    document.getElementById('fileid').click();
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
            Category
            <Link to="/category/create"><button className="btn btn-success" style={{float: "center" ,"margin-left" : "20px"}}>Create</button></Link>
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={categoryList}
            fields={[
               'id', 
              { key: 'name',label:'Category Name' },              
              // { key: 'url',label:'Category Link' },
              "Actions"
            //   { key: 'promoCode',label:'Promo Code', _classes: 'font-weight-bold' },
              
            //   'email','category', 'createdAt', 'status', 'Categorys'
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
              'url':
                (item, index)=>(
                  <td>
                    <CBadge>
                      <a href={item.url} target="_blank">{item.url}</a>
                    </CBadge>
                  </td>
                ),
                'categoryDescription':
                (item, index)=>{
                  return(<td>{item.categoryDescription.substr(0,50)} {item.categoryDescription.length > 50 ? <span onClick={() => setDescription(item.categoryDescription)} style={{color : "blue", cursor: "pointer"}}> view more</span> : ""}</td>)
                },
                'Categorys':
                (item) => {
                  return(<td><CBadge><Link to={`/categorys/${item.id}`}>View All</Link></CBadge></td>)
                },
                'imgUrl':
                (item) => {
                  return(<td><img width="50" height="50" src={item.imgUrl}></img></td>)
                },
                "Actions":
                (item) => {
                  return(<td>
                    <Link to={`/category/${item.id}`}><CIcon style={{ color : "green", margin:"5px" , cursor: "pointer"}} name="cil-pencil"/></Link>
                    <span style={{cursor:"pointer"}} onClick={() => handleDelete(item.id)}><img width="25" height="25" src="https://img.icons8.com/plasticine/50/000000/filled-trash.png"/></span>
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
      {description != null && 
            <CModal
            show={true}
            onClose={toggle}
          >
            <CModalHeader closeButton>Description</CModalHeader>
            <CModalBody>
            {description}
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={toggle}
              >Close</CButton>
            </CModalFooter>
          </CModal>
        }  
    </CRow>
  )
}

const mapStateToProps = ( state ) => ( {
  categoryList: state.category.categoryList,
  totalPages: state.category.totalPages,
  loading : state.category.category_detail_loading

} );

const mapDispatchToProps = {
  getCategoryList,
  deleteCategoryById,
};

export default connect( mapStateToProps, mapDispatchToProps )( CategoryList );


