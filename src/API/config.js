// const BASE_URL = 'http://localhost:5000/';
const BASE_URL = 'https://afternoon-mesa-99102.herokuapp.com/';
const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";

const getImageURL = (imgName) => IMAGE_URL.concat(imgName);

const EndPoints = {
    Users: {
        url: 'api/users',
    },
    Login : {
        url : "api/auth/login"
    },
    Logout : {
        url : "api/auth/logout"
    },
    Register : {
        url : "api/auth/register"
    },
    Forgot_Password : {
        url : "api/auth/forgot-password"
    },
    ResetPassword : {
        url : "/api/auth/reset-password"
    },
    VerifyOtp:{
        url : "/api/auth/verify-otp"
    },
    GetUserById : {
        url : "/api/users"
    },
    UpdateUserById : {
        url : "/api/users"
    },
    changePassword : {
        url : "/api/user/password"
    },
    changeEmail : {
        url : "/api/user/email"
    },
    DeleteAccount : {
        url : "/api/users"
    },
    GoogleLoginValidate : {
        url : "/api/auth/google/validate"
    },
    Plans: {
        url: 'api/plan',
    },
    Restaurants: {
        url: 'api/restaurant',
    },
    EmailTemplates : {
        url : "api/email-template"
    },
    Transactions: {
        url: 'api/transaction',
    },
    categoryList: {
        url: 'api/category',
    },
    orderList: {
        url: 'api/order',
    },
    productList:{
        url: 'api/product',
    },
    menuList:{
        url: 'api/menu',
    },
    modifierList:{
        url: 'api/modifier',
    },
    Enquiry: {
        url: 'api/common/enquiry',
    },
    Home : {
        url : "api/common/dashboard"
    },
    HomeByDate: {
        url : "api/common/dashboard/bydate"
    },
    UpgradePlanRequest: {
        url: 'api/restaurant/user/subscription-request',
    }
};

export { BASE_URL, EndPoints, getImageURL };