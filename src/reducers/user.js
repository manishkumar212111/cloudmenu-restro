
const initialState = {
    userDetail: false,
    user_detail_loading : true,
    users: [],
    totalPages : 1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'USER_DETAIL_LOADING' : 
            return {...state , user_detail_loading : true};
        case 'USER_DETAIL':
          return {...state , userDetail : data , user_detail_loading : false};
        case "USER_LIST":
          return {...state, users :  data.results, totalPages : data.totalPages};
        case "USER_STATUS_UPDATED":
          return {...state,
             users :  state.users.map(itm => itm.id === data.id
              ? { ...itm, ...data }
              : itm)};

        default: return state;
    }
  }
  