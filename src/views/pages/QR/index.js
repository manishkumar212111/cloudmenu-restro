import React, { useState } from "react";
import QRCode from "qrcode.react";
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
} from "@coreui/react";
import "./index.scss";
const QR = () => {
  const [fieldObj, setfieldObj] = useState({
    backgroundColor: "white",
    qrBackgroundColor: "white",
    textColor: "red",
    qrColor: "black",
    textSize: 16,
    text: "Qr Text Here",
    layoutSize: 520
  });

  const restaurantDetail =
    localStorage.getItem("userDetail") &&
    JSON.parse(localStorage.getItem("userDetail"))
      ? JSON.parse(localStorage.getItem("userDetail")).restaurant
      : {};

  const handleChange = (e, key, value) => {
    let field = {};
    field[key] = value ? value : e.target.value;
    setfieldObj((fieldOb) => ({ ...fieldOb, ...field }));
  };

  const downloadImage = () => {
    var node = document.getElementById("my-qr");
    htmlToImage.toJpeg(node, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  const printDiv = (divName) => {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
  }

  console.log(fieldObj);
  if (!restaurantDetail) {
    return <div>Your restaurant is not approved to generet qr code</div>;
  }
  return (
    <>
      <div class="row">
        <div class="col-10">
          <div class="row py-5 px-5 restaurant-details-container d-flex">
            <div class="col-6 restaurant-details-form-container py-3 bg-white">
              <div class="row restaurant-details-form-heading py-3 px-4">
                Generate QR code
              </div>

              <div class="row py-4">
                <div class="col-12 px-4">
                  <div class="form-group mb-4">
                    <label for="table-no" class="input-label">
                      Table Number
                    </label>
                    <input
                      type="text"
                      class="form-control py-2 pl-3 form-input"
                      id="tableNo"
                      name="tableNo"
                      value={fieldObj.tableNo}
                      onChange={(e) => handleChange(e, "tableNo")}
                      placeholder="Enter Table No"
                    />
                  </div>

                  <div class="form-group mb-4">
                    <label for="qr-text" class="input-label">
                      Text
                    </label>
                    <input
                      id="text"
                      class="form-control py-2 pl-3 form-input"
                      name="text"
                      value={fieldObj.text}
                      onChange={(e) => handleChange(e, "text")}
                      placeholder="add text on QR"
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-4 px-4">
                  <div class="form-group mb-5">
                    <label for="textcolor" class="input-label mb-3">
                      Text Color
                    </label>
                    <input
                      class="form-control form-input color-picker"
                      type="color"
                      id="textColor"
                      name="textColor"
                      value={fieldObj.textColor}
                      onChange={(e) => handleChange(e, "textColor")}
                      placeholder="Enter text color"
                    />
                  </div>
                </div>
                <div class="col-4 px-4">
                 
                <div class="form-group mb-5">
                    <label for="textsize" class="input-label mb-3">
                      Text Size{" "}
                    </label>
                    <input
                      class="form-control py-2 pl-3 form-input"
                      type="Number"
                      id="textSize"
                      name="textSize"
                      value={fieldObj.textSize}
                      onChange={(e) => handleChange(e, "textSize")}
                      placeholder="Enter text size"
                    />
                  </div>
                </div>

                <div class="col-4 px-4">
                 
                <div class="form-group mb-5">
                    <label for="textsize" class="input-label mb-3">
                      Layout Size
                    </label>
                    <input
                      class="form-control py-2 pl-3 form-input"
                      type="Number"
                      id="layoutSize"
                      name="layoutSize"
                      min="250"
                      max="900"
                      value={fieldObj.layoutSize}
                      onChange={(e) => handleChange(e, "layoutSize")}
                      placeholder="Enter layout size"
                    />
                  </div>
                </div>

              </div>
              <div class="row mt-4">
              <div class="col-4 px-4">

                <div class="form-group mb-5">
                    <label for="bgcolor" class="input-label mb-3">
                      Background Color
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
                        QR Color
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
                        QR Background Color
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
              <div class="form-group d-flex justify-content-center mt-4">
                <button type="button" class="btn update-btn">
                  GENERATE QR
                </button>
              </div>
            </div>
            <div class={`col-5 restaurant-details-right-container `} >
              <div class="row restaurant-details-right-container-plan bg-white py-5 px-4" style={{width: parseInt(fieldObj.layoutSize) }}>
                <div
                  id="my-qr"
                  style={{ backgroundColor: fieldObj.backgroundColor, borderRadius: 10 }}
                  class="row qr-container m-auto py-4"
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
                        value={`https://arcane-citadel-48750.herokuapp.com/${restaurantDetail.id}/${fieldObj.tableNo}`}
                        className="qr-img"
                        size="300"
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
                        Table Number : {fieldObj.tableNo}
                      </div>
                    )}
                  </div>
                </div>
                <div class="form-group d-flex justify-content-center mt-4">
                  <button
                    type="button"
                    onClick={downloadImage}
                    class="btn update-btn"
                  >
                    DOWNLOAD QR
                  </button>
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
