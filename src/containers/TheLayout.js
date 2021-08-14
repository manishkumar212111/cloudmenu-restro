import React , {useState , useEffect} from 'react'
import Footer from './Footer'
import Header from './Header'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {connect } from 'react-redux';

const TheLayout = (props) => {
  const [user , setUser] = useState({});
  useEffect(() => {
    console.log("in useeffect")
    if(typeof localStorage !== 'undefined' && localStorage.getItem('userDetail')){
      const userDetail = JSON.parse(localStorage.getItem('userDetail')).user;
      setUser(userDetail); 
    } else {
      setUser(null);
    }
  }, [props.userDetail]);
  console.log(props, user)
  return (
    user && user.status ? <>
    <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
    </div>
    </> : 
    <>
    <Header />
      <TheContent />
    <Footer />
    </>
  )
}

const mapStateToProps = ( state ) => ( {
  userDetail: state.user.userDetail || state.auth.userDetail
} );

const mapDispatchToProps = {
  // auth,
};

export default connect( mapStateToProps, mapDispatchToProps )( TheLayout );


