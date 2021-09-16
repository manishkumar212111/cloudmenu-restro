import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";

import ImagUpload from "./upload-image-icon.svg";
import {
  create,
  GetRestaurantById,
  UpdateRestaurantById,
  planUpgradeRequest
} from "../../../actions/restaurant";
import { connect } from "react-redux";
import {
  CButton,
  CSelect,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormText,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CSpinner,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

import { Draggable } from "react-drag-reorder";

import CIcon from "@coreui/icons-react";
import { BASE_URL } from "src/API/config";

const defaultProps = {
  fieldObj: {
    name: "",
    nameAr: "",
    noOfTable: "",
    coverImage: "",
    state: "",
    city: "",
    currency: "",
    taxRate: "",
    taxStatus: "",
    bankDetail: {},
    logo_url: "",
    banner_url: "",
  },
};

const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(
    props.match && props.match.params && props.match.params.id
      ? props.match.params.id
      : false
  );
  const [fieldObj, setfieldObj] = useState(defaultProps.fieldObj);
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");
  const [plan, setPlan] = useState({});
  const [upgradeMessage, setUpgradeMessage] = useState(false);  
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: "It should be valid" },
    nameAr: { error: true, msg: "It should be valid" },
    noOfTable: { error: true, msg: "It should be valid" },
    coverImage: { error: true, msg: "It should be valid" },
    state: { error: true, msg: "It should be valid" },
    city: { error: true, msg: "It should be valid" },
    currency: { error: true, msg: "It should be valid" },
    taxStatus: { error: true, msg: "It should be valid" },
    taxRate: { error: true, msg: "It should be valid" },
    bankDetail: { error: true, msg: "It should be valid" },
    logoImg: { error: true, msg: "It should be valid" },
    bannerImg: { error: true, msg: "It should be valid" },
  });
  useEffect(() => {
    setIsEdit(
      props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : false
    );
  }, [props.match.params]);

  useEffect(() => {
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    if (restaurantDetail && restaurantDetail.id) {
      setIsEdit(restaurantDetail.id);
      props.GetRestaurantById(restaurantDetail.id);
    }
  }, []);

  useEffect(() => {
    props.fieldObj &&
      props.fieldObj.id &&
      setfieldObj({
        name: props.fieldObj?.name,
        nameAr: props.fieldObj?.nameAr,
        noOfTable: props.fieldObj?.noOfTable,
        state: props.fieldObj?.state,
        city: props.fieldObj?.city,
        currency: props.fieldObj?.currency,
        taxRate: props.fieldObj?.taxRate,
        taxStatus: props.fieldObj?.taxStatus,
        bankDetail: props.fieldObj?.bankDetail,
        logo_url: props.fieldObj?.logo_url,
        banner_url: props.fieldObj?.banner_url,
      });

    props.fieldObj &&
      props.fieldObj.id &&
      setPlan({
        name: props.fieldObj.user.planName,
        detail: props.fieldObj.user.planDetail,
      });
  }, [props.fieldObj]);

  const handleChange = (e, key, value) => {
    let field = {};
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    let errOb = {};
    errOb[key] = {
      error: validateField(key, value ? value : e.target.value),
      msg: errorObj[key].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  const handleTaxChange = (e, key, value) => {
    let field = {};
    console.log(e.target.checked);
    field[key] = e.target.checked;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));
  };
  const handleBankChange = (e, key, value) => {
    let field = fieldObj.bankDetail;
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, bankDetail: field }));

    // let errOb = {}
    // errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};
    // setErrorObj( er => ( { ...er , ...errOb}))
  };
  const handleFileUpload = (e, key, value) => {
    console.log(e.target.files[0]);

    let field = {};
    field[key] = e.target.files[0];
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    key == "logoImg" ? setPreviewLogo(objectUrl) : setPreviewBanner(objectUrl);
    let errOb = {};
    errOb[key] = {
      error: validateField(key, value ? value : e.target.value),
      msg: errorObj[key].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  const validateField = (key, value) => {
    value = value ? value : fieldObj[key];
    switch (key) {
      case "name":
      case "nameAr":
      case "noOfTable":
      case "coverImage":
      case "state":
      case "city":
      case "currency":
      case "taxRate":
        return validateUtility.required(value);
      case "email":
        return validateUtility.required(value) && validateUtility.email(value);
      default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = ["name", "nameAr", "noOfTable", "state", "city"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      console.log(errorStatus, element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    console.log(status);
    if (!status) return;

    if (isEdit) {
      delete fieldObj.id;
      delete fieldObj.createdAt;
      JSON.stringify(fieldObj.bankDetail);
      props.UpdateRestaurantById(isEdit, {
        ...fieldObj,
        bankDetail: JSON.stringify(fieldObj.bankDetail),
      });
      return;
    }
    fieldObj.ccode = "+91";
    props.create(fieldObj);
  };

  const handleUpgrade = () => {
    props.planUpgradeRequest();
    setTimeout(() => {
        setUpgradeMessage(true)
    }, 3000)
  };
  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }
  if (props.restaurantOnbordingMessage) {
    return (
      <>
        <CRow>
          <CCol xs="12" sm="12" style={{ "margin-top": "10px" }}>
            <CCard>
              <CCardHeader>
                Details Submission
                {/* <small> Form</small> */}
              </CCardHeader>
              <CCardBody>
                Your restaurant successfully submitted for verification, once
                verified you can start adding menus and start selling
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="row py-5 px-5 restaurant-details-container d-flex">
            <div class="col-7 restaurant-details-form-container py-3 bg-white">
              <div class="row restaurant-details-form-heading py-3 px-4">
                Restaurant Details
              </div>

              <div class="row py-4">
                <div class="col-6 px-4">
                  <div class="form-group mb-4">
                    <label for="restaurant-name-ar" class="input-label">
                      Restaurant Name English
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="name"
                      name="name"
                      value={fieldObj.name}
                      onChange={(e) => handleChange(e, "name")}
                      placeholder="enter restaurant name arabic"
                    />
                    {!errorObj.name.error && (
                      <CFormText className="help-block error">
                        {errorObj.name.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="restaurant-name-en" class="input-label">
                      Restaurant Name Arabic
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="nameAr"
                      name="nameAr"
                      value={fieldObj.nameAr}
                      onChange={(e) => handleChange(e, "nameAr")}
                      placeholder="enter restaurant name english"
                    />
                    {!errorObj.nameAr.error && (
                      <CFormText className="help-block error">
                        {errorObj.nameAr.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label for="table-no" class="input-label">
                      Number of Tables
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="noOfTable"
                      name="noOfTable"
                      value={fieldObj.noOfTable}
                      onChange={(e) => handleChange(e, "noOfTable")}
                    />
                    {!errorObj.noOfTable.error && (
                      <CFormText className="help-block error">
                        {errorObj.noOfTable.msg}
                      </CFormText>
                    )}
                  </div>
                </div>
                <div class="col-6 px-4">
                  <div class="form-group mb-4">
                    <label
                      for="restaurantLogoUpload"
                      class="form-label input-label"
                    >
                      Upload Logo
                    </label>
                    <div class="col-lg-8 col-md-10 col-sm-11 col-11 px-0 imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="logoImg"
                        name="logoImg"
                        onChange={(e) => handleFileUpload(e, "logoImg")}
                      />
                      <div
                        style={{ width: 260, height: 130 }}
                        class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={
                            previewLogo
                              ? previewLogo
                              : fieldObj.logo_url
                              ? BASE_URL + fieldObj.logo_url
                              : ImagUpload
                          }
                          alt=""
                          style={{ width: 260, height: 130 }}
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.logoImg.error && (
                      <CFormText className="help-block error">
                        {errorObj.logoImg.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <label
                      for="restaurantBannerUpload"
                      class="form-label input-label"
                    >
                      Upload Banner
                    </label>
                    <div class="col-lg-8 col-md-10 col-sm-11 col-11 px-0 imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="bannerImg"
                        name="bannerImg"
                        onChange={(e) => handleFileUpload(e, "bannerImg")}
                      />

                      <div
                        style={{ width: 260, height: 130 }}
                        class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={
                            previewBanner
                              ? previewBanner
                              : fieldObj.banner_url
                              ? BASE_URL + fieldObj.banner_url
                              : ImagUpload
                          }
                          alt=""
                          style={{ width: 260, height: 130 }}
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.bannerImg.error && (
                      <CFormText className="help-block error">
                        {errorObj.bannerImg.msg}
                      </CFormText>
                    )}
                  </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-6 px-4">
                  <div class="form-group">
                    <div class="form-group mb-4">
                      <label for="table-no" class="input-label">
                        State
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="state"
                        name="state"
                        value={fieldObj.state}
                        onChange={(e) => handleChange(e, "state")}
                        placeholder="State"
                      />
                      {!errorObj.state.error && (
                        <CFormText className="help-block error">
                          {errorObj.state.msg}
                        </CFormText>
                      )}
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <label for="currency" class="input-label">
                      Currency
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="currency"
                      name="currency"
                      value={fieldObj.currency}
                      onChange={(e) => handleChange(e, "currency")}
                      placeholder="add currency"
                    />
                    {!errorObj.currency.error && (
                      <CFormText className="help-block error">
                        {errorObj.currency.msg}
                      </CFormText>
                    )}
                  </div>
                  <div class="form-check form-switch d-flex switch-container justify-content-space-between mb-3">
                    <div class="col-8 text-left">
                      <label
                        class="form-check-label form-check-switch-label"
                        for="flexSwitchCheckDefault"
                      >
                        Activate Tax
                      </label>
                    </div>
                    <div class="col-4 d-flex justify-content-end px-4">
                      <input
                        class="form-check-input"
                        id="tax"
                        name="taxStatus"
                        checked={fieldObj.taxStatus}
                        onChange={(e) => handleTaxChange(e, "taxStatus")}
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      {!errorObj.taxStatus.error && (
                        <CFormText className="help-block error">
                          {errorObj.taxStatus.msg}
                        </CFormText>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-6 px-4">
                  <div class="form-group">
                    <div class="mb-4">
                      <div class="form-group mb-4">
                        <label for="table-no" class="input-label">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={fieldObj.city}
                          onChange={(e) => handleChange(e, "city")}
                          class="form-control py-2 pl-3 form-input"
                          id="city"
                          placeholder="Enter City"
                        />
                        {!errorObj.city.error && (
                          <CFormText className="help-block error">
                            {errorObj.city.msg}
                          </CFormText>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label for="vat" class="input-label">
                      Tax - VAT %
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="taxRate"
                      name="taxRate"
                      value={fieldObj.taxRate}
                      onChange={(e) => handleChange(e, "taxRate")}
                      placeholder="add vat % ex - 15%"
                    />
                    {!errorObj.taxRate.error && (
                      <CFormText className="help-block error">
                        {errorObj.taxRate.msg}
                      </CFormText>
                    )}
                  </div>
                </div>
              </div>

              <div class="form-group d-flex justify-content-center mt-4">
                <button
                  type="button"
                  onClick={handleClick}
                  class="btn update-btn"
                >
                  UPDATE
                </button>
              </div>
            </div>
            <div class="col-4 restaurant-details-right-container">
              <div class="row restaurant-details-right-container-plan bg-white py-3">
                <div class="restaurant-details-form-heading py-3 px-4">
                  My Plan
                </div>
                  <div class="plan-name text-center py-2">{plan?.name}</div>
                  <div class="plan-date text-center py-3">
                    Ending on 24/05/2022
                  </div>
                  <div class="form-group d-flex justify-content-center mt-4">
                    <button type="button" class="btn update-btn" onClick={handleUpgrade}>
                      UPGRADE
                    </button><br></br>

                  </div>
                  {upgradeMessage && <div style={{color: "green", textAlign: "center"}}> Your request have been submitted, Soon you will get a call.</div>}

              </div>

              <div class="row restaurant-details-right-container-plan bg-white py-3 mt-5">
                <div class="restaurant-details-form-heading py-3 px-4">
                  Bank Details
                </div>
                <form action="" class="row py-4">
                  <div class="col-6 px-4">
                    <div class="form-group mb-4">
                      <label for="bank-name" class="input-label">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="bankName"
                        name="bankName"
                        value={fieldObj.bankDetail.bankName}
                        onChange={(e) => handleBankChange(e, "bankName")}
                        placeholder="add bank name"
                      />
                      {/* {!errorObj.name.error && <CFormText className="help-block error">{errorObj.name.msg}</CFormText>} */}
                    </div>

                    <div class="form-group mb-4">
                      <label for="iban" class="input-label">
                        IBAN
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="IBAN"
                        name="IBAN"
                        value={fieldObj.bankDetail.IBAN}
                        onChange={(e) => handleBankChange(e, "IBAN")}
                        placeholder="loan information"
                      />
                      {/* {!errorObj.name.error && <CFormText className="help-block error">{errorObj.name.msg}</CFormText>} */}
                    </div>
                  </div>
                  <div class="col-6 px-4">
                    <div class="form-group mb-4">
                      <label for="company" class="input-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        class="form-control py-2 pl-3 form-input"
                        id="companyName"
                        name="companyName"
                        value={fieldObj.bankDetail.companyName}
                        onChange={(e) => handleBankChange(e, "companyName")}
                        placeholder="add company name"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Home.loading,
  fieldObj: state.restaurant.restaurantDetail,
  restaurantOnbordingMessage: state.restaurant.restaurantOnbordingMessage,
});

const mapDispatchToProps = {
  create,
  GetRestaurantById,
  UpdateRestaurantById,
  planUpgradeRequest
};

Profile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
