
const initialState = {
    menuDetail: [],
    menu_detail_loading : false,
    users: [],
    totalPages : 1,
    menuList : []
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case "MENU_LIST":
          return {...state, menuList :  data.results, totalPages : data.totalPages};
        case 'SINGLE_MENU_DETAIL' :
          return {...state , menuDetail : data , menu_detail_loading : false};
  
        case "MENU_DETAIL_LOADING":
          return {...state, menu_detail_loading : data};
        case "PAGE_LOADING":
          return {...state, loading : true};
        case "REMOVE_LOADING":
          return {...state, loading : false };
        default: return state;
    }
  }
  