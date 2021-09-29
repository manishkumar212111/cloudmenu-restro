
const initialState = {
    restaurantDetail: [],
    restaurant_detail_loading : true,
    restaurants: [],
    totalPages:1,
    restaurantOnbordingMessage : false
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'Restaurant_DETAIL_LOADING' : 
            return {...state , restaurant_detail_loading : true};
        case 'Restaurant_DETAIL':
          return {...state , restaurantDetail : data ,restaurantOnbordingMessage: false, restaurant_detail_loading : false};
        case "Restaurant_LIST":
          return {...state, restaurants :  data.results,restaurantOnbordingMessage: false, restaurant_detail_loading: false, totalPages : data.totalPages};
        case "RESTAURANT_ONBOARDING_MESSAGE":
          return {...state, restaurantOnbordingMessage :  true};

        default: return state;
    }
  }
  