import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getProductList = (options = {}) => async dispatch =>{
  try{
        let restaurantDetail =
          localStorage.getItem("userDetail") &&
          JSON.parse(localStorage.getItem("userDetail"))
            ? JSON.parse(localStorage.getItem("userDetail")).restaurant
            : {};
        options.limit = 500;
        options.menu = options.menu ? options.menu : localStorage.getItem("currentMenu")    
        options.restaurant= restaurantDetail.id;    
        options.category = options.category ? options.category : localStorage.getItem("activeCategory");
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
      console.log(options, "sdkkjdsvkjd fhvhdfgjhgj")
    API.get('productList' , options, '' , function(res){
        if(res && res.data){
          dispatch( { type: "PRODUCT_LIST",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const deleteProductById = (id , options) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.delete('productList' , {}, id , function(res){
      
      if(res && res.data){
          dispatch(setAlert("product deleted successfully" , 'success'));    
          dispatch(getProductList())
          // dispatch( { type: "PRODUCT_LIST",
          //   data : res.data
          // });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


  export const createProduct = (data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        });
        let formData = new FormData();
        formData.append("menu", localStorage.getItem("currentMenu"));
        Object.keys(data).map(itm => {
            formData.append(itm, data[itm]);
        });
      API.post('productList' , formData , '' , function(res){
        if(res && res.data && res.data.id) {
            dispatch(setAlert("Product added" , 'success'));
            dispatch(getProductList())
          } else {
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "PRODUCT_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const getProductById = (productId, loader) => dispatch =>{
    try{
        !loader && dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.get('productList' , {}, productId , function(res){
        
        if(res && res.data){
            dispatch( { type: "SINGLE_PRODUCT_DETAIL",
              data : res.data
            });
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          !loader && dispatch({
              type : "PRODUCT_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const updateProductById = (productId , data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
        console.log(data)
        let formData = new FormData();

        Object.keys(data).map(itm => {
            formData.append(itm, data[itm]);
            console.log(formData.get(itm))
          });
      API.put('productList' , formData , productId , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            dispatch(getProductList())

            
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
      } , "application/json;multipart/form-data;")
      
    } catch (err) {
      
    }
  }

  
  
  