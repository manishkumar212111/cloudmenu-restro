import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";

import { getModifierList } from "../../../actions/modifier";
import {
  createProduct,
  getProductById,
  updateProductById,
} from "../../../actions/product";
import { getCategoryList } from "src/actions/category";
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
} from "@coreui/react";
import ImagUpload from "./images/upload-image-icon.svg";

import { Draggable } from "react-drag-reorder";

import CIcon from "@coreui/icons-react";
import CreatableSelect from "react-select/creatable";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "src/API/config";
import AsyncSelect from "react-select/async";
import "./style/item.scss";
import crossIcon from "./images/cross.svg";
import ChooseModifers from "./chooseModifier";
import DragAndDrop from "./DragAndDrop";
const defaultProps = {
  fieldObj: {
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    sellingPrice: "",
    sellingPriceAr: "",
    productImg: "",
    category: "",
    calorie: "",
    modifierGroup: [],
  },
};

const Add = (props) => {
  const [isEdit, setIsEdit] = useState(props.id);
  const [categoryList, setCategory] = useState([]);
  const [preview, setPreview] = useState("");
  const [fieldObj, setfieldObj] = useState({});
  const [openModifier, setModifier] = useState(false);
  const [errorObj, setErrorObj] = useState({
    title: { error: true, msg: "It should be valid" },
    titleAr: { error: true, msg: "It should be valid" },
    description: { error: true, msg: "It should be valid" },
    descriptionAr: { error: true, msg: "It should be valid" },
    sellingPrice: { error: true, msg: "It should be valid" },
    sellingPriceAr: { error: true, msg: "It should be valid" },
    productImg: { error: true, msg: "Product Image is required" },
    category: { error: true, msg: "It should be valid" },
    calorie: { error: true, msg: "It should be valid" },
  });
  useEffect(() => {
    //   setIsEdit(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
  }, []);

  useEffect(() => {
    if (props.id) {
      props.getProductById(props.id);
      setIsEdit(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    if (props.fieldObj && props.fieldObj.id && props.id) {
      setfieldObj(props.fieldObj);
    }
  }, [props.fieldObj ]);

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
    setPreview(objectUrl);
    let errOb = {};
    errOb[key] = {
      error: validateField(key, value ? value : e.target.value),
      msg: errorObj[key].msg,
    };
    setErrorObj((er) => ({ ...er, ...errOb }));
  };
  const handleModifierChange = (value) => {
    let field = fieldObj.modifierGroup || [];
    if (field.map((itm) => itm.id).indexOf(value.value.id) === -1) {
      field.push(value.value);
      setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: field }));
    }
  };

  const handleDelete = (index) => {
    let field = fieldObj.modifierGroup || [];
    field.splice(index, 1);
    setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: field }));
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        let option = { page: 1, limit: 12 };
        if (inputValue) {
          option.name = inputValue;
        }
        props.getModifierList(option, function (res) {
          if (res && res.results && res.results.length) {
            resolve(
              res.results.map((itm) => ({ label: itm.name, value: itm }))
            );
          } else {
            resolve([]);
          }
        });
        // resolve(filterColors(inputValue));
      }, 1000);
    });

  const validateField = (key, value) => {
    value = value ? value : fieldObj[key];
    console.log(key, fieldObj.key);
    switch (key) {
      case "title":
      case "titleAr":
      case "description":
      case "descriptionAr":
      case "sellingPrice":
      case "sellingPriceAr":
      case "calorie":
      case "category":
        return validateUtility.required(value);
      case "productImg":
        return validateUtility.required(fieldObj.imageUrl || value || "");

      default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = [
      "title",
      "titleAr",
      "description",
      "descriptionAr",
      "sellingPrice",
      "productImg",
      "category",
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
      delete fieldObj.imageUrl;
      delete fieldObj.inStock;
      delete fieldObj.status;
      delete fieldObj.updatedAt;
      delete fieldObj.restaurant;

      props.updateProductById(isEdit, {
        ...fieldObj,
        modifierGroup: JSON.stringify(fieldObj.modifierGroup),
      });
      return;
    }
    props.createProduct({
      ...fieldObj,
      modifierGroup: JSON.stringify(fieldObj.modifierGroup),
    });
  };
  useEffect(() => {
    props.getCategoryList();
  }, [props.getCategoryList]);

  useEffect(() => {
    setCategory(props.categoryList);
  }, [props.categoryList]);

  const handleCategoryChange = (inputValue, actionMeta) => {
    if (inputValue && inputValue.value && !inputValue.__isNew__) {
      handleChange("", "category", inputValue.value);
    } else if (inputValue && inputValue.__isNew__) {
      // window.open("/#/category/create?name=" + inputValue.value, "_blank");
    }
  };
  const handleCategoryInputChange = (inputValue, actionMeta) => {};

  const handleModifierSubmit = (modifiers) => {
    setModifier(false);
    let h= [];
    let field = fieldObj.modifierGroup.map(itm => itm.id == modifiers.id ? h.push(modifiers) : h.push(itm));
    setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: h }));
    
  }
  if (props.loading) {
    return (
      <CSpinner
        color="primary"
        style={{ width: "4rem", height: "4rem", margin: "30% 50%" }}
      />
    );
  }

  console.log(fieldObj, preview);

  const handleDragAndDrop = (newItem) => {
    setfieldObj((fieldOb) => ({ ...fieldOb, modifierGroup: newItem }));
  }
  const renderModifier= (item) => {
    let h= [];
    {item &&
      item.map((itm, index) => (
        h.push(<>
          <div class="form-group px-2 pt-2">
            <div class="mb-4">
              <div class="dropdown">
                <button
                  class="btn saucedropdown-toggle dropdown-toggle form-input pl-3 dish-modifier-items-range-dropdown-btn"
                  id="dropdownMenuButton"
                >
                  <span onClick={() => setModifier(itm)}>
                    {itm.name}
                  </span>
                  <img
                    onClick={() => handleDelete(index)}
                    src={crossIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    class="cross-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </>)
      ))}
      return h;
  }
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="title">Title *</CLabel>
                    <CInput
                      id="title"
                      name="title"
                      value={fieldObj.title}
                      onChange={(e) => handleChange(e, "title")}
                      placeholder="Enter title"
                    />
                    {!errorObj.title.error && (
                      <CFormText className="help-block error">
                        {errorObj.title.msg}
                      </CFormText>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="titleAr">title (Arabic) * </CLabel>
                    <CInput
                      id="titleAr"
                      name="titleAr"
                      value={fieldObj.titleAr}
                      onChange={(e) => handleChange(e, "titleAr")}
                      placeholder="Enter title (arabic)"
                    />
                    {!errorObj.titleAr.error && (
                      <CFormText className="help-block error">
                        {errorObj.titleAr.msg}
                      </CFormText>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="titleAr">Select Category * </CLabel>
                    <CreatableSelect
                      isClearable
                      onChange={handleCategoryChange}
                      onInputChange={handleCategoryInputChange}
                      value={categoryList.map(
                        (itm) =>
                          itm.id == fieldObj.category && {
                            label: itm.name,
                            value: itm.id,
                          }
                      )}
                      options={categoryList.map((itm) => ({
                        label: itm.name,
                        value: itm.id,
                      }))}
                    />
                    {/* <CInput id="titleAr" name="titleAr" value={fieldObj.titleAr} onChange={(e) => handleChange(e , 'titleAr')} placeholder="Enter title (arabic)" /> */}
                    {!errorObj.titleAr.error && (
                      <CFormText className="help-block error">
                        {errorObj.titleAr.msg}
                      </CFormText>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="description">Description * </CLabel>
                    <CTextarea
                      id="description"
                      name="description"
                      value={fieldObj.description}
                      onChange={(e) => handleChange(e, "description")}
                      placeholder="Enter description"
                    />
                    {!errorObj.description.error && (
                      <CFormText className="help-block error">
                        {errorObj.description.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="descriptionAr">
                      Description (Arabic) *{" "}
                    </CLabel>
                    <CTextarea
                      id="descriptionAr"
                      name="descriptionAr"
                      value={fieldObj.descriptionAr}
                      onChange={(e) => handleChange(e, "descriptionAr")}
                      placeholder="Enter Description ( Arabic )"
                    />
                    {!errorObj.descriptionAr.error && (
                      <CFormText className="help-block error">
                        {errorObj.descriptionAr.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="sellingPrice">Price * </CLabel>
                    <CInput
                      type="text"
                      id="sellingPrice"
                      name="sellingPrice"
                      value={fieldObj.sellingPrice}
                      onChange={(e) => handleChange(e, "sellingPrice")}
                      placeholder="Enter Selling Price"
                    />
                    {!errorObj.sellingPrice.error && (
                      <CFormText className="help-block error">
                        {errorObj.sellingPrice.msg}
                      </CFormText>
                    )}
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="calorie">Calorie (per unit) </CLabel>
                    <CInput
                      type="number"
                      id="calorie"
                      name="calorie"
                      value={fieldObj.calorie}
                      onChange={(e) => handleChange(e, "calorie")}
                      placeholder="Enter calorie"
                    />
                    {!errorObj.calorie.error && (
                      <CFormText className="help-block error">
                        {errorObj.calorie.msg}
                      </CFormText>
                    )}
                  </CFormGroup>
                  
                  {/* <CFormGroup>
                    <CLabel htmlFor="sellingPriceAr">Price (Arabic) *</CLabel>
                    <CInput
                      id="sellingPriceAr"
                      name="sellingPriceAr"
                      value={fieldObj.sellingPriceAr}
                      onChange={(e) => handleChange(e, "sellingPriceAr")}
                      placeholder="Enter Selling Price"
                    />
                    {!errorObj.sellingPriceAr.error && (
                      <CFormText className="help-block error">
                        {errorObj.sellingPriceAr.msg}
                      </CFormText>
                    )}
                  </CFormGroup> */}
                  <div class="form-group mb-4">
                    <CLabel htmlFor="sellingPriceAr">Product Image *</CLabel>
                    <div class="col-lg-8 col-md-10 col-sm-11 col-11 px-0 imageUploadInput-container">
                      <input
                        class="form-control imageUploadInput"
                        type="file"
                        id="productImg"
                        name="productImg"
                        onChange={(e) => handleFileUpload(e, "productImg")}
                      />
                      <div
                        style={{ width: 260, height: 130 }}
                        class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={
                            preview
                              ? preview
                              : (fieldObj.imageUrl
                              ? BASE_URL + fieldObj.imageUrl
                              : ImagUpload)
                          }
                          alt=""
                          style={{ width: 260, height: 130 }}
                          class="restaurantLogoUploadBackground-icon"
                        />
                      </div>
                    </div>
                    {!errorObj.productImg.error && (
                      <CFormText className="help-block error">
                        {errorObj.productImg.msg}
                      </CFormText>
                    )}
                  </div>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="productImg">Select Modifiers </CLabel>

                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={promiseOptions}
                      onChange={handleModifierChange}
                    />
                  </CFormGroup>
                      <DragAndDrop htmlContent={renderModifier(fieldObj.modifierGroup)} items={fieldObj.modifierGroup}  handleChange={handleDragAndDrop}/>
                  
                </CCol>
                <div class="form-group col-3 mx-auto d-flex justify-content-center">
                  {props.product_detail_loading ? (
                    <CSpinner />
                  ) : (
                    <button
                      type="button"
                      class="btn add-dish-btn"
                      onClick={handleClick}
                    >
                      {isEdit ? "UPDATE" : "SUBMIT"}
                    </button>
                  )}
                </div>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {openModifier && (
          <CModal
            show={openModifier}
            className="add-temp"
            onClose={setModifier}
          >
            <CModalHeader closeButton>
              <div class="col add-dish-header">Custumise Modifier</div>
            </CModalHeader>
            <CModalBody>
              <ChooseModifers
                handleSubmit={handleModifierSubmit}
                itm={openModifier}
              />
            </CModalBody>
          </CModal>
        )}
      </CRow>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Home.loading,
  fieldObj: state.product.productDetail,
  product_detail_loading: state.product.product_detail_loading,
  categoryList: state.category.categoryList,
  productDetail: state.product.productDetail,
  modifierList: state.modifier.modifierList,
  ModifierLoading: state.modifier.modifier_detail_loading,
});

const mapDispatchToProps = {
  createProduct,
  getProductById,
  updateProductById,
  getCategoryList,
  getModifierList,
};

Add.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Add);
