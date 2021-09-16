import { setAlert } from "./alert";
import API from "../API";
// import { clearRestaurantData } from '../utils/globals'

export const getRestaurants = ( page = 1) => ( dispatch ) =>{
  
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Restaurants', {page : page} , "" , function(res){
        console.log(res);
        if(res && res.data){

          dispatch( 
            {   type: "Restaurant_LIST",
                data : res.data
            }
          );
        }

        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
  })
}


export const create = (data) => dispatch =>{
    try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })

        let formData = new FormData();

        Object.keys(data).map(itm => {
            formData.append(itm, data[itm]);
        });
      API.post('Restaurants' , formData ,'', function(res){
        
        if(res && res.data.id){
            dispatch( { type: "Restaurant_DETAIL",
              data : res.data
            });
            dispatch( { type: "RESTAURANT_ONBOARDING_MESSAGE",
                data : true
            });
            dispatch(setAlert("Restaurant successfully sent for verification" , 'success'));    

          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      
          dispatch({
            type : "REMOVE_LOADING",
            data : {}
           })
    })
      
    } catch (err) {
      
        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
      console.log(err)
      console.log(err)
    }
  }
  
export const GetRestaurantById = (restaurantId) => dispatch =>{
  try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
    API.get('Restaurants' , {}, restaurantId , function(res){
      
      if(res && res.data){
          dispatch( { type: "Restaurant_DETAIL",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
    })
    
  } catch (err) {

    dispatch({
        type : "REMOVE_LOADING",
        data : {}
    })
    console.log(err)
    console.log(err)
  }
}

export const UpdateRestaurantById = (restaurantId , data) => dispatch =>{
    try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
        // delete data.createdAt;
        // delete data.updatedAt;
        let formData = new FormData();

        Object.keys(data).map(itm => {
          console.log(itm , data[itm], typeof data[itm]);
            typeof data[itm] != "undefined" && data[itm] !== "" && formData.append(itm, data[itm]);
          });
      API.post('Restaurants' , formData , restaurantId , function(res){
        
        if(res && res.data.id) {
            dispatch( { type: "Restaurant_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }

            dispatch({
                type : "REMOVE_LOADING",
                data : {}
            })
      }, "application/json;multipart/form-data;")
      
    } catch (err) {

        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
      console.log(err)
      console.log(err)
    }
  }
  
  export const planUpgradeRequest = () => dispatch =>{
    try{
      API.post('UpgradePlanRequest' , {} , '' , function(res){
        console.log(res);
      })
      
    } catch (err) {

  }
}
  