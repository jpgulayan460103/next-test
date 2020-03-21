import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

class Headers extends Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken: "",
      isLogged: false,
    };
    this.toggle = this.toggle.bind(this);
    this.loggedState = this.loggedState.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      isLogged: props.isLogged,
      accessToken: props.accessToken,
    };
  }
  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  loggedState = () => {
    if(this.state.isLogged){
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }else{
      return (
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      )
    }
  }
  render() {
    return (
      <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {this.loggedState()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  accessToken: state.user.accessToken,
  user: state.user.user,
});
export default connect(mapStateToProps)(Headers);