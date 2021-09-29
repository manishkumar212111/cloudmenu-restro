import React, { useState } from 'react';
import Footer from 'src/containers/Footer';
import Header from 'src/containers/Header';
import Contact from 'src/views/components/contact';
const Faqs = [
    { question : "Can I use the domain of my restaurant ?" , answer: "What can you link the domain of your restaurant with us? If you do not have a domain of your own, do not be afraid, we can arrange one for you."},
    { question : "Do I have to have a domain ?" , answer: "You do not need to have a domain, you can use our domain."},
    { question : "What do you have for free ?" , answer: "What can you link the domain of your restaurant with us? If you do not have a domain of your own, do not be afraid, we can arrange one for you."},
    { question : "What do you have for free ?" , answer: "What can you link the domain of your restaurant with us? If you do not have a domain of your own, do not be afraid, we can arrange one for you."},
    { question : "What do you have for free ?" , answer: "What can you link the domain of your restaurant with us? If you do not have a domain of your own, do not be afraid, we can arrange one for you."},
    { question : "What do you have for free ?" , answer: "What can you link the domain of your restaurant with us? If you do not have a domain of your own, do not be afraid, we can arrange one for you."},
]

const FAQ = () => {
    const [active , setActive] = useState(0);
    return (<>  
        <Header />
        <div id="main">
            <section class="inner-heading">
            <div class="container-fluid">
                <h2>FAQ</h2>
                <h4>Have some questions before you get started ? </h4>
            </div>
            </section>
        
            <section class="faq-wrapper">
                <div class="container-fluid"> 
                    <div class="accordion" id="faq">
                        {
                            Faqs.map((itm, index) => (
                                <div class="card">
                                    <div class="card-header" id="faqhead1">
                                        <span class="btn btn-header-link" onClick={() => setActive(index)} data-toggle="collapse" data-target="#faq1" aria-expanded="true" aria-controls="faq1">{itm.question}</span>
                                    </div>
                                    
                                    <div id="faq1" class={`collapse ${active == index ? "show" : "hide"}`} aria-labelledby="faqhead1" data-parent="#faq">
                                    <div class="card-body">
                                        <p>{itm.answer}</p>
                                    </div>
                                    </div>
                                </div>
                        
                            ))
                        }
                        
                    </div>
                </div>
            </section>
        
            <section class="call-to-action">
            <div class="container-fluid">
                <div class="title-para">
                <h3>Elevate Your Restaurant Operations with a QR Code Menu</h3>
                <p>Give your customers a superior dine-in experience! Cloud Menu creates custom QR Codes for your restaurant. Cloud Menu software is designed to help restaurants run their operations much more efficiently than before.</p>
                </div>
                <div class="call-btn">
                <a class="trans-btn" href="#">Get Started</a>
                </div>
            </div>
            <div class="overlay"></div>
            </section>
        
            <section class="connect-us">
            <div class="container-fluid">
                <div class="row">
                <div class="col-lg-5 col-md-6">
                    <div class="connect-text">
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
        
      </div>
      <Footer />
    </>
    )
}

export default FAQ;