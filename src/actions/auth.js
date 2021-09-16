import { setAlert } from "./alert";
import API from "../API"

export const loginUser = ( data ) => dispatch =>{
  try{
    dispatch( { type: "LOGIN_LOADING",
      data : true
    });
    API.post('Login' , data, '' , function(res){
      
      if(res && res.data.user){
          dispatch( { type: "LOGIN_USER",
            data : res.data
          });
        } else {
            console.log(res.data.message , "hghgh");
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch( { type: "LOGIN_LOADING",
          data : false
        });
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const logout = ( data ) => dispatch =>{
  try{

    API.post('Logout' , data, '' , function(res){
      localStorage.removeItem('userDetail');
      dispatch({
        type: "LOGIN_USER",
        data : ""
      });
      dispatch(setAlert("Logout successfull" , 'success'));    
      setTimeout(() => {
        window.location.href= '/#/'
      },1000)
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

// export const GoogleLoginValidate = ( data ) => dispatch =>{
//   try{

//     API.post('GoogleLoginValidate' , data, '' , function(res){
      
//       if(res && res.data.user){
//           dispatch( { type: "LOGIN_USER",
//             data : res.data
//           });
//         } else {
//             //console.log(res.data.message);
//             res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
//         }
//     })
    
//   } catch (err) {
//     console.log(err)
//     console.log(err)
//   }
// }

export const registerUser = ( data ) => dispatch =>{
  try{
    dispatch( { type: "REGISTER_LOADING",
      data : true
    });
    API.post('Register' , data, '' , function(res){
      
      if(res && res.data.user){
          dispatch( { type: "REGISTER_USER",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch( { type: "REGISTER_LOADING",
          data : false
        });
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


export const sendResetLink = ( data ) => dispatch => {
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });

    API.post('Forgot_Password' , data, '' , function(res){
      console.log(res)
      if(res && res.data && res.data.status){
        dispatch(setAlert("Otp sent at your mobile no" , 'success'));    
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
        window.location.href= `/#/verify-otp/${res.data.userId}`
      } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          dispatch( { type: "LOGIN_USER_LOADING",
            data : false
          });
        
      }
      
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const verifyOtp = ( data ) => dispatch => {
  try{
    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });

    API.post('VerifyOtp' , data, '' , function(res){
      console.log(res)
      if(res && res.data && res.data.token){
        dispatch( { type: "LOGIN_USER_LOADING",
          data : false
        });
        window.location.href= `/#/reset-password/${res.data.token}`
      } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          dispatch( { type: "LOGIN_USER_LOADING",
            data : false
          });
        
      }
      
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


export const resetPassword = ( token , password ) => dispatch =>{
  try{

    dispatch( { type: "LOGIN_USER_LOADING",
      data : true
    });
    API.post('ResetPassword' , { token : token , password : password}, '' , function(res){
      if(res && !res.data.message){
        dispatch(setAlert("Password reset successfull " , 'success'));    
        window.location.href= `/#/login`

        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch( { type: "LOGIN_USER_LOADING",
        data : false
      });
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}