import { STATE_LOGIN } from 'components/AuthForm';
import LoginForm from 'components/LoginForm';
import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  Row,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  FormText,
  Input,
} from 'reactstrap';
import firebase from '../firebase.js';



class AuthModalPage extends React.Component {
  state = {
    show: false,
    authState: STATE_LOGIN,
    sideBar: true,
    sideBarD: false,
    sideBarP: false,
    DrID: null,
    PatID: null,
  };


  toggle = () => {
    this.setState({
      show: !this.state.show,
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
    const externalCloseBtn = (
      <button
        className="close"
        style={{
          position: 'absolute',
          top: '15px',
          right: '20px',
          fontSize: '3rem',
        }}
        onClick={this.toggle}>
        &times;
      </button>
    );

    return (

      <div>
        {(() => {
          if (this.state.sideBar) {
            return <Page
              title="Welcome to ICAMB Platform "
              breadcrumbs={[{ name: 'login', active: true }]}>
              <Row>
                <Col md="12" sm="12" xs="12">
                  <Card>
                    <CardHeader>Click here to Login</CardHeader>
                    <CardBody>
                      <Button color="danger" onClick={this.toggle}>
                        Login
                </Button>
                      <Modal
                        isOpen={this.state.show}
                        toggle={this.toggle}
                        size="sm"
                        backdrop="static"
                        backdropClassName="modal-backdrop-light"
                        external={externalCloseBtn}
                        centered>
                        <ModalBody>
                          <LoginForm />
                        </ModalBody>
                      </Modal>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Page>
          }
          if (this.state.sideBarP) {
            return <Page
              title={"Hello " + this.state.PatID + " "}
              breadcrumbs={[{ name: 'patient', active: true }]}>
            </Page>
          }
          if (this.state.sideBarD) {
            return <Page
              title={"Hello " + this.state.DrID + " "}
              breadcrumbs={[{ name: 'Doctor', active: true }]}>
            </Page>
          }
        })()}
      </div>



    );
  }
}











export default AuthModalPage;