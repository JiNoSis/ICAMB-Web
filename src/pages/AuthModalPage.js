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
  Table,
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
    p_addr: null,
    p_age: null,
    p_alle: null,
    p_bDay: null,
    p_doc_id: null,
    p_email: null,
    p_fname: null,
    p_height: null,
    p_ill: null,
    p_job: null,
    p_next_meet: null,
    p_nname: null,
    p_pat_id: null,
    p_sex: null,
    p_since_day: null,
    p_sname: null,
    p_weight: null

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
          const patRef = firebase.database().ref('pat_info').orderByChild('pat_id').equalTo(patid);
          patRef.once('value', (snapshot) => {
            let pat1 = snapshot.val();
            let newInfo = [];
            for (let pats in pat1) {
              let addr1 = pat1[pats].address;
              let age1 = pat1[pats].age;
              let all1 = pat1[pats].allergic;
              let bDay1 = pat1[pats].b_day;
              let doc_id1 = pat1[pats].doc_id;
              let email1 = pat1[pats].email;
              let fname1 = pat1[pats].fname;
              let height1 = pat1[pats].height;
              let ill1 = pat1[pats].illness;
              let job1 = pat1[pats].job;
              let next_meet1 = pat1[pats].next_meet;
              let nname1 = pat1[pats].nname;
              let pat_id1 = pat1[pats].pat_id;
              let sex1 = pat1[pats].sex;
              let since_day1 = pat1[pats].since_day;
              let sname1 = pat1[pats].sname;
              let weight1 = pat1[pats].weight;
              this.setState({
                p_addr: addr1,
                p_age: age1,
                p_alle: all1,
                p_bDay: bDay1,
                p_doc_id: doc_id1,
                p_email: email1,
                p_fname: fname1,
                p_height: height1,
                p_ill: ill1,
                p_job: job1,
                p_next_meet: next_meet1,
                p_nname: nname1,
                p_pat_id: pat_id1,
                p_sex: sex1,
                p_since_day: since_day1,
                p_sname: sname1,
                p_weight: weight1
              });
            }
          });

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
              <Card className="mb-3">
                <CardHeader>Patient Profile</CardHeader>
                <Card body>
                  <Table>
                    <thead>
                      <tr className="table-primary">
                        <th colspan="100%">Patient Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-info">
                        <th scope="row">Patient ID:</th>
                        <td colspan="100%">{this.state.p_pat_id}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Nickname:</th>
                        <td colspan="20%">{this.state.p_nname}</td>
                        <th scope="row">Sex:</th>
                        <td colspan="20%">{this.state.p_sex}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Firstname:</th>
                        <td colspan="20%">{this.state.p_fname}</td>
                        <th scope="row">Surname:</th>
                        <td colspan="20%">{this.state.p_sname}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Email:</th>
                        <td colspan="100%">{this.state.p_email}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Age:</th>
                        <td colspan="20%">{this.state.p_age}</td>
                        <th scope="row">Birthday:</th>
                        <td colspan="20%">{this.state.p_bDay}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Weight:</th>
                        <td colspan="20%">{this.state.p_weight} kg</td>
                        <th scope="row">Height:</th>
                        <td colspan="20%">{this.state.p_height} cm</td>


                      </tr>
                      <tr className="table-info">
                        <th scope="row">Job:</th>
                        <td colspan="100%">{this.state.p_job}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Address:</th>
                        <td colspan="100%">{this.state.p_addr}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Illness:</th>
                        <td colspan="20%">{this.state.p_ill}</td>
                        <th scope="row">Doctor:</th>
                        <td colspan="20%">{this.state.p_doc_id}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Allergic:</th>
                        <td colspan="100%">{this.state.p_alle}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Since:</th>
                        <td colspan="100%">{this.state.p_since_day} days ago</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Next Follows-up:</th>
                        <td colspan="100%">{this.state.p_next_meet} days </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Card>
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