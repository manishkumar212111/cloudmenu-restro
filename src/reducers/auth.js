
const initialState = {
    userDetail: false,
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    console.log(type , data)
    switch ( type ) {
        case 'REGISTER_LOADING':
          return {...state, registerLoading :  data};

        case 'LOGIN_LOADING':
          return {...state, loginLoading :  data};
        case 'REGISTER_USER':
          return {...state, userDetail :  data, registerLoading : false};
        case 'LOGIN_USER':
            return {...state, userDetail :  data , loginLoading : false};
        case 'LOGIN_USER_LOADING':
            return {...state, login_user_loading :  data};

        default: return state;
    }
  }
  