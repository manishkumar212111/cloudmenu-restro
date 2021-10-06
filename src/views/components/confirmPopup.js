import { CModal } from '@coreui/react';
import React from 'react';
import "./popup.scss";
const ConfirmPopup = (props) => {

    return(
        <CModal className="popp" show ={true} onClose={props.onClose}>
            <div class="popup-wrapper">
                <div class="popup-body">
                <p>{props?.data?.msg}</p>
                <div class="btn-grp">
                    <span onClick={() => props.handleSuccess(props?.data?.id)} class="proceed-btn" href="#">Proceed</span>
                    <span onClick={() => props.onClose("")} class="cancel-btn" href="#">Cancel</span>
                </div>
                </div>
                {/* <a class="close-btn" href="#">&#10005;</a> */}
            </div>
        </CModal>
    )
}

export default ConfirmPopup;