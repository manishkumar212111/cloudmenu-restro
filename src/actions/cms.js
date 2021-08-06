import { setAlert } from "./alert";
import API from "../API";
// import { clearCmsData } from '../utils/globals'

export const getCmss = ( page = 1) => ( dispatch ) =>{
  
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Cmss', {page : page} , "" , function(res){
        console.log(res);
        if(res && res.data){

          dispatch( 
            {   type: "CMS_LIST",
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
      API.post('Cmss' , data ,'', function(res){
        
        if(res && res.data.id){
            dispatch( { type: "CMS_DETAIL",
              data : res.data
            });

            dispatch(setAlert("Cmss Added successfully" , 'success'));    

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
  
export const GetCmsById = (cmsId) => dispatch =>{
  try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
    API.get('Cmss' , {}, cmsId , function(res){
      
      if(res && res.data){
          dispatch( { type: "CMS_DETAIL",
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

export const UpdateCmsById = (cmsId , data) => dispatch =>{
    try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
        delete data.createdAt;
        delete data.updatedAt;

      API.patch('Cmss' , data , cmsId , function(res){
        
        if(res && res.data.id) {
            dispatch( { type: "CMS_DETAIL",
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
  