import React, { useEffect, useState } from "react";
import "./style/menu.scss";
import Add from "./images/add.svg";
import { connect } from "react-redux";
import { getMenuById, deleteMenuById,getMenuList,activateMenu } from "src/actions/menu";
import { CModal, CModalBody, CModalHeader, CSpinner } from "@coreui/react";
import AddMenu from "./addMenu";

const Menu = (props) => {
    const [addOpen , setAddOpen] = useState(false);

    useEffect(() => {
        props.getMenuList()
    }, [props.getMenuList])

    const activateMenuClick = (itm) => {
      props.activateMenu(itm.id);
    };
    
  if(props.loading){
      return <div style={{textAlign: "center" , marginTop : "25px"}}><CSpinner /> </div>
  }  
  return (
    <div class="row menu-display-container bg-white mt-4 px-5 py-5">
      {
          props.menuList && props.menuList.map(itm => (
            <div class="col-3 add-menu-button p-4" style={{cursor: "pointer"}}>
            <div class="row justify-content-center align-items-center" onClick={() => props.handleMenuClick(itm)}>
              <img src={itm.bannerImage} style={{width: 264}} alt="" class="add-menu-icon" />
            </div>
            <div class="row add-menu-text mt-4 text-center justify-content-center">
              {itm.name} {itm.restaurant.menu == itm.id ? <span style={{color: "green"}}>(Active)</span> : <span onClick={() => activateMenuClick(itm)} style={{color: "blue"}}>(Activate)</span>}
            </div>
          </div>
          ))
      }
      <div class="col-3 add-menu-button p-4" style={{cursor: "pointer"}} onClick={() => setAddOpen(true)}>
        <div class="row add-menu-bg justify-content-center align-items-center">
          <img src={Add} alt="" style={{width: 150}} class="add-menu-icon" />
        </div>
        <div class="row add-menu-text mt-4 text-center justify-content-center">
          Add Menu
        </div>
      </div>
      {addOpen && (
          <CModal show={addOpen} onClose={setAddOpen}>
            <CModalHeader closeButton><div class="col add-dish-header">
            Add Menu
            </div></CModalHeader>
            <CModalBody>
                <AddMenu />
            </CModalBody>
          </CModal>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
    menuList: state.menu.menuList,
    totalPages: state.menu.totalPages,
    loading: state.menu.menu_detail_loading
});
  
const mapDispatchToProps = {
    getMenuList,
    deleteMenuById,
    getMenuById,
    activateMenu
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
  
