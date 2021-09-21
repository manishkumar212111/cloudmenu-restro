const initialState = {
  userDetail: [],
  user_detail_loading: true,
  users: [],
  totalPages: 1,
  orderList: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "ORDER_LIST":
      return { ...state, orderList: data.results, totalPages: data.totalPages };
    case "SINGLE_ORDER_DETAIL":
      return { ...state, orderDetail: data, order_detail_loading: false };

    case "ORDER_DETAIL_LOADING":
      return { ...state, order_detail_loading: data };
    case "PAGE_LOADING":
      return { ...state, loading: true };
    case "REMOVE_LOADING":
      return { ...state, loading: false };
    case "ORDER_UPDATE_SUCCESS":
      let h = [];
      console.log(data, "in reducer");
      
      return {
        ...state,
        orderList: state.orderList.map((itm) => (itm.id == data.id ? data : itm) )
      };
    case "UPDATING_ORDER":
      return { ...state, updatingOrder: data };

    default:
      return state;
  }
}
