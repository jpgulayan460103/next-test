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
      isOpen: false,
      isLogged: false,
      accessToken: "",
      user: {},
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  componentWillReceiveProps(nextProps){
    this.setState({ accessToken: nextProps.accessToken})
    this.setState({ formErrors: nextProps.formErrors})
  }
  render() {
    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
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
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
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