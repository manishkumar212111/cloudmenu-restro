import React , {useEffect, useState} from 'react';
import {connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';

const Header = (props) => {
    const [user , setUser] = useState({});
    useEffect(() => {
      if(typeof localStorage !== 'undefined' && localStorage.getItem('userDetail')){
        setUser(JSON.parse(localStorage.getItem('userDetail')).user) 
      }
    }, [props.userDetail]);
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

    }, [])

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
      
            <div class="logo mr-auto">
              {/* <!-- <h1 class="text-light"><a href="index.html"><span>Ninestars</span></a></h1> --> */}
              <a href="/"><img src="https://ik.imagekit.io/lcq5etn9k/restro/logo__Kk7H9BvuBE.svg?updatedAt=1628352121941" alt="" class="img-fluid" /></a>
            </div>
      
            <nav class="nav-menu d-none d-lg-block">
              <ul>
                <li class="active"><a href="/">Home</a></li>
                <li><HashLink to="#how-it-works-section">How It Works</HashLink></li>
                <li><a href="/#/pricing">Pricing</a></li>
                <li><a href="/#/faqs">FAQ's</a></li>
                <li><HashLink to="#benifits">Benifits</HashLink></li>
      
                {user && user.status ? <li><a href="#">{user.name}</a></li> : <li class="get-started"><a href="/#/login">login</a></li>}
              </ul>
            </nav>
          </div>
        </header>
    )
};

const mapStateToProps = ( state ) => ( {
  userDetail: state.user.userDetail || state.auth.userDetail
} );

const mapDispatchToProps = {
  // auth,
};

export default connect( mapStateToProps, mapDispatchToProps )( Header );
