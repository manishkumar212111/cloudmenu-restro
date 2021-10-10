import React, { useEffect, useState } from "react";
import "./style/menu.scss";
import Add from "./images/add.svg";
import { connect } from "react-redux";
import {
  getMenuById,
  deleteMenuById,
  getMenuList,
  activateMenu,
  updateMenuById,
} from "src/actions/menu";
import { setAlert } from "src/actions/alert";
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
import menuIcon from "./images/menu.svg";
import crossIcon from "./images/cross.svg";
import ConfirmPopup from "src/views/components/confirmPopup";
import { t } from "src/utils/language";

const Menu = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [openSetting, setSetting] = useState(false);
  const [openMenuAction, setMenuAction] = useState(false);
  const [confirmWindow, setConfirmWindow] = useState("");
  useEffect(() => {
    props.getMenuList();
  }, [props.getMenuList]);

  useEffect(() => {
    setAddOpen(false);
    setSetting(false);
    props.menuList &&
      props.menuList.map((itm) => {
        if (itm.restaurant.menu == itm.id) {
          props.setActiveMenu(itm);
        }
      });
  }, [props.menuList]);

  const activateMenuClick = (itm) => {
    props.activateMenu(itm.id);
  };
  const handleDeleteCb = (id) => {
    setConfirmWindow("");
    setMenuAction(false);
    props.deleteMenuById(id);
  };

  const handleDelete = (id, status) => {
    if(status){
      props.setAlert("Active Menu can not be deleted", "danger")
      return;
    }
    setConfirmWindow({msg: "Do you want to delete, it will delete all related category, product and modifiers of this menu ?", id: id});
    setMenuAction(false);
    
  };

  const handleSettingCb = (setting) => {
    props.updateMenuById(openSetting.id, { settings: JSON.stringify(setting) });
  };

  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <CSpinner />{" "}
      </div>
    );
  }
  return (
    <div class="row menu-display-container bg-white mt-4 px-5 py-5">
      {confirmWindow?.msg && <ConfirmPopup data={confirmWindow} handleSuccess={handleDeleteCb} onClose={setConfirmWindow} />}

      {props.menuList &&
        props.menuList.map((itm) => (
          <div
            class="col-12 col-md-3 add-menu-button p-4"
            style={{ cursor: "pointer" }}
          >
            <div className="add-menu-wrapper">
              <div class="delete-wrapper d-flex temp  justify-content-end item-dropdown-container">
                <img
                  onClick={() =>
                    setMenuAction( openMenuAction == itm.id ? false : itm.id)
                  }
                  src={menuIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  class="menu-icon"
                />
                {openMenuAction && (
                  <>
                    <div
                      class={`item-dropdown py-3 px-3 ${
                        openMenuAction == itm.id ? "" : "d-none"
                      }`}
                    >
                      {/* <div
                        class="row item-dropdown-row py-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(itm.id)}
                      >
                        <div class="col-3">
                          <img src={editIcon} alt="" class="item-dropdown-icon" />
                        </div>
                        <div class="col-8 item-dropdown-text px-0">Edit Item</div>
                      </div> */}
                      <div class="row item-dropdown-row py-2">
                        <div
                          class="row item-dropdown-row"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(itm.id , itm.restaurant.menu == itm.id)}
                        >
                          <div class="col-3">
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
                    <div
                      class="custom-overlay"
                      id="custom-overlay"
                      onClick={() => setMenuAction(false)}
                    ></div>
                  </>
                )}
              </div>

              <div
                class="row justify-content-center align-items-center"
                onClick={() => props.handleMenuClick(itm)}
              >
                <img
                  src={itm.bannerImage}
                  alt=""
                  class="add-menu-icon"
                />
              </div>
            </div>
            <div class="row add-menu-text mt-4 text-center justify-content-center">
              <p>{itm.name}</p>
              <div class="menu-name-setting">
                <CSwitch
                  className={`${
                    itm.restaurant.menu == itm.id ? "active" : "switch-disable"
                  }`}
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
                  alt=""
                  class="menu-settings-icon"
                />
              </div>
            </div>
          </div>
        ))}
      <div
        class="col-12 col-md-3 add-menu-button p-4"
        style={{ cursor: "pointer" }}
        onClick={() => setAddOpen(true)}
      >
        <div class="row add-menu-bg justify-content-center align-items-center">
          <img src={Add} alt="" style={{ width: 150 }} class="add-menu-icon" />
        </div>
        <div class="row add-menu-text mt-4 text-center justify-content-center">
          {t("Add Menu")}
        </div>
      </div>
      {addOpen && (
        <CModal show={addOpen} onClose={setAddOpen}>
          <CModalHeader closeButton>
            <div class="col add-dish-header">{t("Add Menu")}</div>
          </CModalHeader>
          <CModalBody>
            <AddMenu />
          </CModalBody>
        </CModal>
      )}
      {openSetting && (
        <CModal show={openSetting} onClose={setSetting}>
          <CModalHeader closeButton>
            <div class="col add-dish-header">
              {t("Menu Settings")} ({openSetting.name})
            </div>
          </CModalHeader>
          <CModalBody>
            <Setting
              settings={openSetting.settings}
              submitCb={handleSettingCb}
            />
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
  updateMenuById,
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
