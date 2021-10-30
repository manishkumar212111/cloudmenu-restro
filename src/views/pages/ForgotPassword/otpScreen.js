import React, { useState } from "react";
import validateUtility from "../../../utils/ValidateUtility";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

import { verifyOtp } from "../../../actions/auth";
import { CSpinner } from "@coreui/react";

const VerifyOtp = (props) => {
  const [otp, setOtp] = useState("");
  console.log(props);
  const handleClick = () => {
    props.verifyOtp({
      otp: otp,
      userId: props?.match?.params?.userId,
    });
  };
  return (
    <section class="main-form-wrapper">
      <div class="container-fluid">
        <div class="form-inner">
          <div class="form-logo">
            <img
              class="img-fluid"
              src={localStorage.getItem("language") == "ar" ? "https://ik.imagekit.io/lcq5etn9k/restro/logo/ar_v3_Plan_de_travail_1_wKVquXj-sF.png?updatedAt=1635607055252" : "https://ik.imagekit.io/lcq5etn9k/restro/logo/eng_vf_Plan_de_travail_1_YmU83YpQuQE.png?updatedAt=1635607055701"}
              alt=""
            />
          </div>
          <div class="main-form">
            <h5>Verify Yourself</h5>
            <form action="">
              <div class="row">
                <div class="col-md-12 form-group mb-1">
                  <p>Enter OTP</p>
                </div>
                <div class="col-8 col-md-12 form-group mb-4">
                  <input
                    placeholder="Enter 4 digit OTP"
                    maxLength="4"
                    value={otp}
                    onChange={(e) =>
                      e.target.value.length < 5
                        ? setOtp(e.target.value)
                        : () => {}
                    }
                    type="tel"
                    class="form-input"
                  />
                </div>
              </div>
              {props.login_user_loading ? (
                <div style={{ marginLeft: "45%" }}>
                  <CSpinner />
                </div>
              ) : (
                <>
                  {
                  otp.length === 4 &&
                  <div class="connect-btn mt-4">
                    <button class="trans-btn" onClick={handleClick}>
                      SEND
                    </button>
                  </div>}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  login_user_loading: state.auth.login_user_loading,
});

const mapDispatchToProps = {
    verifyOtp,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
