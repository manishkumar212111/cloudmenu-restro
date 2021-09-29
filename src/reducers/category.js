
const initialState = {
    userDetail: [],
    user_detail_loading : true,
    users: [],
    totalPages : 1,
    categoryList : []
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case "CATEGORY_LIST":
          return {...state, categoryList :  data.results, totalPages : data.totalPages};
        case 'SINGLE_CATEGORY_DETAIL' :
          return {...state , categoryDetail : data , category_detail_loading : false};
  
        case "CATEGORY_DETAIL_LOADING":
          return {...state, category_detail_loading : data};
        case "PAGE_LOADING":
          return {...state, loading : true};
        case "REMOVE_LOADING":
          return {...state, loading : false };
        default: return state;
    }
  }
  