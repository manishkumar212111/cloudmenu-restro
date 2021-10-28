import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

import { toJpeg } from "html-to-image";
import * as htmlToImage from "html-to-image";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import "./index.scss";
import { t } from "src/utils/language";
const QR = () => {
  let ref= useRef();
  const [loading, setLoading] = useState(false);
  const [fieldObj, setfieldObj] = useState({
    backgroundColor: "white",
    qrBackgroundColor: "white",
    textColor: "red",
    qrColor: "black",
    textSize: 16,
    text: "Qr Text Here",
    layoutSize: 420
  });

  useEffect(() => {
    if(localStorage.getItem("qrConfig")){
      setfieldObj(fld => ({...fld, ...JSON.parse(localStorage.getItem("qrConfig"))}))
    }
  }, [localStorage.getItem("qrConfig")])
  const restaurantDetail =
    localStorage.getItem("userDetail") &&
    JSON.parse(localStorage.getItem("userDetail"))
      ? JSON.parse(localStorage.getItem("userDetail")).restaurant
      : {};

  const handleChange = (e, key, value) => {
    let field = {};
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));
    localStorage.setItem("qrConfig", JSON.stringify({ ...fieldObj, ...field }) );
  };
  useEffect(() => {
      let userDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).user: {};
      let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
      
        if(!(userDetail.status && restaurantDetail && restaurantDetail.status)){
          if(!restaurantDetail?.id){
            window.location.href = '/';
            return;
          }
          window.location.href = '/#/profile/update';
        }
  }, [])

  const downloadImage = () => {
    setLoading(true);
    // var node = document.getElementById("my-qr");
    // htmlToImage.toJpeg(node, { quality: 0.9 }).then(function (dataUrl) {
    //   console.log(dataUrl)
    //   var link = document.createElement("a");
    //   link.download = "my-image-name.jpeg";
    //   link.href = dataUrl;
    //   link.click();
    // setLoading(false);

    // });

    exportComponentAsPNG(ref , { html2CanvasOptions: {backgroundColor: fieldObj.backgroundColor , borderRadius: 10, width: parseInt(fieldObj.layoutSize) + 15} });
    setLoading(false);

  };

  const printDiv = (divName) => {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
  }

  const mobileCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }

  console.log(fieldObj);
  if (!restaurantDetail) {
    return <div>{t("Your restaurant is not approved to generete qr code")}</div>;
  }
  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="row px-4 restaurant-details-container1 d-flex">
            <div class="col-12 col-xl-6 restaurant-details-form-container py-3 bg-white mb-4 mb-xl-0">
              <div class="row restaurant-details-form-heading py-3 px-4">
                {t("Generate QR code")}
              </div>

              <div class="row py-4">
                <div class="col-12 px-4">
                  <div class="form-group mb-4">
                    <label for="table-no" class="input-label">
                      {t("Table Number")}
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="tableNo"
                      name="tableNo"
                      value={fieldObj.tableNo}
                      onChange={(e) => handleChange(e, "tableNo")}
                      placeholder={t("Enter Table No")}
                    />
                  </div>

                  <div class="form-group mb-4">
                    <label for="qr-text" class="input-label">
                      {t("Text")}
                    </label>
                    <input
                      id="text"
                      class="form-control py-2 pl-3 form-input"
                      name="text"
                      value={fieldObj.text}
                      onChange={(e) => handleChange(e, "text")}
                      placeholder={t("Add text on QR")}
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-4 px-4">
                  <div class="form-group mb-5">
                    <label for="textcolor" class="input-label mb-3">
                      {t("Text Color")}
                    </label>
                    <input
                      class="form-control form-input color-picker"
                      type="color"
                      id="textColor"
                      name="textColor"
                      value={fieldObj.textColor}
                      onChange={(e) => handleChange(e, "textColor")}
                      placeholder={t("Enter text color")}
                    />
                  </div>
                </div>
                <div class="col-4 px-4">
                 
                <div class="form-group mb-5">
                    <label for="textsize" class="input-label mb-3">
                      {t("Text Size")}{" "}
                    </label>
                    <input
                      class="form-control py-2 pl-3 form-input"
                      type="Number"
                      id="textSize"
                      name="textSize"
                      value={fieldObj.textSize}
                      onChange={(e) => handleChange(e, "textSize")}
                      placeholder={t("Enter text size")}
                    />
                  </div>
                </div>

                <div class="col-4 px-4">
                 
                <div class="form-group mb-5">
                    <label for="textsize" class="input-label mb-3">
                      {t("Layout Size")}
                    </label>
                    <input
                      class="form-control py-2 pl-3 form-input"
                      type="Number"
                      id="layoutSize"
                      name="layoutSize"
                      min="250"
                      max="600"
                      value={fieldObj.layoutSize}
                      onChange={(e) => parseInt(e.target.value) < 601 && handleChange(e, "layoutSize")}
                      placeholder={t("Enter layout size")}
                    />
                  </div>
                </div>

              </div>
              <div class="row mt-4">
              <div class="col-4 px-4">

                <div class="form-group mb-5">
                    <label for="bgcolor" class="input-label mb-3">
                      {t("Background Color")}
                    </label>
                    <input
                      class="form-control form-input color-picker"
                      type="color"
                      id="backgroundColor"
                      name="backgroundColor"
                      value={fieldObj.backgroundColor}
                      onChange={(e) => handleChange(e, "backgroundColor")}
                      placeholder="Enter text size"
                    />
                  </div>
                  </div>
                  <div class="col-3 px-4">
                    <div class="form-group mb-5">
                      <label for="qrcolor" class="input-label mb-3">
                        {t("QR Color")}
                      </label>
                      <input
                        class="form-control form-input color-picker"
                        type="color"
                        id="qrColor"
                        name="qrColor"
                        value={fieldObj.qrColor}
                        onChange={(e) => handleChange(e, "qrColor")}
                      />
                    </div>
                  </div>
                  <div class="col-5 px-4">
                    <div class="form-group mb-5">
                      <label for="qrcolor" class="input-label mb-3">
                        {t("QR Background Color")}
                      </label>
                      <input
                        class="form-control form-input color-picker"
                        type="color"
                        id="qrBackgroundColor"
                        name="qrBackgroundColor"
                        value={fieldObj.qrBackgroundColor}
                        onChange={(e) => handleChange(e, "qrBackgroundColor")}
                      />
                    </div>
                  </div>
              </div>
              {/* <div class="form-group d-flex justify-content-center mt-4">
                <button type="button" class="btn update-btn">
                  {t("GENERATE QR")}
                </button>
              </div> */}
            </div>
            <div class={`col-12 col-xl-5 restaurant-details-right-container `} style={{maxWidth: "inherit"}}>
              <div class="row restaurant-details-right-container-plan bg-white  py-5 px-4" style={{ }}>
                
                <div
                  ref={ref}
                    style={{ backgroundColor: fieldObj.backgroundColor , borderRadius: 10, width: parseInt(fieldObj.layoutSize)}}
                    id="my-qr"
                  class="row m-auto"
                >
                  <div
                    style={{backgroundColor: fieldObj.backgroundColor, width: parseInt(fieldObj.layoutSize) }}
                    class="qr-container py-4 px-4"
                    
                  
                  >
                    <div class="col-12">
                      <div
                        style={{
                          color: fieldObj.textColor,
                          fontSize: parseInt(fieldObj.textSize),
                        }}
                        class="qr-text text-center py-4"
                      >
                        {fieldObj.text}
                      </div>
                      <div style={{ padding: 15, backgroundColor: fieldObj.qrBackgroundColor, borderRadius: 10 }}>
                        <QRCode
                          value={`http://restaurant.cloudmenu.sa/${restaurantDetail.id}/${Math.floor(100000 + Math.random() * 9000000000)}/${fieldObj.tableNo}`}
                          className="qr-img"
                          size="300"
                          level="H"
                          fgColor={fieldObj.qrColor}
                        />
                      </div>
                      {fieldObj.tableNo && (
                        <div
                          class="tbl-no text-center py-4"
                          style={{
                            color: fieldObj.textColor,
                            fontSize: parseInt(fieldObj.textSize),
                          }}
                        >
                          {t("Table Number")} : {fieldObj.tableNo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div class="form-group d-flex justify-content-center mt-4">
                  {loading ? <CSpinner /> : <button
                    type="button"
                    // onClick={() => }
                    onClick={downloadImage}
                    class="btn update-btn"
                  >
                    {t("DOWNLOAD QR")}
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <CRow>
        <CCol sm="12" lg="6">
          <CCard>
            <CCardHeader>
                Generate QR code
            </CCardHeader>
            <CCardBody>
                <CFormGroup>
                    <CLabel htmlFor="tableNo">Table Number</CLabel>
                    <CInput id="tableNo" name="tableNo" value={fieldObj.tableNo} onChange={(e) => handleChange(e , 'tableNo')} placeholder="Enter Table No" />
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor="text">Text</CLabel>
                    <CInput id="text" name="text" value={fieldObj.text} onChange={(e) => handleChange(e , 'text')} placeholder="Enter text" />
                </CFormGroup>
                <CRow>
                    <CCol lg="6">
                        <CFormGroup>
                            <CLabel htmlFor="textColor">Text Color</CLabel>
                            <CInput style={{padding : 0, width:40, height:40}} type="color" id="textColor" name="textColor" value={fieldObj.textColor} onChange={(e) => handleChange(e , 'textColor')} placeholder="Enter text color" />
                        </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                        <CFormGroup>
                            <CLabel htmlFor="textSize">Text Size</CLabel>
                            <CInput type="Number" id="textSize" name="textSize" value={fieldObj.textSize} onChange={(e) => handleChange(e , 'textSize')} placeholder="Enter text size" />
                        </CFormGroup>

                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">                    
                        <CFormGroup>
                            <CLabel htmlFor="backgroundColor">Background Color</CLabel>
                            <CInput style={{padding : 0, width:40, height:40}} type="color" id="backgroundColor" name="backgroundColor" value={fieldObj.backgroundColor} onChange={(e) => handleChange(e , 'backgroundColor')} placeholder="Enter text size" />
                        </CFormGroup>
                    </CCol>
                    <CCol lg="6">
                        <CFormGroup>
                            <CLabel htmlFor="qrColor">QR color</CLabel>
                            <CInput style={{padding : 0, width:40, height:40}} type="color" id="qrColor" name="qrColor" value={fieldObj.qrColor} onChange={(e) => handleChange(e , 'qrColor')} />
                        </CFormGroup>
                    </CCol>
                </CRow>

            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" lg="6">
          <CCol sm="12" lg="6">
            <CCard>
              <CCardHeader>
                QR code
              </CCardHeader>
              <CCardBody>
                <div id="my-qr" style={{backgroundColor : fieldObj.backgroundColor}}>
                  <p style={{color : fieldObj.textColor,  fontSize: parseInt(fieldObj.textSize)}}>{fieldObj.text}</p>
                  <QRCode value={`https://arcane-citadel-48750.herokuapp.com/${restaurantDetail.id}/${fieldObj.tableNo}`} size="300" fgColor={fieldObj.qrColor}/><br></br>
                  {fieldObj.tableNo && <p style={{color : fieldObj.textColor,  fontSize: parseInt(fieldObj.textSize)}}>
                    Table Number : {fieldObj.tableNo}
                  </p>}  
                </div>
              </CCardBody>
              <CCardFooter>
                <button onClick={downloadImage}>Download QR</button>
              </CCardFooter>      
            </CCard>
          </CCol>
        </CCol>
      </CRow> */}
    </>
  );
};

export default QR;
