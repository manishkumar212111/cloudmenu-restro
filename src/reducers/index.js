import { combineReducers } from "redux";

import Home from "./home";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import plan from "./plan";
import transaction from "./transaction";
import enquiry from "./enquiry";
import cms from "./cms";
import emailTemplate from "./emailTemplate";
import contact from "./contact";
import restaurant from "./restaurant";
import category from "./category";
import product from "./product";
import modifier from "./modifier";
import language from "./language";
import menu from "./menu";
import order from "./order";
import notification from "./notification";


const initialState = {
    sidebarShow: 'responsive'
  }
  
 const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }
const appReducers = combineReducers({
    Home,
    changeState,
    alert,
    auth,
    user,
    plan,
    transaction,
    enquiry,
    cms,
    emailTemplate,
    contact,
    restaurant,
    category,
    product,
    modifier,
    language,
    menu,
    order,
    notification
});

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;