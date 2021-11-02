import React, { Fragment } from "react";
import QRCode from "qrcode.react";
import { t } from "src/utils/language";

const QRComponent = React.forwardRef((props, ref) => {
  const fieldObj = props.fieldObj;
  const restaurantDetail = props.restaurantDetail;
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: fieldObj.backgroundColor,
        borderRadius: 10,
        width: parseInt(fieldObj.layoutSize ),
      }}
      
      class=" m-auto"
    >
      <div
        id="my-qr"
        style={{
          backgroundColor: fieldObj.backgroundColor,
          width: parseInt(fieldObj.layoutSize),
        }}
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
          <div
            style={{
              padding: 15,
              backgroundColor: fieldObj.qrBackgroundColor,
              borderRadius: 10,
            }}
          >
            <QRCode
              value={`http://restaurant.cloudmenu.sa/${
                restaurantDetail.id
              }/${Math.floor(100000 + Math.random() * 9000000000)}/${
                fieldObj.tableNo
              }`}
              className="qr-img"
              size="300"
              level="H"
              fgColor={fieldObj.qrColor}
            />
          </div>
          {
            <div
              class="tbl-no text-center py-4"
              style={{
                color: fieldObj.textColor,
                fontSize: parseInt(fieldObj.textSize),
              }}
            >
              {fieldObj.tableNo && `${t("Table Number")} : ${fieldObj.tableNo}`}
            </div>
          }
        </div>
      </div>
    </div>
  );
});

export default QRComponent;
