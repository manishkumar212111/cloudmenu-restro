import { setAlert } from "./alert";
import API from "../API";
// import { clearPlanData } from '../utils/globals'

export const getNotifications = ( option = {}) => ( dispatch ) =>{
  
//   dispatch({
//         type : "PAGE_LOADING",
//         data : {}
//     })
    API.get('Notification', option , "" , function(res){
    dispatch( 
      { type: "NOTIFICATION_LIST",
        data : res.data
      }
    );

    // dispatch({
    //     type : "REMOVE_LOADING",
    //     data : {}
    // })
  })
}


export const updateNotification = ( data) => ( dispatch ) =>{
  
  // dispatch({
  //     type : "PAGE_LOADING",
  //     data : {}
  // })
  API.patch('Notification', data , "6166a349596cbeac25167b95" , function(res){
    dispatch(getNotifications());    
    // dispatch(setAlert("Notification successfully update" , 'success'));    
  
    // dispatch({
    //     type : "REMOVE_LOADING",
    //     data : {}
    // })
})
}

