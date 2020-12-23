import React from "react";
import {
  Navbar,
  Brand,
  Toggle,
  Collapse,
  Link,
  Item,
  NavDropdown,
  Nav,
  Badge,
  Button,
} from "react-bootstrap";
import { Icon, InlineIcon } from "@iconify/react";
import { connect } from 'react-redux'
  
function Navbar2(props) {
  return (
    <>
    {console.log("x:", props.currentCourse)}
      <Navbar collapseOnSelect sticky="top" expand="lg" className="navbarc">
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
            <Nav.Link
              eventKey={2}
              href="/ContactPage"
              
            >
              <div>
               
                Log Out
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
const mapStateToProps = (state) => {
  return { currentCourse: state.currentCourse };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);
