
const initialState = {
    transactionDetail: [],
    transactions: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'PLAN_DETAIL_LOADING' : 
            return {...state , plan_detail_loading : true};
        case 'TRANSACTION_DETAIL':
          return {...state , transactionDetail : data , plan_detail_loading : false};
        case "TRANSACTION_LIST":
          return {...state, transactions :  data.results, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  