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
import '../styles/style.css';


class AuthModalPage extends React.Component {
  state = {
    show: false, authState: STATE_LOGIN,
    sideBar: true, sideBarD: false, sideBarP: false,
    DrID: null, PatID: null,

    p_addr: null, p_age: null, p_alle: null,
    p_bDay: null, p_doc_id: null, p_email: null,
    p_fname: null, p_height: null, p_ill: null,
    p_job: null, p_next_meet: null, p_nname: null,
    p_pat_id: null, p_sex: null, p_since_day: null,
    p_sname: null, p_weight: null,p_img: null,

    d_age: null, d_bDay: null, d_cer: null,
    d_doc_id: null, d_email: null, d_fel: null,
    d_fname: null, d_lang: null, d_med: null,
    d_nname: null, d_sci: null, d_sct: null,
    d_sex: null, d_sname: null, d_spec: null,
    d_tel: null, d_img: null
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
          const docRef = firebase.database().ref('doc_info').orderByChild('doc_id').equalTo(drid);
          docRef.once('value', (snapshot) => {
            let doc1 = snapshot.val();
            for (let docs in doc1) {
              let age2 = doc1[docs].age;
              let bDay2 = doc1[docs].b_day;
              let cer2 = doc1[docs].cer;
              let doc_id2 = doc1[docs].doc_id;
              let email2 = doc1[docs].email;
              let fel2 = doc1[docs].fel;
              let fname2 = doc1[docs].fname;
              let lang2 = doc1[docs].lang;
              let med2 = doc1[docs].med;
              let nname2 = doc1[docs].nname;
              let sci2 = doc1[docs].sci;
              let sct2 = doc1[docs].sct;
              let sex2 = doc1[docs].sex;
              let sname2 = doc1[docs].sname;
              let spec2 = doc1[docs].spec;
              let tel2 = doc1[docs].tel;
              let img2 = doc1[docs].img;
              this.setState({
                d_age: age2, d_bDay: bDay2,
                d_cer: cer2, d_doc_id: doc_id2,
                d_email: email2, d_fel: fel2,
                d_fname: fname2, d_lang: lang2,
                d_med: med2, d_nname: nname2,
                d_sci: sci2, d_sct: sct2,
                d_sex: sex2, d_sname: sname2,
                d_spec: spec2, d_tel: tel2,d_img: img2
              });
            }
          });
        }
        if (email == "pat") {
          const patid = this.state.currentUser.email.slice(0, 10);
          this.setState({ sideBarD: false, sideBar: false, sideBarP: true, DrID: null, PatID: patid })
          const patRef = firebase.database().ref('pat_info').orderByChild('pat_id').equalTo(patid);
          patRef.once('value', (snapshot) => {
            let pat1 = snapshot.val();
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
              let img1 = pat1[pats].img;
              this.setState({
                p_addr: addr1, p_age: age1,
                p_alle: all1, p_bDay: bDay1,
                p_doc_id: doc_id1, p_email: email1,
                p_fname: fname1, p_height: height1,
                p_ill: ill1, p_job: job1,
                p_next_meet: next_meet1, p_nname: nname1,
                p_pat_id: pat_id1, p_sex: sex1,
                p_since_day: since_day1, p_sname: sname1,
                p_weight: weight1,p_img: img1
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
                        size="md"
                        backdrop="static"
                        backdropClassName="modal-backdrop-light"
                        external={externalCloseBtn}
                        centered
                        >
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
                    <tr className="table-info"> 
                    <td align="Center" rowSpan="3" colSpan="100%"> <iframe src={this.state.p_img}width="225" height="225"></iframe></td>
                    </tr>
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
                      </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr className="table-primary">
                        <th colspan="100%">Patient Illness</th>
                      </tr>
                    </thead>
                    <tbody>
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
                        <td colspan="20%">{this.state.p_since_day} days ago</td>
                        <th scope="row">Next Follows-up:</th>
                        <td colspan="20%">{this.state.p_next_meet} days </td>
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
              <Card className="mb-3">
                <CardHeader>Doctor Profile</CardHeader>
                <Card body>
                  <Table>
                    
                    <thead>
                      <tr className="table-primary">
                        <th colspan="100%">Doctor Information</th>
                      </tr>
                    </thead>
                    <tr className="table-info"> 
                    <td align="Center" rowSpan="3" colSpan="100%"> <iframe src={this.state.d_img}width="225" height="225"></iframe></td>
                    </tr>
                    <tbody>
                      <tr className="table-info">
                        <th scope="row">Doctor ID:</th>
                        <td colspan="100%">{this.state.d_doc_id}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Nickname:</th>
                        <td colspan="20%">{this.state.d_nname}</td>
                        <th scope="row">Sex:</th>
                        <td colspan="20%">{this.state.d_sex}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Firstname:</th>
                        <td colspan="20%">{this.state.d_fname}</td>
                        <th scope="row">Surname:</th>
                        <td colspan="20%">{this.state.d_sname}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Email:</th>
                        <td colspan="100%">{this.state.d_email}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Age:</th>
                        <td colspan="20%">{this.state.d_age}</td>
                        <th scope="row">Birthday:</th>
                        <td colspan="20%">{this.state.d_bDay}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Specialties:</th>
                        <td colspan="100%">{this.state.d_spec}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Language spoken:</th>
                        <td colspan="100%">{this.state.d_lang}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr className="table-primary">
                        <th colspan="100%">Qualifications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-info">
                        <th scope="row">Medical School:</th>
                        <td colspan="100%">{this.state.d_med}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Board Certifications:</th>
                        <td colspan="100%">{this.state.d_cer}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Fellowship:</th>
                        <td colspan="100%">{this.state.d_fel}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Special Clinical Trainings:</th>
                        <td colspan="100%">{this.state.d_sct}</td>
                      </tr>
                      <tr className="table-info">
                        <th scope="row">Special Clinical Interests:</th>
                        <td colspan="100%">{this.state.d_sci}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr className="table-primary">
                        <th colspan="100%">Doctor's Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-info">
                        <td colspan="30%" >Monday</td>
                        <td colspan="30%" >16:00 - 20:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                      <tr className="table-info">
                        <td colspan="30%" >Tuesday</td>
                        <td colspan="30%" >16:00 - 20:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                      <tr className="table-info">
                        <td colspan="30%" >Wednesday</td>
                        <td colspan="30%" >16:00 - 20:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                      <tr className="table-info">
                        <td colspan="30%" >Friday</td>
                        <td colspan="30%" >16:00 - 20:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                      <tr className="table-info">
                        <td colspan="30%" >Saturday</td>
                        <td colspan="30%" >16:00 - 20:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                      <tr className="table-info">
                        <td colspan="30%" >Sunday</td>
                        <td colspan="30%" >12:00 - 16:00</td>
                        <td colspan="30%" >Orthopaedic Center (BIC 20B)</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Card>
            </Page>
          }
        })()}
      </div>



    );
  }
}











export default AuthModalPage;