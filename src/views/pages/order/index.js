import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { getOrderList, deleteOrderById ,updateOrderById } from "../../../actions/order";
import { connect } from "react-redux";
import { CModal, CModalBody, CModalHeader, CPagination, CSpinner } from "@coreui/react";
import cross from "./images/cross.svg";
import edit from "./images/edit.svg";
import food from "./images/food.png";
import menu from "./images/menu.svg";
import settings from "./images/settings.svg";
import moment from 'moment';
import "./index.scss";
import Detail from "./detail";

const statusObj = {
  "Pending" : {current: "Accept", next : "Preparing" , class: "item-view-btn-accept"},
  "Preparing" : {current: "Preparing", next : "Serving" , class: "item-view-btn-preparing"},
  "Serving" : {current: "Serving", next : "Complete" , class: "item-view-btn-serving"},
  "Complete" : {current: "Complete", next : "" , class: "item-view-btn-complete"},
  "Cancelled" : {current: "Cancelled", next : "" , class: "item-view-btn-cancelled"}
}

const OrderList = (props) => {
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [showOrderDetail , setShowOrderDetail] = useState(false);
  const [actievMenu , setActiveMenu] = useState(false);
  useEffect(() => {
    setOrderList(props.orderList);
    setActiveMenu(false);
  }, [props.orderList]);
  useEffect(() => {
    props.getOrderList();
  }, [props.getOrderList]);

  const handlePaginationChange = (page) => {
    setPage(page);

    props.getOrderList({ page: page });
  };

  const handleStatusChange = (orderId , status) => {
    status.next && props.updateOrderById(orderId , { status: status.next})
  };

  console.log(props);
  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }
  return (
    <div className="row">
      <div className="col-12 px-5">
        <div className="row menu-header">
          <div className="col-6 menu-heading">Orders</div>
        </div>

        <div className="row menu-display-container bg-white mt-4">
          <div className="col-12">
            <div className="row menu-display-header pt-3">
              <div className="col-1 text-center menu-display-heading py-4">
                Date/Time
              </div>
              <div className="col-1 text-right menu-display-heading py-4">
                Type
              </div>
              <div className="col-2 text-center menu-display-heading py-4">
                Order Number
              </div>
              <div className="col-1 text-center menu-display-heading py-4">
                Table No
              </div>
              <div className="col-2 text-center menu-display-heading py-4">
                Payment Type
              </div>
              <div className="col-1 text-center menu-display-heading py-4">
                Status
              </div>
              <div className="col-1 text-center menu-display-heading py-4">
                Pay
              </div>
            </div>
            {orderList &&
              orderList.length &&
              orderList.map((itm) => (
                <div className="row item-row py-4 align-items-center px-0">
                  <div className="col-1 text-center test py-4">
                     {moment(itm.createdAt).format("DD/MM/YYYY")} {moment(itm.createdAt).format("HH:mm")}
                  </div>
                  <div className="col-1 text-right test py-4">{itm.orderType}</div>
                  <div className="col-2 text-center test py-4">{itm.orderNo}</div>
                  <div className="col-1 text-center test py-4">{itm.tableNo || "NA"}</div>
                  <div className="col-2 text-center test py-4">{itm.paymentType}</div>
                  <div className="col-1 text-center test py-4">{itm.paymentStatus}</div>
                  <div className="col-1 text-center test py-4">SR {itm.totalAmount}</div>
                  <div className="col-1">
                    <button
                      type="button"
                      className="btn item-view-btn item-view-btn-details"
                      onClick={() =>setShowOrderDetail(itm)}
                    >
                      Details
                    </button>
                  </div>
                  <div className="col-1 px-4">
                    {props.updatingOrder == itm.id ? <CSpinner /> : <button
                      type="button"
                      onClick={() => handleStatusChange(itm.id , statusObj[itm.status])}
                      className={`btn item-view-btn ${statusObj[itm.status].class}`}
                    >
                      {statusObj[itm.status].current}
                    </button>}
                  </div>

                  <div className="col-1 item-btns-col">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-6 d-flex justify-content-end item-dropdown-container">
                        <img src={menu} alt="" className="menu-icon" onClick={() => setActiveMenu(actievMenu == itm.id ? false : itm.id)} />
                        {(actievMenu == itm.id) && <div className="item-dropdown py-3 px-3">
                          <div className="row item-dropdown-row py-2">
                            <div className="row item-dropdown-row" style={{cursor: "pointer"}} onClick={() => handleStatusChange(itm.id, { next : "Cancelled"})}>
                              <div className="col-3">
                                <img
                                  src={cross}
                                  alt=""
                                  className="item-dropdown-icon"
                                />
                              </div>
                              <div className="col-8 item-dropdown-text px-1">
                                Cancel Order
                              </div>
                            </div>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={props.totalPages}
                    onActivePageChange={(i) => handlePaginationChange(i)}
                  ></CPagination>
              </div>
          </div>
        </div>
      </div>
      {showOrderDetail && (
          <CModal show={showOrderDetail} className="temp" onClose={setShowOrderDetail}>
            <CModalHeader closeButton>
            <div class="col add-dish-header">
               Dish
            </div>
            </CModalHeader>
            <CModalBody>
              {/* <Add id={activeId} /> */}
              <Detail productDetail = {showOrderDetail}/>
            </CModalBody>
          </CModal>
        )}
        
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderList: state.order.orderList,
  totalPages: state.order.totalPages,
  loading: state.order.order_detail_loading,
  updatingOrder: state.order.updatingOrder
});

const mapDispatchToProps = {
  getOrderList,
  deleteOrderById,
  updateOrderById
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
