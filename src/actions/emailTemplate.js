import { setAlert } from "./alert";
import API from "../API";
// import { clearEmailTemplateData } from '../utils/globals'

export const getEmailTemplates = ( page = 1) => ( dispatch ) =>{
  
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('EmailTemplates', {page : page} , "" , function(res){
        console.log(res);
        dispatch( 
        { type: "EMAIL_TEMPLATE_LIST",
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
      API.post('EmailTemplates' , data ,'', function(res){
        
        if(res && res.data.id){
            dispatch( { type: "EMAIL_TEMPLATE_DETAIL",
              data : res.data
            });

            dispatch(setAlert("EmailTemplates Added successfully" , 'success'));    

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
  
export const GetEmailTemplateById = (cmsId) => dispatch =>{
  try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
    API.get('EmailTemplates' , {}, cmsId , function(res){
      
      if(res && res.data){
          dispatch( { type: "EMAIL_TEMPLATE_DETAIL",
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

export const UpdateEmailTemplateById = (id , data) => dispatch =>{
    try{
        dispatch({
            type : "PAGE_LOADING",
            data : {}
        })
      API.patch('EmailTemplates' , data , id , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success')); 
            dispatch(getEmailTemplates())   
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
  