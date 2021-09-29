import { setAlert } from "./alert";
import API from "../API";
// import { clearPlanData } from '../utils/globals'

export const getEnquirys = ( page = 1, noAlert) => ( dispatch ) =>{
  
  !noAlert && dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Enquiry', {page : page} , "" , function(res){
    dispatch( 
      { type: "ENQUIRY_LIST",
        data : res.data
      }
    );

    dispatch({
        type : "REMOVE_LOADING",
        data : {}
    })
  })
}


export const updateEnquiry = ( id , status , page) => ( dispatch ) =>{
  
  // dispatch({
  //     type : "PAGE_LOADING",
  //     data : {}
  // })
  API.patch('Enquiry', { status : status} , id , function(res){
    dispatch(getEnquirys(page , true));    
  
    dispatch(setAlert("Enquiry successfully update" , 'success'));    
  
    // dispatch({
    //     type : "REMOVE_LOADING",
    //     data : {}
    // })
})
}

