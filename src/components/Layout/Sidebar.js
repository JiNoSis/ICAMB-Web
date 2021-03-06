import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { RiLineChartLine, RiHonorOfKingsLine, RiLifebuoyLine, RiTempColdLine, RiEmpathizeFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import firebase from '../../firebase.js';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import {
  MdExtension,
  MdKeyboardArrowDown,
} from 'react-icons/md';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navItems1 = [
  { to: '/', name: 'Login', exact: true, Icon: RiLineChartLine },
];

const navItems2 = [
  { to: '/', name: 'Profile', exact: true, Icon: RiLifebuoyLine },
  { to: '/sample', name: 'DashBoard', exact: true, Icon: RiLineChartLine },
];

const navItems3 = [
  { to: '/', name: 'Profile', exact: true, Icon: RiLifebuoyLine },
  { to: '/docdas', name: 'Dashboard', exact: true, Icon: RiLineChartLine },
];

const navItems4 = [
  { to: '/load-tables', name: "Load Cell Data", exact: true, Icon: RiEmpathizeFill },
  { to: '/gyro-tables', name: 'Gyroscope Data', exact: true, Icon: RiHonorOfKingsLine },
  { to: '/accel-tables', name: 'Angular Acceleration Data', exact: true, Icon: RiLifebuoyLine },
  { to: '/humid-tables', name: 'Humidity Data', exact: true, Icon: RiTempColdLine },
];




const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    sideBar: true,
    sideBarD: false,
    sideBarP: false,
    DrID: null,
    PatID: null
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user });
        const email = this.state.currentUser.email.slice(0, 3);
        if (email == "doc") {
          const drid = this.state.currentUser.email.slice(0, 9);
          this.setState({ sideBarD: true, sideBar: false, sideBarP: false, DrID: drid, PatID: null })
        }
        if (email == "pat") {
          const patid = this.state.currentUser.email.slice(0, 10);
          this.setState({ sideBarD: false, sideBar: false, sideBarP: true, DrID: null, PatID: patid })
        }
      } else {
        this.setState({ sideBarD: false, sideBar: true, sideBarP: false })
      }
    });
  }


  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <span className="text-white">
                - ICAMB Website -
              </span>
            </SourceLink>
          </Navbar>

          {(() => {
            if (this.state.sideBar) {
              return <Nav vertical>
                {navItems1.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Nav>
            }
          })()}

          {(() => {
            if (this.state.sideBarD) {
              return <Nav vertical>
                {navItems3.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
                <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">RAW DATA</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navItems4.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
              </Nav>
            }
          })()}

          {(() => {
            if (this.state.sideBarP) {
              return <Nav vertical>
                {navItems2.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Nav>
            }
          })()}

        </div>
      </aside>
    );
  }
}

export default Sidebar;
