import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = (props) => {
  console.log(props.data.categoryWiseIncome)
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={ props.data.user}
          text="Today Registered User"
            style={{padding : "20px"}}
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={ props.data.income[props.data.income.length - 1].total}
          text="This month income"
          style={{padding : "20px"}}
        >
        </CWidgetDropdown>
      </CCol>

      { props.data.categoryWiseIncome.map((item) => { return (

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-primary"
              header={ item.total }
              text={item.plan[0].name}
              style={{padding : "20px"}}
            >
            </CWidgetDropdown>
        </CCol>

      )})}
    </CRow>
  )
}

export default WidgetsDropdown
