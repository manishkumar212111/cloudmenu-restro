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
import { getCategoryList , deleteCategoryById} from "src/actions/category";
import CategoryForm from "../category/categoryForm";
import menuIcon from "./images/menu.svg";
import editIcon from "./images/edit.svg";
import crossIcon from "./images/cross.svg";

const Items = (props) => {
  const [item, setItem] = useState([]);
  const [activeProduct, setActiveProduct] = useState([]);
  const [categoryList, setCategory] = useState([]);
  const [category, setActiveCategory] = useState("");
  const [addDishPopup, openDishAddPopup] = useState(false);
  const [addCategoryPopup, openCategoryAddPopup] = useState(false);
  const [activeId, setActievId] = useState("");
  const [page, setPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [openHandleItem , setHandleItm] = useState();
  const [openHandleCategory , setHandleCategory] = useState();
  const [currentMenu , setCurrentMenu] = useState(props.currentMenu);
  const [selectedCategory , setSelectedCategory] = useState('');
  useEffect(() => {
    setCurrentMenu(props.currentMenu);
  }, [props.currentMenu])
  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id) {
      console.log("dfvndfj kjhkj");
      props.getProductList({ restaurant: restaurantDetail.id, menu: currentMenu.id });
    }
  }, [props.getProductList]);

  useEffect(() => {
    props.getCategoryList({
      menu : currentMenu.id
    });
  }, [props.getCategoryList]);
  
  useEffect(() => {
    setHandleCategory(false);
    setCategory(props.categoryList);
    openCategoryAddPopup(false);
  }, [props.categoryList]);

  useEffect(() => {
    setItem(props.productList);
    setActiveProduct(props.productList);
    setHandleItm(false);
    setHandleCategory(false);
    openDishAddPopup(false);
    setHandleItm(false);
  }, [props.productList]);

  console.log(props, activeProduct);

  const handleCategoryClick = (itm) => {
    setPage(1);
    setActiveCategory(itm.id);
    props.getProductList({menu: currentMenu.id, category: itm.id, page: 1 });
  };

  const handlePaginationChange = (page) => {
    setPage(page);

    props.getProductList({ menu: currentMenu.id,category: category, page: page });
  };
  const handleDelete = (id , type) => {
    if(type === "category"){
      var retVal = window.confirm("Do you want to delete, it will delete all related product to this category ?");
      if( retVal == true ) {
        setHandleCategory(false);
        props.deleteCategoryById(id);
        return;
      } else {
        return false;
      }
    }

    props.deleteProductById(id);
  };
  const handleEdit = (id, type) => {
    if(type === "category"){
      openCategoryAddPopup(id);
      setHandleCategory(false);
      setSelectedCategory(id)
      return;
    }
    
    openDishAddPopup(true);
    setActievId(id);
  };
  return (
    <>
      <div class="row menu-display-container bg-white mt-4">
        <div class="col-md-6 col-xl-3 categories-sidebar-container px-5 py-3">
          <div class="row">
            <div class="category-tab-heading py-4 px-0 mb-4">Categories</div>
          </div>
          {(categoryList &&
                categoryList.length > 0) &&
                categoryList.map((itm) => (
                  <div class="row" >
                    <div onClick={() => handleCategoryClick(itm)} class={` col-10 category-tab py-1 mb-4 px-0 ${category === itm.id ? "category-tab-active" : ""}`}>
                      {itm.name}
                      </div>
                    <div class="col-2">
                    <img style={{cursor:"pointer"}} onClick={() => setHandleCategory(openHandleCategory == itm.id ? false : itm.id)} src={menuIcon} alt="" style={{cursor: "pointer"}} class="menu-icon" />
                    </div>
                    {openHandleCategory && <><div class="col-6 d-flex temp  justify-content-end item-dropdown-container">
                         <div class={`item-dropdownCategory py-3 px-3 ${openHandleCategory == itm.id? "" : "d-none"}`}>
                          <div class="row item-dropdown-row py-2" style={{cursor: "pointer"}} onClick={() => handleEdit(itm.id, "category")}>
                            <div class="col-3" >
                              <img
                                src={editIcon}
                                alt=""
                                class="item-dropdown-icon"
                              />
                            </div>
                            <div style={{cursor:"pointer"}}  class="col-8 item-dropdown-text px-0">Edit</div>
                          </div>
                          <div class="row item-dropdown-row py-2">
                            <div class="row item-dropdown-row" style={{cursor: "pointer"}} onClick={() => handleDelete(itm.id, "category")}>
                              <div class="col-3" >
                                <img
                                  src={crossIcon}
                                  alt=""
                                  class="item-dropdown-icon"
                                />
                              </div>
                              <div style={{cursor:"pointer"}} class="col-8 item-dropdown-text px-1">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                       </div>
                       <div class="custom-overlay" id="custom-overlay" onClick={() => setHandleCategory(false)}></div>
                       </>
                       } 
                  </div>
                ))}
        </div>
        <div class="col-md-6 col-xl-9">
          <div class="row menu-display-header pt-3">
            <div class="col-12 col-xl-4 menu-display-heading py-4 px-4">Items</div>
            <div class="col-12 col-xl-8 menu-display-buttons-container">
              <div class="row py-4">
                <div class="col-12 d-flex add-cat-btn justify-content-end">
                  <button
                    type="button"
                    class="btn menu-display-btn menu-display-btn-category"
                    onClick={() => {openCategoryAddPopup(true); setSelectedCategory('') }}
                  >
                    Add Category
                  </button>
                  <button type="button" class="btn menu-display-btn mx-4" onClick={() => {setActievId(''); openDishAddPopup(true); }}>
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {!props.loading ? (activeProduct &&
                activeProduct.length ?
                activeProduct.map((itm) => (
                  <div class="row item-row py-4 px-4 align-items-center">
                  <div class="col-2 item-img-col">
                    <img src={BASE_URL + itm.imageUrl} width="50" height="50" alt="" class="item-img" />
                  </div>
                  <div class="col-3 item-name-col">{itm.title}</div>
                  <div class="col-3 item-btns-col">
                    <div class="row align-items-center justify-content-end">
                      <div class="col-3"></div>
                      <div class="col-3">
                        {/* <button type="button" onClick={() => setViewOpen(itm)} class="btn item-view-btn">
                          view
                        </button> */}
                      </div>
                      <div class="col-6 d-flex temp  justify-content-end item-dropdown-container">
                        <img onClick={() => setHandleItm(openHandleItem == itm.id ? false : itm.id)} src={menuIcon} alt="" style={{cursor: "pointer"}} class="menu-icon" />
                        {openHandleItem && <><div class={`item-dropdown py-3 px-3 ${openHandleItem == itm.id? "" : "d-none"}`}>
                          <div class="row item-dropdown-row py-2"  style={{cursor: "pointer"}} onClick={() => handleEdit(itm.id)}>
                            <div class="col-3" >
                              <img
                                src={editIcon}
                                alt=""
                                class="item-dropdown-icon"
                              />
                            </div>
                            <div class="col-8 item-dropdown-text px-0">Edit Item</div>
                          </div>
                          <div class="row item-dropdown-row py-2">
                            <div class="row item-dropdown-row" style={{cursor: "pointer"}} onClick={() => handleDelete(itm.id)}>
                              <div class="col-3" >
                                <img
                                  src={crossIcon}
                                  alt=""
                                  class="item-dropdown-icon"
                                />
                              </div>
                              <div class="col-8 item-dropdown-text px-1">
                                Delete Item
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="custom-overlay" id="custom-overlay" onClick={() => setHandleItm(false)}></div></>}
                      </div>
                    </div>
                  </div>
                </div>       
                )) : <>No dish available</>) : <div style={{textAlign: "center" , marginTop : "25px"}}><CSpinner /> </div>}
              <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={props.totalPages || 0}
                    onActivePageChange={(i) => handlePaginationChange(i)}
                  ></CPagination>
              </div>
        </div>
        {addDishPopup && (
          <CModal show={addDishPopup} className="temp" onClose={openDishAddPopup}>
            <CModalHeader closeButton>
            <div class="col add-dish-header">
                Add Dish
            </div>
            </CModalHeader>
            <CModalBody>
              <Add id={activeId} />
            </CModalBody>
            <CModalFooter></CModalFooter>
          </CModal>
        )}
        {addCategoryPopup && (
          <CModal show={addCategoryPopup} onClose={openCategoryAddPopup}>
            <CModalHeader closeButton>Add Category</CModalHeader>
            <CModalBody>
              <CategoryForm id={selectedCategory}/>
            </CModalBody>
            <CModalFooter></CModalFooter>
          </CModal>
        )}

        {viewOpen && (
          <CModal show={viewOpen} onClose={setViewOpen}>
            <CModalHeader closeButton>Dish Detail</CModalHeader>
            <CModalBody>
              <View item={viewOpen} />
            </CModalBody>
            <CModalFooter></CModalFooter>
          </CModal>
        )}
      </div>
    </>

  );
};

const mapStateToProps = (state) => ({
  productList: state.product.productList,
  totalPages: state.product.totalPages,
  loading: state.product.product_detail_loading,
  categoryList: state.category.categoryList,
});

const mapDispatchToProps = {
  getProductList,
  deleteProductById,
  getProductById,
  getCategoryList,
  deleteCategoryById
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
