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
  updateProductById
} from "src/actions/product";
import { connect } from "react-redux";
import { BASE_URL } from "src/API/config";
import Add from "./Add";
import View from "./View";
import { getCategoryList , deleteCategoryById, updateCategoryById} from "src/actions/category";
import CategoryForm from "../category/categoryForm";
import menuIcon from "./images/menu.svg";
import editIcon from "./images/edit.svg";
import crossIcon from "./images/cross.svg";
import ConfirmPopup from "src/views/components/confirmPopup";
import { t } from "src/utils/language";
import DragAndDrop from "./DragAndDrop";
import DragAndDropDesktop from "./dragAndDropDesktop";

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
  const [confirmWindow, setConfirmWindow] = useState("");
  useEffect(() => {
    setCurrentMenu(props.currentMenu);
  }, [props.currentMenu])
  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id && category) {
      console.log("dfvndfj kjhkj");
      props.getProductList({ 
        restaurant: restaurantDetail.id,
        menu: currentMenu.id,
        category: category 
      });
    }
  }, [props.getProductList, category]);

  useEffect(() => {
    props.getCategoryList({
      menu : currentMenu.id
    });
  }, [props.getCategoryList]);
  
  useEffect(() => {
    setHandleCategory(false);
    setCategory(props.categoryList);
    setActiveCategory(props.categoryList && props.categoryList[0] ? props.categoryList[0].id : '');
    localStorage.setItem("activeCategory", props.categoryList && props.categoryList[0] ? props.categoryList[0].id : '')
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
    localStorage.setItem("activeCategory", itm.id);
    props.getProductList({menu: currentMenu.id, category: itm.id, page: 1 });
  };

  const handlePaginationChange = (page) => {
    setPage(page);

    props.getProductList({ menu: currentMenu.id,category: category, page: page });
  };

  const handleDeleteCb = (id) => {
    setHandleCategory(false);
    setConfirmWindow("");
    props.deleteCategoryById(id);
  };

  const handleDelete = (id , type) => {
    if(type === "category"){
      setConfirmWindow({msg: "Do you want to delete, it will delete all related product to this category ?", id: id});
     setHandleCategory(false);
    return;
      // var retVal = window.confirm();
      
      // if( retVal == true ) {
      //   return;
      // } else {
      //   return false;
      // }
    }

    props.deleteProductById(id);
  };

  const handleDragAndDrop = (newItem) => {
    console.log(newItem)
    let h = [];  
    newItem.map((itm,index) => h.push({...itm , sort:index}))
    props.updateCategoryById(category , { categoryList: h})
    // setCategory(h)
    // setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: newItem }));
  }

  const handleProductDragDrop = (newItem) => {
    console.log(newItem)
    let h = [];  
    newItem.map((itm,index) => h.push({...itm , sort:index}))
    props.updateProductById(category, {productList: JSON.stringify(h)})
    // setCategory(h)
    // setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: newItem }));
  }

  const handleEdit = (id, type) => {
    if(type === "category"){
      openCategoryAddPopup(id);
      setHandleCategory(false);
      setSelectedCategory(id)
      return;
    }
    setHandleItm(false);
    openDishAddPopup(true);
    setActievId(id);
  };

  const mobileCheck = () => {
    return  navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    // let check = false;
    // (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    // return check;
  }

  console.log(categoryList)
  const renderCategory = (item) => {
    return item.map((itm, index) => (
        <div class="row" style={{touchAction: "none"}}>
          <div id={index+""} onClick={() => handleCategoryClick(itm)} class={` col-10 category-tab py-1 mb-4 px-0 ${category === itm.id ? "category-tab-active" : ""}`}>
            {localStorage.getItem("language") == "ar" ? itm.nameAr : itm.name}
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
                      {t("Delete")}
                    </div>
                  </div>
                </div>
              </div>
             </div>
             <div class="custom-overlay" id="custom-overlay" onClick={() => setHandleCategory(false)}></div>
             </>
             } 
        </div>
      ))
  }

  const renderProduct = (item) => {
    return item.map((itm) => (
        <div class="row item-row py-4 px-4 align-items-center" style={{touchAction: "none"}}>
        <div class="col-2 item-img-col">
          <img src={BASE_URL + itm.imageUrl} width="50" height="50" alt="" class="cat-item-img item-img" />
        </div>
        <div class="col-3 item-name-col">{localStorage.getItem("language") == "ar" ? itm.titleAr : itm.title}</div>
        <div class="col-7 col-md-5 col-lg-7 item-btns-col">
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
                      {t("Delete Item")}
                    </div>
                  </div>
                </div>
              </div>
              <div class="custom-overlay" id="custom-overlay" onClick={() => setHandleItm(false)}></div></>}
            </div>
          </div>
        </div>
      </div>       
      ))
  }
  return (
    <>
      <div class="row menu-display-container bg-white mt-4">
        {confirmWindow?.msg && <ConfirmPopup data={confirmWindow} handleSuccess={handleDeleteCb} onClose={setConfirmWindow} />}
        <div class="col-md-6 col-xl-4 categories-sidebar-container px-5 py-3">
          <div class="row">
            <div class="category-tab-heading py-4 px-0 mb-4">{t("Categories")}</div>
          </div>
          {(categoryList &&
            categoryList.length > 0) && mobileCheck() ? <DragAndDrop clickable={true} htmlContent={renderCategory(categoryList)} items={categoryList}  handleChange={handleDragAndDrop}/> : <DragAndDropDesktop htmlContent={renderCategory(categoryList)} items={categoryList}  handleChange={handleDragAndDrop}/>
          }
          
        </div>
        <div class="col-md-6 col-xl-8">
          <div class="row menu-display-header pt-3">
            <div class="col-12 col-xl-4 menu-display-heading py-4 px-4">Items {currentMenu?.name ? `(${currentMenu.name})` : ""}</div>
            <div class="col-12 col-xl-8 menu-display-buttons-container">
              <div class="row py-4">
                <div class="col-12 d-flex add-cat-btn justify-content-end">
                  <button
                    type="button"
                    class="btn menu-display-btn menu-display-btn-category"
                    onClick={() => {openCategoryAddPopup(true); setSelectedCategory('') }}
                  >
                    {t("Add Category")}
                  </button>
                  <button type="button" class="btn menu-display-btn mx-4" onClick={() => {setActievId(''); openDishAddPopup(true); }}>
                    {t("Add Item")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {!props.loading ? (activeProduct &&
                activeProduct.length ?
                mobileCheck() ? <DragAndDrop htmlContent={renderProduct(activeProduct)} items={activeProduct}  handleChange={handleProductDragDrop}/> : <DragAndDropDesktop htmlContent={renderProduct(activeProduct)} items={activeProduct}  handleChange={handleProductDragDrop}/>
                : <>{t("No dish available")}</>) : <div style={{textAlign: "center" , marginTop : "25px"}}><CSpinner /> </div>}
              {/* <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={props.totalPages || 0}
                    onActivePageChange={(i) => handlePaginationChange(i)}
                  ></CPagination>
              </div> */}
        </div>
        {addDishPopup && (
          <CModal show={addDishPopup} className="temp" onClose={openDishAddPopup}>
            <CModalHeader closeButton>
            <div class="col add-dish-header">
                {t("Add Dish")}
            </div>
            </CModalHeader>
            <CModalBody>
              <Add categoryList={categoryList} id={activeId} category={category} />
            </CModalBody>
            <CModalFooter></CModalFooter>
          </CModal>
        )}
        {addCategoryPopup && (
          <CModal show={addCategoryPopup} onClose={openCategoryAddPopup}>
            <CModalHeader closeButton>{t("Add Category")}</CModalHeader>
            <CModalBody>
              <CategoryForm id={selectedCategory}/>
            </CModalBody>
            <CModalFooter></CModalFooter>
          </CModal>
        )}

        {viewOpen && (
          <CModal show={viewOpen} onClose={setViewOpen}>
            <CModalHeader closeButton>{t("Dish Detail")}</CModalHeader>
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
  deleteCategoryById,
  updateCategoryById,
  updateProductById
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
