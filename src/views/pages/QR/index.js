import React, { useState } from "react";
import QRCode from "qrcode.react";
import { toJpeg } from "html-to-image";
import * as htmlToImage from "html-to-image";
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow } from "@coreui/react";

const QR = () => {

  const [ fieldObj , setfieldObj ] = useState({
    backgroundColor : "white",
    textColor: "black",
    qrColor : "black",
    textSize : 12
  })

  const restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};

  const handleChange = (e , key , value) => {
        
    let field = {};
    field[key] = value ? value : e.target.value;
    setfieldObj(fieldOb => ({...fieldOb , ...field}))
    
}

  const downloadImage = () => {
    var node = document.getElementById("my-qr");
    htmlToImage.toJpeg(node, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };
  console.log(fieldObj)
  if(!restaurantDetail) {
      return(<div>
          Your restaurant is not approved to generet qr code
      </div>)
  }
  return (
    <>
      <CRow>
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
                {/* <small> Form</small> */}
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
      </CRow>
    </>
  );
};

export default QR;
