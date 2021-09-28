import React , {useEffect, useState} from 'react';
import {connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { setLanguage } from 'src/actions/language';
import { t } from "../utils/language";
const Header = (props) => {
    const [user , setUser] = useState({});
    const [language , setLanguage] = useState("en");
    const [openNav , setOpenNav] = useState(false);
    useEffect(() => {
      if(typeof localStorage !== 'undefined' && localStorage.getItem('userDetail')){
        setUser(JSON.parse(localStorage.getItem('userDetail')).user) 
      }
    }, [props.userDetail]);
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

    }, [])

    useEffect(() =>{
      setLanguage(localStorage.getItem("language") || "en");
    }, [props.language])
    const handleScroll = (e) => {
        let elem = document.querySelector("#header");
        if((document.getElementById('root') && document.getElementById('root').getBoundingClientRect().top) < -55){
          console.log()
            elem && elem.classList && elem.classList.value.indexOf('header-bg') == -1 &&  elem.classList.add('header-bg')
        } else {
          elem && elem.classList && elem.classList.remove('header-bg')
  
        }
  
      }
    return(
        <header id="header" class="fixed-top">
          <div class="container-fluid d-flex align-items-center">
            <button type="button" onClick={() => setOpenNav(!openNav)} class="mobile-nav-toggle"><i style={{fontSize: 24}} class="bx bx-menu"></i></button>
            <div class="logo mr-auto">
              {/* <!-- <h1 class="text-light"><a href="index.html"><span>Ninestars</span></a></h1> --> */}
              <a href="/"><img src="https://ik.imagekit.io/lcq5etn9k/restro/logo__Kk7H9BvuBE.svg?updatedAt=1628352121941" alt="" class="img-fluid" /></a>
            </div>
      
            <nav class="nav-menu d-none d-lg-block">
              <ul>
                <li class="active"><a href="/">{t("Home")}</a></li>
                <li><HashLink to="#how-it-works-section">{t("How It Works")}</HashLink></li>
                <li><a href="/#/pricing">{t("Pricing")}</a></li>
                <li><a href="/#/faqs">{t("FAQ's")}</a></li>
                <li><HashLink to="#benifits">{t("Benifits")}</HashLink></li>
                <li className="lang-area">
                  <span onClick={() => props.setLanguage("en")} className={language == "en" ? "active-lang" : ""}>En</span> | <span onClick={() => props.setLanguage("ar")} class={language == "ar" ? "active-lang" : ""}>Ar</span>
                </li>
                {user && user.status ? <li><a href="#">{user.name}</a></li> : <li class="get-started"><a href="/#/login">{t("login")}</a></li>}
              </ul>
            </nav>

            <nav class="mobile-nav" style={{ left : openNav ? "-2px" : "-260px" }}>
              <ul onClick={() => setOpenNav(!openNav)}>
                <li class="active"><a href="/">{t("Home")}</a></li>
                <li><HashLink to="#how-it-works-section">{t("How It Works")}</HashLink></li>
                <li><a href="/#/pricing">{t("Pricing")}</a></li>
                <li><a href="/#/faqs">{t("FAQ's")}</a></li>
                <li><HashLink to="#benifits">{t("Benifits")}</HashLink></li>
                <li className="lang-area">
                  <span onClick={() => props.setLanguage("en")} className={language == "en" ? "active-lang" : ""}>En</span> | <span onClick={() => props.setLanguage("ar")} class={language == "ar" ? "active-lang" : ""}>Ar</span>
                </li>
                {user && user.status ? <li><a href="#">{user.name}</a></li> : <li class="get-started"><a href="/#/login">{t("login")}</a></li>}
              </ul>
            </nav>
            {openNav && <div onClick={() => setOpenNav(!openNav)} class="mobile-nav-overly"></div>
            }
          </div>
        </header>
    )
};

const mapStateToProps = ( state ) => ( {
  userDetail: state.user.userDetail || state.auth.userDetail,
  language: state.language.language,
  
} );

const mapDispatchToProps = {
  // auth,
  setLanguage
};

export default connect( mapStateToProps, mapDispatchToProps )( Header );
