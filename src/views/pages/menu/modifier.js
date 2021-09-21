import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CPagination,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getModifierList, deleteModifierById } from "../../../actions/modifier";
import AddModifier from "./AddModifier";
import menuIcon from "./images/menu.svg";
import editIcon from "./images/edit.svg";
import crossIcon from "./images/cross.svg";
import "./style/modifier.scss"
const Modifier = (props) => {
  const [viewOpen, setView] = useState(false);
  const [activeId, setActievId] = useState("");
  const [modifiers, setModifiers] = useState([]);
  const [openHandleItem , setHandleItm] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.getModifierList({ page: page, limit: 12 });
  }, [props.getModifierList, page]);

  useEffect(() => {
    setModifiers(props.modifierList);
    setHandleItm(false);
  }, [props.modifierList]);

  const handleDelete = (id) => {
    props.deleteModifierById(id);
  };

  const handleEdit = (id) => {
    setView(true);
    setActievId(id);
    setView(false);
  };

  console.log(props);
  return (
    <div class="row">
      <div class="col-12">
        <div class="row menu-display-container bg-white mt-4">
          <div class="col-12">
            <div class="row menu-display-header pt-3">
              <div class="col-3 text-center menu-display-heading py-4 px-4">
                Name
              </div>
              <div class="col-3 text-center menu-display-heading py-4 px-4">
                Items
              </div>
              <div class="col-6 menu-display-buttons-container">
                <div class="row py-4">
                  <div class="col-7"></div>
                  <div class="col-4 d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActievId("");
                        setView(true);
                      }}
                      class="btn menu-display-btn menu-display-btn-category"
                    >
                      Add Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {modifiers &&
              modifiers.map((itm) => (
                <div class="row item-row py-4 align-items-center px-0">
                  <div class="col-3 item-name-col-1 text-center">
                    {itm.name}
                  </div>
                  <div class="col-5 text-left item-name-col">
                    {itm.modifiers &&
                      itm.modifiers.length &&
                      itm.modifiers.map((it) => it.name).join(", ")}
                  </div>
                  <div class="col-1"></div>
                  <div class="col-3 item-btns-col">
                    <div class="row align-items-center justify-content-center">
                      <div class="col-6 d-flex justify-content-end item-dropdown-container">
                        <img src={menuIcon} alt="" class="menu-icon" onClick={() => setHandleItm(openHandleItem == itm.id ? false : itm.id)} />
                        <div class={`item-dropdown py-3 px-3 ${openHandleItem == itm.id? "" : "d-none"}`}>
                          <div class="row item-dropdown-row py-2">
                            <div class="col-3" style={{cursor: "pointer"}} onClick={() => handleEdit(itm.id)}>
                              <img
                                src={editIcon}
                                alt=""
                                class="item-dropdown-icon"
                              />
                            </div>
                            <div
                              
                              class="col-8 item-dropdown-text px-0"
                              
                            >
                              Edit Modifier
                            </div>
                          </div>
                          <div class="row item-dropdown-row py-2">
                            <div class="row item-dropdown-row">
                              <div
                              style={{cursor: "pointer"}}
                              class="col-3"
                                onClick={() => handleDelete(itm.id)}
                              >
                                <img
                                  src={crossIcon}
                                  alt=""
                                  class="item-dropdown-icon"
                                />
                              </div>
                              <div class="col-8 item-dropdown-text px-1">
                                Delete Modifier
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={props.totalPages}
                    onActivePageChange={(i) => setPage(i)}
                  ></CPagination>
              </div>
          </div>
        </div>
      </div>

      {viewOpen && (
        <CModal show={viewOpen} className="modif" onClose={setView}>
          <CModalHeader closeButton><div class="col py-3 px-4 modifier-group-header">
            Add Modifier Group
          </div></CModalHeader>
          <CModalBody>
            <AddModifier id={activeId} />
          </CModalBody>
        </CModal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  modifierList: state.modifier.modifierList,
  totalPages: state.modifier.totalPages,
  loading: state.modifier.modifier_detail_loading,
});

const mapDispatchToProps = {
  getModifierList,
  deleteModifierById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modifier);
