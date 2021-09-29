import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProductById,
  getProductList,
  deleteProductById,
} from "src/actions/product";
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Items from "./items";
import Modifier from "./modifier";
import Setting from "./setting";
import "./style/index.scss";
import SettingIcon from "./images/settings.svg";
import Menu from "./menu";

const Index = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewOpen, setViewOpen] = useState(false);
  const [restaurant, setRestaurant] = useState("");
  const [activeMenu , setActiveMenu] = useState("");
  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id) {
      setRestaurant(restaurantDetail.id);
      console.log("dfvndfj kjhkj");
      // props.getProductList({restaurant : restaurantDetail.id});
    }
  }, [props.getProductList]);

  const handleMenuClick= (itm) => {
    setActiveMenu(itm);
    setActiveTab(1);
    localStorage.setItem("currentMenu", itm.id)
  } 

  return (
    <div class="row">
      <div class="col-12 px-5">
        <div class="row menu-header">
          <div class="col-6 menu-heading">Menu Management</div>
          {/* <div
            class="col-6 menu-settings-container"
            onClick={() => setViewOpen(true)}
          >
            <img src={SettingIcon} alt="" class="menu-settings-icon" />
          </div> */}
        </div>
        <div class="row menu-tabs-container">
          <div
            class="col-3 d-flex justify-content-end"
            onClick={() => setActiveTab(0)}
          >
            <div
              class={`menu-tab py-2 ${activeTab == 0 ? "menu-tab-active" : ""}`}
            >
              Menus
            </div>
          </div>
          <div
            class="col-3 d-flex justify-content-center text-center"
            // onClick={() => setActiveTab(1)}
          >
            <div
              class={`menu-tab py-2 ${activeTab == 1 ? "menu-tab-active" : ""}`}
            >
              Categories and items
            </div>
          </div>
          <div
            class="col-3 d-flex justify-content-start text-left"
            onClick={() => setActiveTab(2)}
          >
            <div
              class={`menu-tab py-2 ${activeTab == 2 ? "menu-tab-active" : ""}`}
            >
              Modifiers
            </div>
          </div>
        </div>

             {activeTab == 1 && 
                     <Items currentMenu={activeMenu} />
                 }
                 {activeTab == 2 && 
                     <Modifier />
                 }
                 {activeTab == 0 && 
                    <Menu handleMenuClick = {handleMenuClick}/>
                 }
        {viewOpen && (
          <CModal show={viewOpen} onClose={setViewOpen}>
            <CModalHeader closeButton><div class="col add-dish-header">
            Menu Settings
            </div></CModalHeader>
            <CModalBody>
              <Setting id={restaurant} />
            </CModalBody>
          </CModal>
        )}
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);

{
  /* // <CContainer>
            //     <h3>Menu Management</h3>
            //     <div style={{float: "right"}} onClick={() => setViewOpen(true)}>Settings</div>
            //     <CRow>
            //         <CListGroup style={{flexDirection : "row", cursor: "pointer"}}>
            //             <CListGroupItem onClick={() => setActiveTab(0)}>
            //                  Menus
            //             </CListGroupItem>
            //             <CListGroupItem onClick={() => setActiveTab(1)}>
            //                 Categories and items
            //             </CListGroupItem>
            //             <CListGroupItem onClick={() => setActiveTab(2)}>
            //                 Modifiers
            //             </CListGroupItem>
            //         </CListGroup>
            //     </CRow>
            //     {activeTab == 1 && <CRow>
            //         <Items />
            //     </CRow>}
            //     {activeTab == 2 && <CRow>
            //         <Modifier />
            //     </CRow>}
            //     {activeTab == 0 && <CRow>

            //     </CRow>}


            // {viewOpen && <CModal show={viewOpen} onClose={setViewOpen}>
            //     <CModalHeader closeButton>Menu Settings</CModalHeader>
            //     <CModalBody>
            //             <Setting id={restaurant}/>
            //     </CModalBody>
            // </CModal>}
            // </CContainer> */
}
