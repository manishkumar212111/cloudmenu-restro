import React from "react";
import "./detail.scss";
const Detail = (props) => {
  const getSingleProductCount = (finalProduct) => {
    console.log(finalProduct);
    let obj = {
      count: 0,
      price: 0,
    };
    obj.price = parseInt(finalProduct.price);
    finalProduct &&
      finalProduct.modifiers &&
      Object.keys(finalProduct.modifiers).map((itm) =>
        finalProduct.modifiers[itm].map((item) => {
          obj.price += parseInt(item.price);
        })
      );
    obj.price = obj.price * finalProduct.qty;
    return obj;
  };
  console.log(props);
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 py-3 order-details-container">
        <div className="row py-4">
          <div className="col-2 text-center order-col-heading">Quantity</div>

          <div className="col-3 text-center order-col-heading">Dish</div>

          <div className="col-5 text-center order-col-heading">Addons</div>

          <div className="col-2 text-center order-col-heading">Price</div>
        </div>
        {props.productDetail &&
          Object.keys(props.productDetail.products).map((itm) =>
            Object.keys(props.productDetail.products[itm]).map((item) => (
              <div className="row py-4 mb-3">
                <div className="col-2 text-center order-col-value">
                  {props.productDetail.products[itm][item].qty}
                </div>

                <div className="col-3 text-center order-col-value">
                  {props.productDetail.products[itm][item].title}
                </div>

                <div className="col-5 text-center order-col-value">
                  {/* Size- Medium Toppings- Extra Cheese, Tomato, Onion, Corn */}
                  {props.productDetail.products[itm][item].modifiers &&
                    Object.keys(
                      props.productDetail.products[itm][item].modifiers
                    ).map((data) => (
                      <>
                        {data} :{" "}
                        {props.productDetail.products[itm][item].modifiers[data]
                          .map((dta) => dta.title)
                          .join(", ")}
                        ,{" "}
                      </>
                    ))}
                </div>

                <div className="col-2 text-center order-col-value">
                  SR{" "}
                  {
                    getSingleProductCount(
                      props.productDetail.products[itm][item]
                    ).price
                  }{" "}
                </div>
              </div>
            ))
          )}
        <hr />
        <div class="row">

          <div class="col-8 text-center order-col-value"></div>

          <div class="col-2 text-right order-col-value">Sub Total</div>

          <div class="col-2 text-center ">
            SR {props.productDetail.subTotalAmount}
          </div>
        </div>

        <div class="row">

          <div class="col-8 text-center order-col-value"></div>

          <div class="col-2 text-right order-col-value">Tax</div>

          <div class="col-2 text-center ">
            SR {props.productDetail.tax}
          </div>
        </div>

        <div class="row py-4">
          <div class="col-8 text-center order-col-value"></div>

          <div class="col-2 text-right order-col-value"><b>Total</b></div>

          <div class="col-2 text-center order-col-total">
            SR {props.productDetail.totalAmount}
          </div>
        </div>

        <div className="mb-2 order-last-heading px-3">Payment Method</div>
        <div className="order-last-value px-3 mb-4">
          {props.productDetail.paymentType}
        </div>

        {props.productDetail.orderNote && <div className="mb-2 order-last-heading px-3">Comments</div>}
        <div className="order-last-value px-3 mb-4">
          {props.productDetail.orderNote}
        </div>
      </div>
    </div>
  );
};

export default Detail;
