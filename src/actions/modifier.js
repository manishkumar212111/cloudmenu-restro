import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getModifierList = (options, cb, loader) => dispatch =>{
  try{
      options = options ? options : {page : 1, limit:12};
      !loader && dispatch({
          type : "MODIFIER_DETAIL_LOADING",
          data : true
      })

      let restaurantDetail =
          localStorage.getItem("userDetail") &&
          JSON.parse(localStorage.getItem("userDetail"))
            ? JSON.parse(localStorage.getItem("userDetail")).restaurant
            : {};
        options.restaurant = restaurantDetail.id;
        options.menu = options.menu ? options.menu : localStorage.getItem("currentMenu")    
        options.page = options.page ? options.page : 1;
    API.get('modifierList' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "MODIFIER_LIST",
            data : res.data
          });
          typeof cb == 'function' && cb(res.data);
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        !loader && dispatch({
        type : "MODIFIER_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const deleteModifierById = (id , options) => dispatch =>{
  try{
      dispatch({
          type : "MODIFIER_DETAIL_LOADING",
          data : true
      })
    API.delete('modifierList' , {}, id , function(res){
      
      if(res && res.data){
          dispatch(setAlert("modifier deleted successfully" , 'success'));    
          dispatch(getModifierList())
          // dispatch( { type: "MODIFIER_LIST",
          //   data : res.data
          // });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "MODIFIER_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


  export const createModifier = (data) => dispatch =>{
    try{
        dispatch({
            type : "MODIFIER_DETAIL_LOADING",
            data : true
        })
        data.menu = data.menu ? data.menu : localStorage.getItem("currentMenu")    
        let restaurantDetail =
        localStorage.getItem("userDetail") &&
        JSON.parse(localStorage.getItem("userDetail"))
          ? JSON.parse(localStorage.getItem("userDetail")).restaurant
          : {};
        
      API.post('modifierList' , data , '' , function(res){
        if(res && res.data && res.data.id) {
            // dispatch(getModifierByUserId());
            dispatch(setAlert("Modifier added" , 'success'));
            dispatch(getModifierList());
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "MODIFIER_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const getModifierById = (modifierId) => dispatch =>{
    try{
        dispatch({
            type : "MODIFIER_DETAIL_LOADING",
            data : true
        })
      API.get('modifierList' , {}, modifierId , function(res){
        
        if(res && res.data){
            dispatch( { type: "SINGLE_MODIFIER_DETAIL",
              data : res.data
            });
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "MODIFIER_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const updateModifierById = (modifierId , data) => dispatch =>{
    try{
        dispatch({
            type : "MODIFIER_DETAIL_LOADING",
            data : true
        })
      API.patch('modifierList' , data , modifierId , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            dispatch(getModifierList());
  
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "MODIFIER_DETAIL_LOADING",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }

  
  
  