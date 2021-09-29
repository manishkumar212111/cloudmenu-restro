
const initialState = {
    enquiryDetail: [],
    enquirys: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'PLAN_DETAIL_LOADING' : 
            return {...state , plan_detail_loading : true};
        case 'ENQUIRY_DETAIL':
          return {...state , enquiryDetail : data , plan_detail_loading : false};
        case "ENQUIRY_LIST":
          return {...state, enquirys :  data.results, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  