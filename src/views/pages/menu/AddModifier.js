import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";

import {
  createModifier,
  getModifierById,
  updateModifierById,
} from "../../../actions/modifier";
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
  CImg,
  CSwitch,
  CListGroup,
} from "@coreui/react";
import crossIcon from "./images/cross.svg";
import "./style/addModifier.scss";
import CreatableSelect from "react-select/creatable";
import { BASE_URL } from "src/API/config";
import items from "./items";

const defaultProps = {
  fieldObj: {
    name: "",
    nameAr: "",
    isRequired: false,
    min: 1,
    max: 20,
    modifiers: [],
  },
};

const AddModifier = (props) => {
  const [isEdit, setIsEdit] = useState(props.id);
  const [categoryList, setCategory] = useState([]);
  const [preview, setPreview] = useState("");
  const [fieldObj, setfieldObj] = useState({});
  const [addNew, setAddNew] = useState(true);
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [price, setPrice] = useState("");
  const [showMin , setShowMin] = useState(0);
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: "It should be valid" },
    nameAr: { error: true, msg: "It should be valid" },
    isRequired: { error: true, msg: "It should be valid" },
    min: { error: true, msg: "It should be valid" },
    max: { error: true, msg: "It should be valid" },
    modifiers: { error: true, msg: "It should be valid" },
  });
  useEffect(() => {
    //   setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
  }, []);

  useEffect(() => {
    if (props.id) {
      props.getModifierById(props.id);
      setIsEdit(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    props.fieldObj && props.fieldObj.id && setfieldObj(props.fieldObj);
    if(props.fieldObj?.id){
      setShowMin(props.fieldObj.max && props.fieldObj.max > 0);
    }
  }, [props.fieldObj]);

  const handleChange = (e, key, value) => {
    console.log(e.target);
    let field = {};
    field[key] = typeof value !== "undefined" ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));

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
      case "min":
      case "max":
        return validateUtility.required(value);
      case "modifiers":
        return value && value.length;
      default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = ["name", "nameAr", "modifiers"];
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
      delete fieldObj.imageUrl;
      delete fieldObj.inStock;
      delete fieldObj.status;
      delete fieldObj.updatedAt;
      delete fieldObj.restaurant;
      if(!showMin){
        fieldObj.max=0;
      }  
      props.updateModifierById(isEdit, fieldObj);
      return;
    }
    if(!showMin){
      fieldObj.max=0;
    }
    props.createModifier(fieldObj);
  };

  const handleSubmit = () => {
    if (!name || !nameAr || !price) {
      return;
    }
    let field = fieldObj["modifiers"] || [];
    field.push({ name: name, price: price, nameAr: nameAr });
    setfieldObj((fieldOb) => ({ ...fieldOb, modifiers: field }));

    let errOb = {};
    errOb["modifiers"] = {
      error: validateField("modifiers", field["modifiers"]),
      msg: errorObj["modifiers"].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));

    setName("");
    setPrice("");
    setNameAr("");
  };
  
  const handleSelectionChange= (e) => {
    if(e.target.value == "select"){
      setfieldObj((fieldOb) => ({ ...fieldOb, max: 0 }));
      setShowMin(false);
    } else{
      setShowMin(true);
    }
  }

  const handleDelete = (index) => {
    let field = fieldObj["modifiers"] || [];
    field.splice(index, 1);
    setfieldObj((fieldOb) => ({ ...fieldOb, modifiers: field }));

    let errOb = {};
    errOb["modifiers"] = {
      error: validateField("modifiers", field["modifiers"]),
      msg: errorObj["modifiers"].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  useEffect(() => {
    setCategory(props.categoryList);
  }, [props.categoryList]);

  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }
  console.log(fieldObj);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" style={{ "margin-top": "10px" }}>
          <CCard>
            <CCardBody>
              <CCol sm="12">
                <CRow>
                  <CCol sm="6">
                    <CFormGroup className="form-group mb-4 px-2">
                      <CLabel className="input-label" htmlFor="name">
                        Name *
                      </CLabel>
                      <CInput
                        className="form-control py-3 pl-3 form-input"
                        id="name"
                        name="name"
                        value={fieldObj.name}
                        onChange={(e) => handleChange(e, "name")}
                        placeholder="Enter name"
                      />
                      {!errorObj.name.error && (
                        <CFormText className="help-block error">
                          {errorObj.name.msg}
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup className="form-group mb-4 px-2">
                      <CLabel className="input-label" htmlFor="nameAr">
                        Name (Arabic) *{" "}
                      </CLabel>
                      <CInput
                        id="nameAr"
                        name="nameAr"
                        value={fieldObj.nameAr}
                        onChange={(e) => handleChange(e, "nameAr")}
                        placeholder="Enter name (arabic)"
                        className="form-control py-3 pl-3 form-input"
                      />
                      {!errorObj.nameAr.error && (
                        <CFormText className="help-block error">
                          {errorObj.nameAr.msg}
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>

                <div class="form-group mb-0 px-2">
                  <label for="modifier-require" class="input-label">
                    Is this required ?
                  </label>
                </div>

                <div class="form-group mb-4 px-2">
                  <div class="form-row">
                    <div class="col-md-4">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="modifier-require-true"
                          checked={fieldObj.required}
                          onChange={(e) => handleChange(e, "isRequired", true)}
                          name="modifier-require"
                          class="custom-control-input"
                        />
                        <label
                          class="custom-control-label"
                          for="modifier-require-true"
                        >
                          required
                        </label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="modifier-require-false"
                          checked={fieldObj.required}
                          onChange={(e) => handleChange(e, "isRequired", false)}
                          name="modifier-require"
                          class="custom-control-input"
                        />
                        <label
                          class="custom-control-label"
                          for="modifier-require-false"
                        >
                          optional
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row px-2">
                  <div class="form-group pl-1 mb-0">
                    <label for="modifier-items-range" class="input-label pl-0">
                      How many items can the customer choose?
                    </label>
                  </div>
                  <CRow style={{marginTop: 10}}>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 mb-4">
                    <select class="form-select" placeholder="Select a range" onChange={(e) => handleSelectionChange(e)} aria-label="Default select example">
                      {/* <option selected>Select A Range</option> */}
                      <option value="select">Select</option>
                      <option value="select arange">Select a range</option>
                    </select>
                  </div>
                  {<div class="col-4 col-sm-4 col-md-4 col-lg-4 mb-4">
                    <input
                      type="number"
                      class="form-control form-input form-input-min"
                      name="min"
                      value={fieldObj.min}
                      onChange={(e) => handleChange(e, "min")}
                      min="1"
                      id="modifier-items-min"
                      placeholder="Min"
                    />
                    {!errorObj.min.error && (
                      <CFormText className="help-block error">
                        {errorObj.min.msg}
                      </CFormText>
                    )}
                  </div>}
                  {Boolean(showMin) && <div class="col-4 col-sm-4 col-md-4 col-lg-4 mb-4">
                    <input
                      type="number"
                      class="form-control form-input form-input-max"
                      value={fieldObj.max}
                      onChange={(e) => handleChange(e, "max")}
                      name="max"
                      min="1"
                      id="modifier-items-max"
                      placeholder="Max"
                    />
                    {!errorObj.max.error && (
                      <CFormText className="help-block error">
                        {errorObj.max.msg}
                      </CFormText>
                    )}
                  </div>}
                  </CRow>
                </div>

                <div class="form-group">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="row justify-content-md-center px-4 py-3 text-body text-center modifier-heading-last">
                        Name (AR)
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="row justify-content-md-center px-4 py-3 text-body text-center modifier-heading-last">
                        Name (EN)
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="row justify-content-md-center px-4 py-3 text-body text-center modifier-heading-last">
                        Price
                      </div>
                    </div>
                    <div class="col-md-1">
                      <div class="row justify-content-md-center px-4 py-3 text-body text-center modifier-heading-last">
                        Action
                      </div>
                    </div>
                  </div>

                  {fieldObj &&
                    fieldObj.modifiers &&
                    fieldObj.modifiers.map((itm, index) => (
                      <div class="row">
                        <div class="col-md-4">
                          <div class="row justify-content-md-center px-4 py-3 text-center">
                            {itm.nameAr}
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="row justify-content-md-center px-4 py-3 text-center">
                            {itm.name}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="row justify-content-md-center px-4 py-3 text-center">
                            ${itm.price}
                          </div>
                        </div>
                        <div class="col-md-1">
                          <div style={{ marginTop: 22, cursor: "pointer" }}>
                            <img
                              src={crossIcon}
                              onClick={() => handleDelete(index)}
                            ></img>
                          </div>
                        </div>
                      </div>
                    ))}
                  {addNew && (
                    <div class="row">
                      <div class="col-md-4">
                        <div class="row justify-content-md-center py-3 px-md-4">
                          <div class="form-group mb-4">
                            <input
                              type="text"
                              value={nameAr}
                              onChange={(e) => setNameAr(e.target.value)}
                              class="form-control py-3 pl-3 form-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="row justify-content-md-center py-3 px-md-4">
                          <div class="form-group mb-4">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              class="form-control py-3 pl-3 form-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="row justify-content-md-center  py-3 px-md-4">
                          <div class="form-group mb-4">
                            <input
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              class="form-control py-3 pl-3 form-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-1">
                        <div
                          onClick={handleSubmit}
                          style={{ marginTop: 22, cursor: "pointer" }}
                        >
                          Add
                          {/* <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                            </div>
                            <div><img
                            alt="Cancel"
                            class="item-dropdown-icon"
                            onClick={() => {
                              setPrice("");
                              setName("");
                              setNameAr("");
                            }}
                            src={crossIcon}
                          />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div class="form-group px-2">
                  <div class="row">
                    <div class="col-md-6 justify-content-md-start modifier-add-btn">
                     </div>
                    {name && price && nameAr && (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={handleSubmit}
                        class="col-md-6 justify-content-md-end text-md-right text-lg-right text-sm-left modifier-add-other-btn"
                      >
                        + Add another item
                      </div>
                    )}
                  </div>
                </div> */}
                <div class="form-group col-3 mx-auto d-flex justify-content-center">
                  {props.modifier_detail_loading ? (
                    <CSpinner />
                  ) : (
                    <CButton
                      className="btn add-dish-btn"
                      color="primary"
                      variant="outline"
                      onClick={handleClick}
                      value="Submit"
                    >
                      {isEdit ? "Update" : "Submit"}
                    </CButton>
                  )}
                </div>
              </CCol>
              <CCol sm="6"></CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Home.loading,
  fieldObj: state.modifier.modifierDetail,
  modifier_detail_loading: state.modifier.modifier_detail_loading,
  modifierDetail: state.modifier.modifierDetail,
});

const mapDispatchToProps = {
  createModifier,
  getModifierById,
  updateModifierById,
};

AddModifier.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddModifier);
