import { setAlert } from "./alert";
import API from "../API"

export const fetchData = ( ) => ( dispatch ) =>{
  API.get('Users', {} , "" , function(res){
    dispatch( 
      { type: "STORE_DATA",
        data : res.data
      }
    );
  })
}

export const getHomePageData = (options = {}) =>( dispatch ) => {
  try{
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    });
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    options.restaurant= restaurantDetail.id;    
    
    API.get('Home' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "HOME",
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
