
const initialState = {
    cmsDetail: [],
    cms_detail_loading : true,
    cmss: [],
    totalPages:1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'CMS_DETAIL_LOADING' : 
            return {...state , cms_detail_loading : true};
        case 'CMS_DETAIL':
          return {...state , cmsDetail : data , cms_detail_loading : false};
        case "CMS_LIST":
          return {...state, cmss :  data.results, cms_detail_loading: false, totalPages : data.totalPages};
        
        default: return state;
    }
  }
  