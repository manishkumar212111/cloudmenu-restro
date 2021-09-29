
const initialState = {
    userDetail: [],
    user_detail_loading : true,
    users: [],
    totalPages : 1,
    modifierList : []
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case "MODIFIER_LIST":
          return {...state, modifierList :  data.results, totalPages : data.totalPages};
        case 'SINGLE_MODIFIER_DETAIL' :
          return {...state , modifierDetail : data , modifier_detail_loading : false};
  
        case "MODIFIER_DETAIL_LOADING":
          return {...state, modifier_detail_loading : data};
        case "PAGE_LOADING":
          return {...state, loading : true};
        case "REMOVE_LOADING":
          return {...state, loading : false };
        default: return state;
    }
  }
  