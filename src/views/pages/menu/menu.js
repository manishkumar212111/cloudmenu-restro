import React, { useEffect, useState } from "react";
import "./style/menu.scss";
import Add from "./images/add.svg";
import { connect } from "react-redux";
import {
  getMenuById,
  deleteMenuById,
  getMenuList,
  activateMenu,
  updateMenuById
} from "src/actions/menu";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CSpinner,
  CSwitch,
} from "@coreui/react";
import AddMenu from "./addMenu";
import SettingIcon from "./images/settings.svg";
import Setting from "./setting";

const Menu = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [openSetting , setSetting] = useState(false);
  useEffect(() => {
    props.getMenuList();
  }, [props.getMenuList]);
  
  useEffect(() => {
    setAddOpen(false);
    setSetting(false)
  }, [props.menuList]);

  const activateMenuClick = (itm) => {
    props.activateMenu(itm.id);
  };

  const handleSettingCb = (setting) => {
    props.updateMenuById(openSetting.id, {settings: JSON.stringify(setting)})
  }

  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <CSpinner />{" "}
      </div>
    );
  }
  return (
    <div class="row menu-display-container bg-white mt-4 px-5 py-5">
      {props.menuList &&
        props.menuList.map((itm) => (
          <div class="col-3 add-menu-button p-4" style={{ cursor: "pointer" }}>
            <div
              class="row justify-content-center align-items-center"
              onClick={() => props.handleMenuClick(itm)}
            >
              <img
                src={itm.bannerImage}
                style={{ width: 264 }}
                alt=""
                class="add-menu-icon"
              />
            </div>
            <div class="row add-menu-text mt-4 text-center justify-content-center">
              {itm.name}

              <CSwitch
                style={{ width: 65 }}
                color="success"
                shape="pill"
                // labelOff="DeActivate"
                // labelOn="Activate"
                checked={itm.restaurant.menu == itm.id}
                onChange={(e) =>
                  e.target.checked == true ? activateMenuClick(itm) : () => {}
                }
              />
              <img
                onClick={() => setSetting(itm)}
                src={SettingIcon}
                style={{ width: "2.8rem" }}
                alt=""
                class="menu-settings-icon"
              />
            </div>
          </div>
        ))}
      <div
        class="col-3 add-menu-button p-4"
        style={{ cursor: "pointer" }}
        onClick={() => setAddOpen(true)}
      >
        <div class="row add-menu-bg justify-content-center align-items-center">
          <img src={Add} alt="" style={{ width: 150 }} class="add-menu-icon" />
        </div>
        <div class="row add-menu-text mt-4 text-center justify-content-center">
          Add Menu
        </div>
      </div>
      {addOpen && (
        <CModal show={addOpen} onClose={setAddOpen}>
          <CModalHeader closeButton>
            <div class="col add-dish-header">Add Menu</div>
          </CModalHeader>
          <CModalBody>
            <AddMenu />
          </CModalBody>
        </CModal>
      )}
      {openSetting && (
          <CModal show={openSetting} onClose={setSetting}>
            <CModalHeader closeButton><div class="col add-dish-header">
            Menu Settings ({openSetting.name})
            </div></CModalHeader>
            <CModalBody>
              <Setting settings={openSetting.settings} submitCb={handleSettingCb}/>
            </CModalBody>
          </CModal>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  menuList: state.menu.menuList,
  totalPages: state.menu.totalPages,
  loading: state.menu.menu_detail_loading,
});

const mapDispatchToProps = {
  getMenuList,
  deleteMenuById,
  getMenuById,
  activateMenu,
  updateMenuById
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
