import { setAlert } from "./alert";
import API from "../API";
// import { clearPlanData } from '../utils/globals'

export const getPlans = ( page = 1) => ( dispatch ) =>{
  
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Plans', {page : page} , "" , function(res){
    dispatch( 
      { type: "PLAN_LIST",
        data : res.data
      }
    );

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
      API.post('Plans' , data ,'', function(res){
        
        if(res && res.data.id){
            dispatch( { type: "PLAN_DETAIL",
              data : res.data
            });

            dispatch(setAlert("Plans Added successfully" , 'success'));    

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
  
export const GetPlanById = (planId) => dispatch =>{
  try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
    API.get('Plans' , {}, planId , function(res){
      
      if(res && res.data){
          dispatch( { type: "PLAN_DETAIL",
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

export const UpdatePlanById = (planId , data) => dispatch =>{
    try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
      API.patch('Plans' , data , planId , function(res){
        
        if(res && res.data.id) {
            dispatch( { type: "PLAN_DETAIL",
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
  