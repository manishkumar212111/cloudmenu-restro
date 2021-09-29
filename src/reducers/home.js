
const initialState = {
    data: [],
    loading : false
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case "HOME":
            return {...state, data :  data};
        case "PAGE_LOADING":
            return {...state , loading : true}
        case "REMOVE_LOADING":
          return {...state , loading : false}
        default: return state;
    }
  }
  