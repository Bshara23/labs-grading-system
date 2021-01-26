import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Icon, InlineIcon} from '@iconify/react';
import {connect, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {currentUser, setCurrentUser} from '../data/Global';

function Navbar2(props) {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const onLogOut = () => {
    dispatch(setCurrentUser(null));
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        sticky="top"
        expand="lg"
        className="navbarc myNavBar shadow"
      >
        <Navbar.Brand id="gradingSystem">Grading System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {user && (
              <Nav.Link eventKey={2}>
                <div>{`${user.fname} ${user.lname}`}</div>
              </Nav.Link>
            )}

            <Nav.Link eventKey={2} href="/" onClick={onLogOut}>
              <div>Log Out</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
const mapStateToProps = (state) => {
  return {currentCourse: state.currentCourse};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);
