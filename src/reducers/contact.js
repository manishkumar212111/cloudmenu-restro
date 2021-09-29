
const initialState = {
    submitLoading: false,
    message: '',
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'SUBMITING_CONTACT' : 
            return {...state , submitLoading : data};
        case 'CONTACT_SUBMIT_SUCCESS':
          return {...state , message : "Your message sent successfully we will connect with you soon!", submitLoading : false};
        
        default: return state;
    }
  }
  