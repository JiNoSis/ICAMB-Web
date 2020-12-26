import firebase from '../../firebase'
import SearchInput from 'components/SearchInput';
import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  // NavbarToggler,
  Nav,
  Navbar,
} from 'reactstrap';
import bn from 'utils/bemnames';
import '../../styles/style.css';

const bem = bn.create('header');


class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user, isOpenNotificationPopover: false,
          isNotificationConfirmed: false,
          isOpenUserCardPopover: false,
          button:true
        });
      }else{
        this.setState({isOpenNotificationPopover: false,
          isNotificationConfirmed: false,
          isOpenUserCardPopover: false,
          button:false})
      }
    })
  }

  logout = e => {
    e.preventDefault()
    firebase.auth().signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          
        {(() => {
          if (this.state.button) {
          return <button onClick={this.logout}>Logout</button>
            }
          })()}

        </Nav>
      </Navbar>
    );
  }
}

export default Header;
