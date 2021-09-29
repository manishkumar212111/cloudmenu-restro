import React from 'react';
import Footer from 'src/containers/Footer';
import Header from 'src/containers/Header';

const Plan = (props) => {
    return(
        <>
            <Header />

        <div id="main">
            <section class="inner-heading">
            <div class="container-fluid">
                <h4>Choose a Plan</h4>
            </div>
            </section>
            <section class="qr-plans">
            <div class="container-fluid">
                <div class="title-para">
                <h3>The Simplest Solution For Your Restaurants Starts Here</h3>
                <p>It’s never been easier! Set up your online menu now and let customers make orders directly from their mobile devices. So choose your plab and get started</p>
                </div>
                <div class="plan-outter">
                <div class="row">
                    <div class="col-md-4 mb-5 mb-md-0">
                    <div class="plan-item">
                        <h5>Free Plan</h5>
                        <h3>$0<span>/mo</span></h3>
                        <ul>
                        <li><i class='bx bx-check-circle'></i> Products</li>
                        <li><i class='bx bx-check-circle'></i> One admin account</li>
                        <li><i class='bx bx-check-circle'></i> 1 waiter account</li>
                        <li><i class='bx bx-check-circle'></i> Free sub domain</li>
                        <li><i class='bx bx-check-circle'></i> Internal orders</li>
                        <li><i class='bx bx-check-circle'></i> 20 tables</li>
                        <li><i class='bx bx-check-circle'></i> Customer Reviews</li>
                        <li><i class='bx bx-check-circle'></i> Manage menus selectronic</li>
                        </ul>
                        <div class="connect-btn">
                        <a class="trans-btn" href="/#/register?plan=free">Enroll Now</a>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4 mb-5 mb-md-0">
                    <div class="plan-item">
                        <h5>Silver Plan</h5>
                        <h3>$200<span>/mo</span></h3>
                        <ul>
                        <li><i class='bx bx-check-circle'></i> Products</li>
                        <li><i class='bx bx-check-circle'></i> One admin account</li>
                        <li><i class='bx bx-check-circle'></i> 1 waiter account</li>
                        <li><i class='bx bx-check-circle'></i> Free sub domain</li>
                        <li><i class='bx bx-check-circle'></i> Internal orders</li>
                        <li><i class='bx bx-check-circle'></i> 20 tables</li>
                        <li><i class='bx bx-check-circle'></i> Customer Reviews</li>
                        <li><i class='bx bx-check-circle'></i> Manage menus selectronic</li>
                        </ul>
                        <div class="connect-btn">
                        <a class="trans-btn" href="/#/register?plan=silver">Enroll Now</a>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4 mb-5 mb-md-0">
                    <div class="plan-item">
                        <h5>Gold Plan</h5>
                        <h3>$500<span>/mo</span></h3>
                        <ul>
                        <li><i class='bx bx-check-circle'></i> Products</li>
                        <li><i class='bx bx-check-circle'></i> One admin account</li>
                        <li><i class='bx bx-check-circle'></i> 1 waiter account</li>
                        <li><i class='bx bx-check-circle'></i> Free sub domain</li>
                        <li><i class='bx bx-check-circle'></i> Internal orders</li>
                        <li><i class='bx bx-check-circle'></i> 20 tables</li>
                        <li><i class='bx bx-check-circle'></i> Customer Reviews</li>
                        <li><i class='bx bx-check-circle'></i> Manage menus selectronic</li>
                        </ul>
                        <div class="connect-btn">
                        <a class="trans-btn" href="/#/register?plan=gold">Enroll Now</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        <Footer />
        </>
    )
}
export default Plan;