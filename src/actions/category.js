import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getCategoryList = (options = {}) => dispatch =>{
  try{
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    options.restaurant= restaurantDetail.id;    

      dispatch({
          type : "CATEGORY_DETAIL_LOADING",
          data : true
      })
    API.get('categoryList' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "CATEGORY_LIST",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "CATEGORY_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const deleteCategoryById = (id , options) => dispatch =>{
  try{
      dispatch({
          type : "CATEGORY_DETAIL_LOADING",
          data : true
      })
    API.delete('categoryList' , {}, id , function(res){
      
      if(res && res.data){
          dispatch(setAlert("category deleted successfully" , 'success'));    
          dispatch(getCategoryList(options))
          // dispatch( { type: "CATEGORY_LIST",
          //   data : res.data
          // });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "CATEGORY_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


  export const createCategory = (data) => dispatch =>{
    try{
        dispatch({
            type : "CATEGORY_DETAIL_LOADING",
            data : true
        })
      API.post('categoryList' , data , '' , function(res){
        if(res && res.data && res.data.id) {
            // dispatch(getCategoryByUserId());
            dispatch(setAlert("Category added" , 'success'));
            dispatch(getCategoryList())
            // setTimeout(() => {
            //   window.location.href="/#/category";
            // }, 1000)
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "CATEGORY_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const getCategoryById = (categoryId) => dispatch =>{
    try{
        dispatch({
            type : "CATEGORY_DETAIL_LOADING",
            data : true
        })
      API.get('categoryList' , {}, categoryId , function(res){
        
        if(res && res.data){
            dispatch( { type: "SINGLE_CATEGORY_DETAIL",
              data : res.data
            });
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "CATEGORY_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const updateCategoryById = (categoryId , data) => dispatch =>{
    try{
        dispatch({
            type : "CATEGORY_DETAIL_LOADING",
            data : true
        })
      API.patch('categoryList' , data , categoryId , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            setTimeout(() => {
              window.location.href="/#/category";
            }, 500)
            
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "CATEGORY_DETAIL_LOADING",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }

  
  
  