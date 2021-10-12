
const initialState = {
    notificationDetail: [],
    notifications: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'PLAN_DETAIL_LOADING' : 
            return {...state , plan_detail_loading : true};
        case 'NOTIFICATION_DETAIL':
          return {...state , notificationDetail : data , plan_detail_loading : false};
        case "NOTIFICATION_LIST":
          return {...state, notifications :  data.results, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  