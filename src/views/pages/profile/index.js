import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";
import ImagUpload from "./upload-image-icon.svg";

import {
  create,
  GetRestaurantById,
  UpdateRestaurantById,
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
    manager_name: "",
    coverImage: "",
    full_address: "",
    mobile: "",
    ccode: "+91",
    email: "",
    state: "",
    city: "",
    password: "",
    businessDoc: "",
  },
};

const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(
    props.match && props.match.params && props.match.params.id
      ? props.match.params.id
      : false
  );
  const [previewCoverImage, setCoverImagePreview] = useState("");
  
  console.log(props);

  const [fieldObj, setfieldObj] = useState(defaultProps.fieldObj);
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: "It should be valid" },
    manager_name: { error: true, msg: "It should be valid" },
    coverImage: { error: true, msg: "It should be valid" },
    full_address: { error: true, msg: "It should be valid" },
    mobile: { error: true, msg: "It should be valid" },
    email: { error: true, msg: "It should be valid" },
    ccode: { error: true, msg: "It should be valid" },
    city: { error: true, msg: "It should be valid" },
    state: { error: true, msg: "It should be valid" },
    password: { error: true, msg: "It should be valid" },
    businessDoc: { error: true, msg: "It should be valid" },
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
    props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj);
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

  const handleFileUpload = (e, key, value) => {
    console.log(e.target.files[0]);

    let field = {};
    field[key] = e.target.files[0];
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    key == "coverImage" && setCoverImagePreview(objectUrl);
    
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
      case "manager_name":
      case "coverImage":
      case "full_address":
      case "mobile":
      case "ccode":
      case "state":
      case "city":
      case "password":
      case "businessDoc":
        return validateUtility.required(value);
      case "email":
        return validateUtility.required(value) && validateUtility.email(value);
      default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = [
      "name",
      "manager_name",
      "email",
      "coverImage",
      "full_address",
      "mobile",
      "state",
      "city",
      "password",
      "businessDoc",
    ];
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
      props.UpdateRestaurantById(isEdit, fieldObj);
      return;
    }
    fieldObj.ccode = "+91";
    props.create(fieldObj);
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
          <div class="row px-5 restaurant-details-container d-flex">
            <div class="col-7 restaurant-details-form-container py-3 bg-white">
              <div class="row restaurant-details-form-heading py-3 px-4">
                Restaurant Onboarding
              </div>
              <div class="row py-4">
                <div class="col-6 px-4">
                  <div class="form-group mb-4">
                    <label for="restaurant-name-ar" class="input-label">
                      Restaurant Name
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
                  <CFormGroup class="form-group mb-4">
                    <CLabel htmlFor="manager_name" class="input-label">
                      Manager Name{" "}
                    </CLabel>
                    <CInput
                      id="manager_name"
                      class="form-control py-2 pl-3 form-input"
                      name="manager_name"
                      value={fieldObj.manager_name}
                      onChange={(e) => handleChange(e, "manager_name")}
                      placeholder="Enter Manager name"
                    />
                    {!errorObj.manager_name.error && (
                      <CFormText className="help-block error">
                        {errorObj.manager_name.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                  <div class="form-group mb-4">
                    <CLabel htmlFor="mobile" class="input-label">
                      Mobile No.{" "}
                    </CLabel>
                    <CInput
                      id="mobile"
                      name="mobile"
                      class="form-control py-2 pl-3 form-input"
                      data-vu-type="number"
                      onKeyPress={(e) => validateUtility.stopDefault(e)}
                      value={fieldObj.mobile}
                      onChange={(e) => handleChange(e, "mobile")}
                      placeholder="Enter Mobile No."
                    />
                    {!errorObj.mobile.error && (
                      <CFormText className="help-block error">
                        {errorObj.mobile.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <CLabel htmlFor="full_address" class="input-label">
                      Full Address *
                    </CLabel>
                    <CInput
                      id="full_address"
                      class="form-control py-2 pl-3 form-input"
                      name="full_address"
                      value={fieldObj.full_address}
                      onChange={(e) => handleChange(e, "full_address")}
                      placeholder="Enter Full address"
                    />
                    {!errorObj.full_address.error && (
                      <CFormText className="help-block error">
                        {errorObj.full_address.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <CLabel htmlFor="city" class="input-label">
                      City *{" "}
                    </CLabel>
                    <CInput
                      id="city"
                      name="city"
                      class="form-control py-2 pl-3 form-input"
                      value={fieldObj.city}
                      onChange={(e) => handleChange(e, "city")}
                      placeholder="Enter city name"
                    />
                    {!errorObj.city.error && (
                      <CFormText className="help-block error">
                        {errorObj.city.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <CLabel htmlFor="state" class="input-label">
                      State *{" "}
                    </CLabel>
                    <CInput
                      id="state"
                      name="state"
                      class="form-control py-2 pl-3 form-input"
                      value={fieldObj.state}
                      onChange={(e) => handleChange(e, "state")}
                      placeholder="Enter State name"
                    />
                    {!errorObj.state.error && (
                      <CFormText className="help-block error">
                        {errorObj.state.msg}
                      </CFormText>
                    )}
                  </div>

                  <div class="form-group mb-4">
                    <CLabel htmlFor="email" class="input-label">
                      Email *{" "}
                    </CLabel>
                    <CInput
                      type="email"
                      id="email"
                      name="email"
                      class="form-control py-2 pl-3 form-input"
                      value={fieldObj.email}
                      onChange={(e) => handleChange(e, "email")}
                      placeholder="Email"
                    />
                    {!errorObj.email.error && (
                      <CFormText className="help-block error">
                        {errorObj.email.msg}
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
                      Upload Cover Image *
                    </label>
                    <div class="col-lg-8 col-md-10 col-sm-11 col-11 px-0 imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="coverImage"
                      name="coverImage"
                      onChange={(e) => handleFileUpload(e, "coverImage")}
                      />
                      <div
                        style={{ width: 260, height: 130 }}
                        class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={
                            previewCoverImage
                              ? previewCoverImage
                              : fieldObj.coverImage
                              ? BASE_URL + fieldObj.coverImage
                              : ImagUpload
                          }
                          alt=""
                          style={{ width: 260, height: 130 }}
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.coverImage.error && (
                      <CFormText className="help-block error">
                        {errorObj.coverImage.msg}
                      </CFormText>
                    )}
                  </div>
                  <div class="form-group mb-4">
                    <label
                      for="restaurantLogoUpload"
                      class="form-label input-label"
                    >
                      Upload Business Document *
                    </label>
                    <div class="col-lg-8 col-md-10 col-sm-11 col-11 px-0 imageUploadInput-container">
                      <input
                        class="form-control"
                        type="file"
                        id="businessDoc"
                        name="businessDoc"
                        onChange={(e) => handleFileUpload(e, "businessDoc")}
                      />
                      
                    </div>
                    {!errorObj.businessDoc.error && (
                      <CFormText className="help-block error">
                        {errorObj.businessDoc.msg}
                      </CFormText>
                    )}
                  </div>
                  <div class="form-group mb-4">
                    <CLabel htmlFor="full_address" class="input-label">
                      Password *
                    </CLabel>
                    <CInput
                      id="full_address"
                      class="form-control py-2 pl-3 form-input"
                      id="password"
                      name="password"
                      value={fieldObj.password}
                      onChange={(e) => handleChange(e, "password")}
                      placeholder="Enter Password"
                    />
                    {!errorObj.password.error && (
                      <CFormText className="help-block error">
                        {errorObj.password.msg}
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
          </div>
        </div>
      </div>

      {/* <CRow>
        <CCol xs="12" sm="12" style={{ "margin-top": "10px" }}>
          <CCard>
            <CCardHeader>
              Restaurant Profile Detail
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="4">
                  
                </CCol>
                <CCol sm="4">
                  
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="4">
                  <CFormGroup>
                    
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="4">
                  <CFormGroup>
                    
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="coverImage">Cover Image </CLabel>
                    <CInput
                      type="file"
                      id="coverImage"
                      name="coverImage"
                      onChange={(e) => handleFileUpload(e, "coverImage")}
                      placeholder="Enter CoverImage"
                    />
                    {!errorObj.coverImage.error && (
                      <CFormText className="help-block error">
                        {errorObj.coverImage.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>

                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="businessDoc">
                      Upload Business Doc *{" "}
                    </CLabel>
                    <CInput
                      type="file"
                      id="businessDoc"
                      name="businessDoc"
                      onChange={(e) => handleFileUpload(e, "businessDoc")}
                      placeholder="Enter businessDoc"
                    />
                    {!errorObj.businessDoc.error && (
                      <CFormText className="help-block error">
                        {errorObj.businessDoc.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="password">Confirm password * </CLabel>
                    <CInput
                      type="password"
                      id="password"
                      name="password"
                      value={fieldObj.password}
                      onChange={(e) => handleChange(e, "password")}
                      placeholder="Confirm password"
                    />
                    {!errorObj.password.error && (
                      <CFormText className="help-block error">
                        {errorObj.password.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CButton
                style={{ marginLeft: "40%", width: 200 }}
                block
                color="primary"
                onClick={handleClick}
                value="Submit"
              >
                {isEdit ? "Update" : "Submit"}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
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
};

Profile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
