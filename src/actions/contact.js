import { setAlert } from "./alert";
import API from "../API";
// import { clearPlanData } from '../utils/globals'

export const submitContact = ( data ) => ( dispatch ) =>{
  
    dispatch({
        type : "SUBMITING_CONTACT",
        data : true
    })
    API.post('Enquiry', data , "" , function(res){
        if(res){
            dispatch( { type: "CONTACT_SUBMIT_SUCCESS",
                data : res.data
            });
            dispatch(setAlert("We have recorded your query we will contact you soon" , "success"))

        } else {
            dispatch(setAlert("Unable to submit currently" , "danger"))
        }
        dispatch({
            type : "SUBMITING_CONTACT",
            data : false
        });
  })
}

