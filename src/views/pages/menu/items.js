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
  CRow,
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
const Items = (props) => {
  const [item, setItem] = useState([]);
  const [activeProduct, setActiveProduct] = useState([]);
  const [addDishPopup, openDishAddPopup] = useState(false);
  const [activeId , setActievId] = useState("");
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
    setItem(props.productList);
    !(activeProduct && activeProduct.length) && setActiveProduct(props.productList[0]?.details);
  }, [props.productList]);
  console.log(item);

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

            {item &&
              item.length &&
              item.map((itm) => (
                <CListGroupItem onClick={() => setActiveProduct(itm.details)}>
                  {itm._id[0].name}
                </CListGroupItem>
              ))}
          </CListGroup>
        </CCol>
        <CCol md="8">
          <CListGroup>
            <CListGroupItem>
              Items{" "}
              <button onClick={() => {setActievId(''); openDishAddPopup(true); }}>Add Dish</button>
            </CListGroupItem>

            {activeProduct &&
              activeProduct.length &&
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
              ))}
          </CListGroup>
        </CCol>
      </CRow>
      {addDishPopup && <CModal show={addDishPopup} onClose={openDishAddPopup}>
        <CModalHeader closeButton>Add Dish</CModalHeader>
        <CModalBody>
                <Add id={activeId}/>
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
});

const mapDispatchToProps = {
  getProductList,
  deleteProductById,
  getProductById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
