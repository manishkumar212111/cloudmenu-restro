import { setAlert } from "./alert";
import API from "../API";
// import { clearPlanData } from '../utils/globals'

export const getTransactions = ( page = 1) => ( dispatch ) =>{
  
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Transactions', {page : page} , "" , function(res){
    dispatch( 
      { type: "TRANSACTION_LIST",
        data : res.data
      }
    );

    dispatch({
        type : "REMOVE_LOADING",
        data : {}
    })
  })
}

