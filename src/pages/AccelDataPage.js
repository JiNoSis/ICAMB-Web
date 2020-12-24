import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import firebase from '../firebase.js';



class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
    };
  };
  componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);

  };


  getData = () => {
    const imu_ref = firebase.database().ref('sensor');
    imu_ref.once('value', (snapshot) => {
      // console.log(snapshot.key);
      let imu_sens = snapshot.val();
      let newimu = [];
      for (let imu_sen in imu_sens) {
        newimu.push({
          date: imu_sens[imu_sen].date,
          accel_x: imu_sens[imu_sen].accel_x,
          accel_y: imu_sens[imu_sen].accel_y,
          accel_z: imu_sens[imu_sen].accel_z,
        });
        this.setState({ sensor: newimu });
      }
    });
  }
  render() {
    return (
      <Page
        title="Raw Angular Acceleration Data Tables"
        breadcrumbs={[{ name: 'accel-tables', active: true }]}
        className="TablePage"
      >

        <Card className="mb-3">
          <CardHeader>IMU Accel Sensor</CardHeader>
          <CardBody>
            <Card body>
              <Table {...{ 'striped': true }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>accel_x</th>
                    <th>accel_y</th>
                    <th>accel_z</th>
                  </tr>
                </thead>
                <tbody styles={'height: 100px; overflow-y: scroll;'}>
                  {this.state.sensor.map((imus, index) => {
                    return (
                      <tr key={index}>
                        <td>{//imus.date
                        }25/11/2020</td>
                        <td>{imus.accel_x}</td>
                        <td>{imus.accel_y}</td>
                        <td>{imus.accel_z}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
          </CardBody>
        </Card>


      </Page>
    );
  }
};

export default TablePage;
