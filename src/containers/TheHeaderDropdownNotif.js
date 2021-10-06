import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux'
import { getNotifications , updateNotification} from 'src/actions/notification'
import { useHistory } from 'react-router'
const TheHeaderDropdownNotif = (props) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    props.getNotifications({isOpened: false})
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      props.getNotifications({isOpened: false})
    }, 30000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  useEffect(() => {
    setNotifications(props.notifications)
  }, [props.notifications])
  
  const handleClick = (itm) => {
      props.updateNotification(itm.id);
      history.push("/order");
  };

  console.log(notifications)
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      style={{marginTop: 7}}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{notifications.length}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  placement="bottom-end" className="pt-0" style={{maxHeight: 500, overflowY: "auto"}}>
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {notifications.length} new notifications</strong>
        </CDropdownItem>
        {notifications.length ? notifications.map(itm => (
          <><CDropdownItem style={{paddingTop: 10}} onClick={() => handleClick(itm)}>
              
              <h6><CIcon height="20" name="cil-speedometer" className="mr-2 text-warning" />{itm.title}</h6>
              <p>{itm.description}</p>
            </CDropdownItem>
          </>          
        )) : <>
        {/* <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have no new notifications</strong>
        </CDropdownItem> */}
        
        </>}
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

const mapStateToProps = ( state ) => ( {
  notifications: state.notification.notifications,
  loading : state.Home.loading
} );

const mapDispatchToProps = {
  getNotifications,
  updateNotification 
};

export default connect( mapStateToProps, mapDispatchToProps )( TheHeaderDropdownNotif );
