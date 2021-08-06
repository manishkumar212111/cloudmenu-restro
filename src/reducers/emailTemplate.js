
const initialState = {
    email_templateDetail: [],
    email_template_detail_loading : true,
    email_templates: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'EMAIL_TEMPLATE_DETAIL_LOADING' : 
            return {...state , email_template_detail_loading : true};
        case 'EMAIL_TEMPLATE_DETAIL':
          return {...state , email_templateDetail : data , email_template_detail_loading : false};
        case "EMAIL_TEMPLATE_LIST":
          return {...state, email_templates :  data.results, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  