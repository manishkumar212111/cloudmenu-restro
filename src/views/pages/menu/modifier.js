import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardSubtitle, CCardText, CCardTitle, CCol, CContainer, CModal, CModalBody, CModalFooter, CModalHeader, CPagination, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getModifierList, deleteModifierById } from "../../../actions/modifier";
import AddModifier from "./AddModifier";

const Modifier = (props) => {
    const [ viewOpen , setView] = useState(false);
    const [activeId , setActievId] = useState("");
    const [modifiers , setModifiers] = useState([]);
    const [page,setPage] = useState(1);
    useEffect(() => {
        props.getModifierList({page : page, limit:12});
    }, [props.getModifierList, page]);

    useEffect(() => {
      setModifiers(props.modifierList);
    }, [props.modifierList])


    const handleDelete = (id) => {
        props.deleteModifierById(id);
    };

    const handleEdit = (id) => {
      setView(true);
      setActievId(id);
    };

    console.log(props)
  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>
                Modifers
                <CRow style={{float : "right"}}>
                    <CButton onClick={() => {setActievId('');setView(true)}}  color="success">Add Modifiers</CButton>
                </CRow>
            </CCardHeader>
            <CCardBody>
              <table>
                <tr><td>Name</td><td>Items</td><td></td></tr>
                {modifiers && modifiers.map(itm => (
                  <tr>
                    <td>{itm.name}</td>
                    <td>{itm.modifiers && itm.modifiers.length && itm.modifiers.map(it => (it.name)).join(', ')}</td>
                    <td><CButton onClick={() => handleEdit(itm.id)}>Edit</CButton> <CButton onClick={() => handleDelete(itm.id)}>Delete</CButton></td>
                  </tr>
                ))}
              </table>
              <div className={'mt-2 '} style={{float: "right"}}>
                  <CPagination
                    activePage={page}
                    pages={props.totalPages}
                    onActivePageChange={(i) => setPage(i)}
                  ></CPagination>
                </div>

            </CCardBody>
            <CCardFooter></CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      {viewOpen && <CModal show={viewOpen} onClose={setView}>
        <CModalHeader closeButton>Modifier Details</CModalHeader>
        <CModalBody>
                <AddModifier id={activeId} />
        </CModalBody>
      </CModal>}
    </CContainer>
  );
};

const mapStateToProps = (state) => ({
  modifierList: state.modifier.modifierList,
  totalPages: state.modifier.totalPages,
  loading: state.modifier.modifier_detail_loading,
});

const mapDispatchToProps = {
  getModifierList,
  deleteModifierById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modifier);
