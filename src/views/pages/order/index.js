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
import { t } from "src/utils/language";

const statusObj = {
  "Pending" : {current: "Accept", next : "Accepted" , class: "item-view-btn-accept"},
  "Accepted" : {current: "Accepted", next : "Complete" , class: "item-view-btn-preparing"},
  "Complete" : {current: "Complete", next : "" , class: "item-view-btn-serving"},
  "Cancelled" : {current: "Cancelled", next : "" , class: "item-view-btn-cancelled"}
}

const OrderList = (props) => {
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [showOrderDetail , setShowOrderDetail] = useState(false);
  const [actievMenu , setActiveMenu] = useState(false);
  useEffect(() => {
    let userDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).user: {};
    let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
    
      if(!(userDetail.status && restaurantDetail && restaurantDetail.status)){
        if(!restaurantDetail?.id){
          window.location.href = '/';
          return;
        }
        window.location.href = '/#/profile?id='+restaurantDetail.id;
      }
}, [])

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
          <div className="col-6 menu-heading">{t("Orders")}</div>
        </div>

        <div className="row menu-display-container bg-white mt-4">
          <div className="table-responsive">
            <table className="table table-borderless">
              <tr className="menu-display-header pt-3">
                <th className="col-1 text-center menu-display-heading py-4">
                  {("Date/Time")}
                </th>
                <th className="col-1 text-right menu-display-heading py-4">
                  {t("Type")}
                </th>
                <th className="col-2 text-center menu-display-heading py-4">
                  {t("Order Number")}
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  {("Table No")}
                </th>
                <th className="col-2 text-center menu-display-heading py-4">
                  {t("Payment Type")}
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  {t("Status")}
                </th>
                <th className="col-1 text-center menu-display-heading py-4">
                  {t("Pay")}
                </th>
                <th className="col-1 text-center menu-display-heading py-4">{t("Details")}</th>
                <th className="col-1 text-center menu-display-heading py-4">{t("Status")}</th>
                <th></th>
              </tr>
            {orderList &&
              orderList.length &&
              orderList.map((itm) => (
                <tr className="item-row py-4 align-items-center px-0">
                  <td className="col-1 text-center test py-4">
                     {moment(itm.createdAt).format("DD/MM/YYYY")} {moment(itm.createdAt).format("HH:mm")}
                  </td>
                  <td className="col-1 text-right test py-4">{t(itm.orderType)}</td>
                  <td className="col-2 text-center test py-4">{itm.orderNo}</td>
                  <td className="col-1 text-center test py-4">{itm.tableNo || "NA"}</td>
                  <td className="col-2 text-center test py-4">{itm.paymentType}</td>
                  <td className="col-1 text-center test py-4">{itm.paymentStatus}</td>
                  <td className="col-1 text-center test py-4">SR {itm.totalAmount}</td>
                  <td className="col-1">
                    <button
                      type="button"
                      className="btn item-view-btn item-view-btn-details"
                      onClick={() =>setShowOrderDetail(itm)}
                    >
                      {t("Details")}
                    </button>
                  </td>
                  <td className="col-1 px-4">
                    {props.updatingOrder == itm.id ? <CSpinner /> : <button
                      type="button"
                      onClick={() => handleStatusChange(itm.id , statusObj[itm.status])}
                      className={`btn item-view-btn ${statusObj[itm.status]?.class}`}
                    >
                      {t(statusObj[itm.status]?.current)}
                    </button>}
                  </td>

                  <td className="col-1 item-btns-col">
                    {itm.status == "Pending" && <div className="row align-items-center justify-content-center">
                      <div className="col-6 d-flex justify-content-end item-dropdown-container">
                        <img src={menu} alt="" className="menu-icon" onClick={() => setActiveMenu(actievMenu == itm.id ? false : itm.id)} />
                        {(actievMenu == itm.id) && <> <div className="item-dropdown py-3 px-3">
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
                                {t("Cancel Order")}
                              </div>
                            </div>
                          </div>
                          
                        </div>
                        <div class="custom-overlay" id="custom-overlay" onClick={() => setActiveMenu(false)}></div></>}

                        
                      </div>
                    </div>}
                  </td>
                </tr>
              ))}
              </table>
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
