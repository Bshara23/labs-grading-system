import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Icon, InlineIcon} from '@iconify/react';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import { setCurrentUser } from '../data/Global';


function Navbar2(props) {
  const dispatch = useDispatch();

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
        <Navbar.Brand id="gradingSystem" href="/">
          Grading System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/LogIn">Log In</Nav.Link>
            <Nav.Link href="/Grades">Grades</Nav.Link>

            {/* <Nav.Link href="/Sales">SALES</Nav.Link> */}
          </Nav>
          <Nav>
            {/* <Nav.Link eventKey={2} href="/ContactPagee">
              <div id="contactContainer">
                <Icon className="icons" icon={handbagIcon} />
                CART{" "}
                <Badge variant="primary">{this.props.cartItemsCount}</Badge>
              </div>
            </Nav.Link> */}
            <Nav.Link eventKey={2} href="/profile" onClick={onLogOut}>
              <div>Bshara</div>
            </Nav.Link>
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
