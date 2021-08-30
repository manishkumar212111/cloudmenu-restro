import {
    CButton,
  CCol,
  CContainer,
  CHeader,
  CImg,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CPagination,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  getProductById,
  getProductList,
  deleteProductById,
  
} from "src/actions/product";
import { connect } from "react-redux";
import { BASE_URL } from "src/API/config";
import Add from "./Add";
import View from "./View";
import { getCategoryList } from "src/actions/category";
import CategoryForm from "../category/categoryForm";

const Items = (props) => {
  const [item, setItem] = useState([]);
  const [activeProduct, setActiveProduct] = useState([]);
  const [categoryList , setCategory] = useState([]);
  const [category, setActiveCategory] = useState('');
  const [addDishPopup, openDishAddPopup] = useState(false);
  const [addCategoryPopup, openCategoryAddPopup] = useState(false);
  const [activeId , setActievId] = useState("");
  const [page,setPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id) {
      console.log("dfvndfj kjhkj");
      props.getProductList({ restaurant: restaurantDetail.id });
    }
  }, [props.getProductList]);

  useEffect(() => {
    props.getCategoryList();
  }, [props.getCategoryList]);
  useEffect(() => {
    setCategory(props.categoryList);
  }, [props.categoryList]);

  useEffect(() => {
    setItem(props.productList);
    setActiveProduct(props.productList);
  }, [props.productList]);
  
  console.log(props, activeProduct);

  const handleCategoryClick = (itm) => {
    setPage(1);
    setActiveCategory(itm.id);
    props.getProductList({ category : itm.id, page: 1 });
  };

  const handlePaginationChange = (page) => {
    setPage(page);

    props.getProductList({ category : category, page: page });
  }
  const handleDelete = (id) => {
      props.deleteProductById(id);
  };
  const handleEdit = (id) => {
    openDishAddPopup(true);
    setActievId(id);
  };
  return (
    <CContainer style={{ marginTop: 10 }}>
      <CRow>
        <CCol md="4">
          <CListGroup>
            <CListGroupItem>Categories</CListGroupItem>

            {categoryList &&
              categoryList.length &&
              categoryList.map((itm) => (
                <CListGroupItem onClick={() => handleCategoryClick(itm)}>
                  {itm.name}
                </CListGroupItem>
              ))}
          </CListGroup>
        </CCol>
        <CCol md="8">
          <CListGroup>
            <CListGroupItem>
              Items{" "}
              <button onClick={() => {openCategoryAddPopup(true); }}>Add Category</button>
              <button onClick={() => {setActievId(''); openDishAddPopup(true); }}>Add Dish</button>
            </CListGroupItem>

            {!props.loading ? (activeProduct &&
              activeProduct.length ?
              activeProduct.map((itm) => (
                <CListGroupItem>
                  <CImg
                    src={BASE_URL + itm.imageUrl}
                    width="40"
                    height="40"
                  ></CImg>{" "}
                  {itm.title}
                  <div style={{ float: "right" }}>
                    <span style={{ cursor: "pointer" }} onClick={() => setViewOpen(itm)}>View</span>{" "}
                    <span style={{ cursor: "pointer" }} onClick={() => handleEdit(itm.id)}>Edit</span>{" "}
                    <span style={{ cursor: "pointer" }} onClick={() => handleDelete(itm.id)}>Delete</span>
                  </div>
                </CListGroupItem>
              )) : <>No dish available</>) : <div style={{textAlign: "center" , marginTop : "25px"}}><CSpinner /> </div>}
          </CListGroup>
          <div className={'mt-2 '} style={{float: "right"}}>
              <CPagination
                activePage={page}
                pages={props.totalPages}
                onActivePageChange={(i) => handlePaginationChange(i)}
              ></CPagination>
            </div>

        </CCol>
      </CRow>
      {addDishPopup && <CModal show={addDishPopup} onClose={openDishAddPopup}>
        <CModalHeader closeButton>Add Dish</CModalHeader>
        <CModalBody>
                <Add id={activeId}/>
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>}
      {addCategoryPopup && <CModal show={addCategoryPopup} onClose={openCategoryAddPopup}>
        <CModalHeader closeButton>Add Category</CModalHeader>
        <CModalBody>
                <CategoryForm />
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="primary">Do Something</CButton>{" "}
          <CButton color="secondary" onClick={openDishAddPopup}>
            Cancel
          </CButton> */}
        </CModalFooter>
      </CModal>}


      {viewOpen && <CModal show={viewOpen} onClose={setViewOpen}>
        <CModalHeader closeButton>Dish Detail</CModalHeader>
        <CModalBody>
                <View item={viewOpen}/>
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
      </CModal>}
    </CContainer>
  );
};

const mapStateToProps = (state) => ({
  productList: state.product.productList,
  totalPages: state.product.totalPages,
  loading: state.product.product_detail_loading,
  categoryList: state.category.categoryList,
  // totalPages: state.category.totalPages,
  // loading : state.category.category_detail_loading

});

const mapDispatchToProps = {
  getProductList,
  deleteProductById,
  getProductById,
  getCategoryList
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
