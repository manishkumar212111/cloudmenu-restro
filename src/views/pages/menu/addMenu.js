import React, { useState } from "react";
import { createMenu } from "src/actions/menu";
import "./style/addMenu.scss";
import { connect } from "react-redux";
import ImagUpload from "./images/upload-image-icon.svg";
import validateUtility from "src/utils/ValidateUtility";
import { BASE_URL } from "src/API/config";
import { CFormText, CSpinner } from "@coreui/react";
import Setting from "./setting";
import { t } from "src/utils/language";

const bannerImg = [
  "https://ik.imagekit.io/lcq5etn9k/restro/banner/banner4_r3DuezKF5.png",
  "https://ik.imagekit.io/lcq5etn9k/restro/banner/banner3_bCTJZejGs_.png",
  "https://ik.imagekit.io/lcq5etn9k/restro/banner/banner2_ndlrfFHL-.png",
  "https://ik.imagekit.io/lcq5etn9k/restro/banner/banner1_dTE0QtxYOX.png",
];
const defaultProps = {
  fieldObj: {
    name: "",
    bannerImage: "",
    coverImage: "",
  },
};

const AddMenu = (props) => {
  const [fieldObj, setfieldObj] = useState(defaultProps.fieldObj);
  const [preview, setPreview] = useState("");
  const [step , setStep] = useState(0);
  const [errorObj, setErrorObj] = useState({
    name: { error: true, msg: t("It should be valid") },
    bannerImage: { error: true, msg: t("It should be valid") },
    coverImage: { error: true, msg: t("It should be valid") },
  });

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
    field['bannerImage'] = '';
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

  const validateField = (key, value) => {
    value = value ? value : fieldObj[key];
    console.log(key, fieldObj.key);
    switch (key) {
      case "name":
      case "bannerImage":
        return validateUtility.required(value || fieldObj.coverImage);
      case "coverImage":
        return validateUtility.required(fieldObj.coverImage || fieldObj.bannerImage || value || "");

      default:
        return true;
    }
  };
  const handleClick = () => {
    let requiredObj = ["name", "bannerImage", 'coverImage'];
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

    setStep(1);
    // props.createMenu({
    //   ...fieldObj,
    // });
  };

  const handleImageSelect = (itm) => {
    setPreview(itm);
    let field = {};
    field['coverImage'] = '';
    field['bannerImage'] = itm;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));
  }
  const createMenu = (field) => {
    props.createMenu({
      ...fieldObj, settings: JSON.stringify(field)
    });
  }
  console.log(fieldObj);
  return (
    step == 0 ? <>
      <div class="form-group mb-4 px-2 addMenu">
        <label for="menu-name" class="input-label">
          {t("Menu Name")}
        </label>
        <input
          type="text"
          class="form-control py-3 pl-3 form-input"
          name="name"
          value={fieldObj.name}
          onChange={(e) => handleChange(e, "name")}
          placeholder={t("Enter menu name")}
        />
        {!errorObj.name.error && (
          <CFormText className="help-block error">
            {errorObj.name.msg}
          </CFormText>
        )}
      </div>

      <div class="form-group mb-4 px-2">
        <label for="createMenuImageUpload" class="form-label input-label">
          {t("Upload Image")}
        </label>
        <div class="imageUploadInput-container col-lg-5 col-md-5 col-sm-8 col-8 px-0">
          <input
            class="form-control imageUploadInput"
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={(e) => handleFileUpload(e, "coverImage")}
          />
          <div class="restaurantLogoUploadBackground d-flex justify-content-center align-items-center">
            <img
              src={preview
                ? preview
                : (fieldObj.coverImage
                ? fieldObj.coverImage
                : ImagUpload)}
              alt=""
              class="restaurantLogoUploadBackground-icon"
            />
          </div>
        </div>
        {!errorObj.coverImage.error && (
            <CFormText className="help-block error">
            {errorObj.coverImage.msg}
            </CFormText>
        )}
        {/* <div class="col-lg-5 col-md-5 col-sm-8 col-8 px-0">
          <input
            class="form-control imageUploadInput"
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={(e) => handleFileUpload(e, "coverImage")}
          
          />
          <div class="imageUploadInputBackground d-flex justify-content-center align-items-center">
            <img
              src={preview
                ? preview
                : (fieldObj.coverImage
                ? fieldObj.coverImage
                : ImagUpload)}
              alt=""
              class="imageUploadInputBackground-icon"
            />
          </div>
          
        </div> */}
      </div>

      <div class="form-group mb-4 px-2">
        <label class="form-label input-label">{t("Choose Banner")}</label>
      </div>

      <div class="form-group d-flex justify-content-space-between mb-4 add-menu-images">
        {bannerImg.map((itm) => (
          <>
            <img
              onClick={() => handleImageSelect(itm)}
              src={itm}
              class="banner-img mx-auto d-inline mb-3"
              alt="..."
              style={
                fieldObj.bannerImage == itm ? { borderRadius: "2.25rem" } : {}
              }
            />
          </>
        ))}
        {!errorObj.bannerImage.error && (
          <CFormText className="help-block error">
            {errorObj.bannerImage.msg}
          </CFormText>
        )}
      </div>

      <div class="form-group col-6 mx-auto">
        {props.menu_detail_loading ? (
          <CSpinner />
        ) : (
          <button onClick={handleClick} type="button" class="btn add-dish-btn">
            {t("NEXT")}
          </button>
        )}
      </div>
    </> : <>
          <Setting loading={props.menu_detail_loading} submitCb={createMenu} />
    </>
  );
};

const mapStateToProps = (state) => ({
  menu_detail_loading: state.menu.menu_detail_loading,
});

const mapDispatchToProps = {
  createMenu,
};

AddMenu.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddMenu);
