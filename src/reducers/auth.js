
const initialState = {
    userDetail: [],
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    console.log(type , data)
    switch ( type ) {
        case 'REGISTER_USER':
          return {...state, userDetail :  data};
        case 'LOGIN_USER':
            return {...state, userDetail :  data};
        case 'LOGIN_USER_LOADING':
            return {...state, login_user_loading :  data};

        default: return state;
    }
  }
  