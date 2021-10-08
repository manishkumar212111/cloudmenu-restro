import React, { useEffect, useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
// import CKEditor from "ckeditor4-react";
import "./category.scss";

import {
  createCategory,
  getCategoryById,
  updateCategoryById,
} from "../../../actions/category";
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
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";

const defaultProps = {
  fieldObj: {
    name: "",
    nameAr: ""
  },
};

const CategoryForm = (props) => {
  const [isEdit, setIsEdit] = useState(
    props.match && props.match.params && props.match.params.id
      ? props.match.params.id
      : false
  );
  console.log(props);

  const [fieldObj, setfieldObj] = useState({
    ...defaultProps.fieldObj,
    name: props.location?.search.split("=")[1],
  });
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: "It should be valid" },
    nameAr: { error: true, msg: "It should be valid" },
  });
  useEffect(() => {
    typeof props.id ? setIsEdit(props.id) : setIsEdit('');
    setfieldObj(ct => ({}));
  }, [props]);

  useEffect(() => {
    if (isEdit) {
      props.getCategoryById(isEdit);
    }
  }, [isEdit]);

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
        return validateUtility.required(value);
      case "nameAr":
        return validateUtility.required(value);
        default:
        return true;
    }
  };

  const handleClick = () => {
    let requiredObj = ["name", "nameAr"];
    let errOb = errorObj;

    let status = true;
    requiredObj.forEach((element) => {
      let errorStatus = validateField(element);
      errOb[element].error = errorStatus;
      status = status && errorStatus;
    });
    setErrorObj((errorOb) => ({ ...errorOb, errOb }));
    console.log(status);
    if (!status) return;

    if (isEdit) {
      delete fieldObj.id;
      delete fieldObj.createdAt;
      props.updateCategoryById(isEdit, { name: fieldObj.name , nameAr: fieldObj.nameAr});
      return;
    }
    props.createCategory({ name: fieldObj.name, nameAr: fieldObj.nameAr});
  };

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="form-group mb-5 px-2">
            <label for="category-name" class="input-label">
              Category Name (English) *
            </label>

            <CInput
              id="name"
              class="form-control py-3 pl-3 form-input"
              name="name"
              value={fieldObj.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Enter category name"
            />
            {!errorObj.name.error && (
              <CFormText className="help-block error">
                {errorObj.name.msg}
              </CFormText>
            )}
          </div>
          <div class="form-group mb-5 px-2">
            <label for="category-name" class="input-label">
              Category Name (Arabic)*
            </label>

            <CInput
              id="name"
              class="form-control py-3 pl-3 form-input"
              name="nameAr"
              value={fieldObj.nameAr}
              onChange={(e) => handleChange(e, "nameAr")}
              placeholder="Enter category name"
            />
            {!errorObj.name.error && (
              <CFormText className="help-block error">
                {errorObj.nameAr.msg}
              </CFormText>
            )}
          </div>
          <div class="form-group col-6 mx-auto">
            {props.loading ? (
              <>
                <CSpinner />
              </>
            ) : (
              <CButton
                block
                class="btn add-category-btn"
                color="primary"
                variant="outline"
                onClick={handleClick}
                value="Submit"
              >
                {isEdit ? "Update" : "Submit"}
              </CButton>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.category.category_detail_loading,
  fieldObj: state.category.categoryDetail,
  categoryOnbordingMessage: state.category.categoryOnbordingMessage,
});

const mapDispatchToProps = {
  createCategory,
  getCategoryById,
  updateCategoryById,
};

CategoryForm.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
