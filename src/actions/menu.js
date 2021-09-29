import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getMenuList =
  (options = {}) =>
  async (dispatch) => {
    try {
      let restaurantDetail =
        localStorage.getItem("userDetail") &&
        JSON.parse(localStorage.getItem("userDetail"))
          ? JSON.parse(localStorage.getItem("userDetail")).restaurant
          : {};
      options.restaurant = restaurantDetail.id;
      options.limit = 500;
      dispatch({
        type: "MENU_DETAIL_LOADING",
        data: true,
      });
      console.log(options, "sdkkjdsvkjd fhvhdfgjhgj");
      API.get("menuList", options, "", function (res) {
        if (res && res.data) {
          dispatch({ type: "MENU_LIST", data: res.data });
        } else {
          //console.log(res.data.message);
          res && res.data && dispatch(setAlert(res.data.message, "danger"));
        }

        dispatch({
          type: "MENU_DETAIL_LOADING",
          data: false,
        });
      });
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  };

export const deleteMenuById = (id, options) => (dispatch) => {
  try {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: true,
    });
    API.delete("menuList", {}, id, function (res) {
      if (res && res.data) {
        dispatch(setAlert("menu deleted successfully", "success"));
        dispatch(getMenuList());
        // dispatch( { type: "MENU_LIST",
        //   data : res.data
        // });
      } else {
        //console.log(res.data.message);
        res && res.data && dispatch(setAlert(res.data.message, "danger"));
      }

      dispatch({
        type: "MENU_DETAIL_LOADING",
        data: false,
      });
    });
  } catch (err) {
    console.log(err);
    console.log(err);
  }
};

export const createMenu = (data) => (dispatch) => {
  try {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: true,
    });
    let formData = new FormData();

    Object.keys(data).map((itm) => {
      data[itm] && formData.append(itm, data[itm]);
    });
    API.post("menuList", formData, "", function (res) {
      if (res && res.data && res.data.id) {
        dispatch(setAlert("Menu added", "success"));

        dispatch(getMenuList());
      } else {
        res && res.data && dispatch(setAlert(res.data.message, "danger"));
      }
      dispatch({
        type: "MENU_DETAIL_LOADING",
        data: false,
      });
    });
  } catch (err) {}
};

export const activateMenu = (menuId) => (dispatch) => {
  try {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: true,
    });
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    let formData = new FormData();

    formData.append("menu", menuId);
    API.post(
      "Restaurants",
      formData,
      restaurantDetail.id,
      function (res) {
        if (res && res.data.id) {
          dispatch(getMenuList());
          dispatch(setAlert("Restaurant activated", "success"));
        } else {
          //console.log(res.data.message);
          res && res.data && dispatch(setAlert(res.data.message, "danger"));
        }

        dispatch({
          type: "MENU_DETAIL_LOADING",
          data: false,
        });
      },
      "application/json;multipart/form-data;"
    );
  } catch (err) {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: false,
    });
    console.log(err);
    console.log(err);
  }
};

export const getMenuById = (menuId) => (dispatch) => {
  try {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: true,
    });
    API.get("menuList", {}, menuId, function (res) {
      if (res && res.data) {
        dispatch({ type: "SINGLE_MENU_DETAIL", data: res.data });
      } else {
        //''
        res && res.data && dispatch(setAlert(res.data.message, "danger"));
      }
      dispatch({
        type: "MENU_DETAIL_LOADING",
        data: false,
      });
    });
  } catch (err) {}
};

export const updateMenuById = (menuId, data) => (dispatch) => {
  try {
    dispatch({
      type: "MENU_DETAIL_LOADING",
      data: true,
    });
    console.log(data);
    let formData = new FormData();

    Object.keys(data).map((itm) => {
      data[itm] && formData.append(itm, data[itm]);
      console.log(formData.get(itm));
    });
    API.put(
      "menuList",
      formData,
      menuId,
      function (res) {
        if (res && res.data.id) {
          dispatch(setAlert("Details updated successfully", "success"));
          dispatch(getMenuList());
        } else {
          //''
          res && res.data && dispatch(setAlert(res.data.message, "danger"));
        }
        dispatch({
          type: "MENU_DETAIL_LOADING",
          data: false,
        });
      },
      "application/json;multipart/form-data;"
    );
  } catch (err) {}
};
