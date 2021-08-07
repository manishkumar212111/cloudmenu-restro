import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <>
    <Header />
    
    <TheContent />
    <Footer />
    </>
    // <div className="c-app c-default-layout">
    //   <TheSidebar/>
    //   <div className="c-wrapper">
    //     <TheHeader/>
    //     <div className="c-body">
    //       <TheContent/>
    //     </div>
    //     <TheFooter/>
    //   </div>
    // </div>
  )
}


export default TheLayout
