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


export const updateNotification = ( id , status , page) => ( dispatch ) =>{
  
  // dispatch({
  //     type : "PAGE_LOADING",
  //     data : {}
  // })
  API.patch('Notification', { isOpened : true} , id , function(res){
    dispatch(getNotifications({isOpened: false}));    
    // dispatch(setAlert("Notification successfully update" , 'success'));    
  
    // dispatch({
    //     type : "REMOVE_LOADING",
    //     data : {}
    // })
})
}

