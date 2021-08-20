import React,{useEffect} from 'react';
import Contact from 'src/views/components/contact';

const steps = [
  {content: "Find QR Code placed on your table, for quick scanning of food menu." ,title: "Discover QR Code", img: "https://ik.imagekit.io/lcq5etn9k/restro/how-it-work_zIJSWix154l2.jpg?updatedAt=1628352123284"},
  {content: "Find QR Code placed on your table, for quick scanning of food menu." ,title: "Discover QR Code", img: "https://ik.imagekit.io/lcq5etn9k/restro/how-it-work_zIJSWix154l2.jpg?updatedAt=1628352123284"},
  {content: "Find QR Code placed on your table, for quick scanning of food menu." ,title: "Discover QR Code", img: "https://ik.imagekit.io/lcq5etn9k/restro/how-it-work_zIJSWix154l2.jpg?updatedAt=1628352123284"}

]
const Index = () => {
    const [activeTab , setActiveTab] = React.useState(0);

    useEffect(() => {
          let userDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).user: {};
          let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
          
          if(userDetail.status){
            console.log(userDetail);
            if(restaurantDetail && restaurantDetail.status){
              window.location.href = '/#/dashboard';
            } else if(restaurantDetail && restaurantDetail.status == 0){
              window.location.href = '/#/profile?id='+userDetail.restaurant.id;
            } else {
              window.location.href = '/#/profile'
            }
          }
     }, [])

    return(<>
        <section id="hero">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-7 order-2 order-md-1">
                <div className="banner-text">
                  <h2>SCAN, ORDER & PAY</h2>
                  <p>Your customers can order from their table by <br></br>simply scanning a QR code</p>
                  <div className="banner-btn mt-4">
                    <div className="connect-btn mb-4 mb-md-0">
                      <a className="trans-btn" href="/#/pricing">Try it for free</a>
                    </div>
                    <div className="trans-button ml-0 ml-md-4">
                      <a className="trans-btn" href="/#/pricing">View Plans</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 order-1 order-md-2 mb-4 mb-md-0">
                <div className="banner-img">
                  <img className="img-fluid" src="https://ik.imagekit.io/lcq5etn9k/restro/banner-img_Hsryq4BMtUJ.png?updatedAt=1628352126683" alt="" />
                </div>
              </div>
            </div>
          </div>
          <img src="https://ik.imagekit.io/lcq5etn9k/restro/graphic-4_Vy2dl8-XV.svg?updatedAt=1628352120816" className="img-fluid graphic graphic-4" alt="" />
        </section>

        <main id="main">
          <section className="qr-section">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-6 col-md-6">
                  <img className="img-fluid mb-5 mb-md-0" src="https://ik.imagekit.io/lcq5etn9k/restro/qr-img_N7zR_QYyI.png?updatedAt=1628352124857" alt="" />
                </div>
                <div className="col-xl-6 col-md-5 ml-auto">
                  <div className="qr-content">
                    <h3>Mobile scan code order</h3>
                    <p>Turn on the scan QR code function in any software. Including skip-the-line, online ordering, self-service plus dishes, changing table, call attendant and other functions</p>
                    <a className="trans-btn" href="register.html">Register Now</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <section id="how-it-works-section" className="how-it-work">
            <div className="container-fluid">
              <div className="title-para">
                <h3>How It Works</h3>
                <p>Hospitality is changing. Your customers can now tap scan a smart QR code with their own device, order food and drink, pay and either have the order brought to their table or receive an sms notifying them that the order is ready.</p>
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tab-content">
                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                      {/* <p>First Panel</p> */}
                      <img className="img-fluid mb-5 mb-lg-0" src={steps[activeTab].img} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <ul className="nav nav-tabs" role="tablist">
                    {steps.map((itm, index) => (<li onClick={() => setActiveTab(index)} className="nav-item nav-link" style={{cursor : "pointer"}}>
                      <span className={`nav-link ${activeTab == index ?  "active" : ""}`}>
                        <div className="work-step nav-item">
                          <h6>{index+1} {itm.title}</h6>
                          <p>{itm.content}</p>
                        </div>
                      </span>
                    </li>))}
                  </ul>
                </div>
              </div>
            </div>
            <img src="https://ik.imagekit.io/lcq5etn9k/restro/graphic-1_UfI6ib0_l9T.svg?updatedAt=1628352096936" className="img-fluid graphic graphic-1" alt="" />
            <img src="https://ik.imagekit.io/lcq5etn9k/restro/graphic-3_M8s1iGq6j74.svg?updatedAt=1628352113007" className="img-fluid graphic graphic-3" alt="" />
          </section>
      
          <section id="benifits" className="main-benifit">
            <div className="container-fluid">
              <div className="title-para">
                <h3>The Main Benifits</h3>
              </div>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/contact-less_d889PlaaI.png?updatedAt=1628352084477" alt="" />
                    <h5>Contactless Ordering</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/reduced-staff_8ttrjkBSH.png?updatedAt=1628352093416" alt="" />
                    <h5>Reduced Staff Demand</h5>
                    <p>ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam </p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/improved-efficiency_A8KUOdkK7.png?updatedAt=1628352095701" alt="" />
                    <h5>Improved Efficiency</h5>
                    <p>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  </div>
                </div>
      
                <div className="col-md-4 mb-4 mb-md-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/menu-adjustment_v_DeAwmaV4z9.png?updatedAt=1628352097181" alt="" />
                    <h5>Menu Adjustments</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/electronic-payment_YlGhJeruVpg.png?updatedAt=1628352094340" alt="" />
                    <h5>Electronic Payment</h5>
                    <p>ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam </p>
                  </div>
                </div>
                <div className="col-md-4 mb-4 mb-md-4">
                  <div className="benifit-item">
                    <img src="https://ik.imagekit.io/lcq5etn9k/restro/lower-risk_b7oQY3cXM.png?updatedAt=1628352097156" alt="" />
                    <h5>Lower Risk of Mistakes</h5>
                    <p>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  </div>
                </div>
              </div>
            </div>
            <img src="https://ik.imagekit.io/lcq5etn9k/restro/graphic-4_Vy2dl8-XV.svg?updatedAt=1628352120816" className="img-fluid graphic graphic-4" alt="" />
          </section>
      
          <section className=" qr-generator">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <img className="img-fluid mb-5 mb-lg-0" src="https://ik.imagekit.io/lcq5etn9k/restro/qr-generator_pC0pvssYQR6r.png?updatedAt=1628352123078" alt="" />
                </div>
                <div className="col-lg-5">
                  <h4>QR code generator</h4>
                  <p>Easily generate a printable QR codes so your guests can order directly from your online menu using their own mobile device.</p>
                  <a className="trans-btn scrollto" href="#connect-us">Enquire Now</a>
                </div>
              </div>
            </div>
          </section>
      
          <section className="qr-plans">
            <div className="container-fluid">
              <div className="title-para">
                <h3>The Simplest Solution For Your Restaurants Starts Here</h3>
                <p>It’s never been easier! Set up your online menu now and let customers make orders directly from their mobile devices. So choose your plab and get started</p>
              </div>
              <div className="plan-outter">
                <div className="row">
                  <div className="col-md-4 mb-5 mb-md-0">
                    <div className="plan-item">
                       <h5>Free Plan</h5>
                       <h3>$0<span>/mo</span></h3>
                       <ul>
                         <li><i className='bx bx-check-circle'></i> Products</li>
                         <li><i className='bx bx-check-circle'></i> One admin account</li>
                         <li><i className='bx bx-check-circle'></i> 1 waiter account</li>
                         <li><i className='bx bx-check-circle'></i> Free sub domain</li>
                         <li><i className='bx bx-check-circle'></i> Internal orders</li>
                         <li><i className='bx bx-check-circle'></i> 20 tables</li>
                         <li><i className='bx bx-check-circle'></i> Customer Reviews</li>
                         <li><i className='bx bx-check-circle'></i> Manage menus selectronic</li>
                       </ul>
                       <div className="connect-btn">
                        <a className="trans-btn" href="/#/register?plan=free">Enroll Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-5 mb-md-0">
                    <div className="plan-item">
                       <h5>Free Plan</h5>
                       <h3>$200<span>/mo</span></h3>
                       <ul>
                         <li><i className='bx bx-check-circle'></i> Products</li>
                         <li><i className='bx bx-check-circle'></i> One admin account</li>
                         <li><i className='bx bx-check-circle'></i> 1 waiter account</li>
                         <li><i className='bx bx-check-circle'></i> Free sub domain</li>
                         <li><i className='bx bx-check-circle'></i> Internal orders</li>
                         <li><i className='bx bx-check-circle'></i> 20 tables</li>
                         <li><i className='bx bx-check-circle'></i> Customer Reviews</li>
                         <li><i className='bx bx-check-circle'></i> Manage menus selectronic</li>
                       </ul>
                       <div className="connect-btn">
                        <a className="trans-btn" href="/#/register?plan=silver">Enroll Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-5 mb-md-0">
                    <div className="plan-item">
                       <h5>Free Plan</h5>
                       <h3>$500<span>/mo</span></h3>
                       <ul>
                         <li><i className='bx bx-check-circle'></i> Products</li>
                         <li><i className='bx bx-check-circle'></i> One admin account</li>
                         <li><i className='bx bx-check-circle'></i> 1 waiter account</li>
                         <li><i className='bx bx-check-circle'></i> Free sub domain</li>
                         <li><i className='bx bx-check-circle'></i> Internal orders</li>
                         <li><i className='bx bx-check-circle'></i> 20 tables</li>
                         <li><i className='bx bx-check-circle'></i> Customer Reviews</li>
                         <li><i className='bx bx-check-circle'></i> Manage menus selectronic</li>
                       </ul>
                       <div className="connect-btn">
                        <a className="trans-btn" href="/#/register?plan=gold">Enroll Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <section className="call-to-action">
            <div className="container-fluid">
              <div className="title-para">
                <h3>Elevate Your Restaurant Operations with a QR Code Menu</h3>
                <p>Give your customers a superior dine-in experience! Cloud Menu creates custom QR Codes for your restaurant. Cloud Menu software is designed to help restaurants run their operations much more efficiently than before.</p>
              </div>
              <div className="call-btn">
                <a className="trans-btn" href="login.html">Get Started</a>
              </div>
            </div>
            <div className="overlay"></div>
          </section>
      
          <section id="connect-us" className="connect-us">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-5 col-md-6">
                  <div className="connect-text">
                    <h3>Connect With Us</h3>
                    <p>To make an enquiry or request a demonstration please complete the contact form. We operate nationwide and would be happy to provide you with an obligation free consultation and quote.</p>
                    <h6>Address</h6>
                    <p>XYZ Suite 24 Street, city, Saudi Arabia.</p>
                    <h6>Phone</h6>
                    <p>+966-123456789</p>
                  </div>
                </div>
                <Contact />
              </div>
            </div>
          </section>
          
        </main>
      
      </>
    )
}

export default Index;