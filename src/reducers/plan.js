
const initialState = {
    planDetail: [],
    plan_detail_loading : true,
    plans: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'PLAN_DETAIL_LOADING' : 
            return {...state , plan_detail_loading : true};
        case 'PLAN_DETAIL':
          return {...state , planDetail : data , plan_detail_loading : false};
        case "PLAN_LIST":
          return {...state, plans :  data.results, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  