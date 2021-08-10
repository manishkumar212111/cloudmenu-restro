import React , {useEffect} from 'react';

const Header = () => {

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
                <li class="active"><a href="index.html">Home</a></li>
                <li><a href="#how-it-works-section">How It Works</a></li>
                <li><a href="/#/pricing">Pricing</a></li>
                <li><a href="faq.html">FAQ's</a></li>
                <li><a href="#benifits">Benifits</a></li>
      
                <li class="get-started"><a href="/#/login">login</a></li>
              </ul>
            </nav>
          </div>
        </header>
    )
};

export default Header;