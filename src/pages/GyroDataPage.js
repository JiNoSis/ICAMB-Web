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
          gyro_x: imu_sens[imu_sen].gyro_x,
          gyro_y: imu_sens[imu_sen].gyro_y,
          gyro_z: imu_sens[imu_sen].gyro_z,
        });
        this.setState({ sensor: newimu });
      }
    });
  }
  render() {
    return (
      <Page
        title="Raw Gyroscope Data Tables"
        breadcrumbs={[{ name: 'gyro-tables', active: true }]}
        className="TablePage"
      >

        <Card className="mb-3">
          <CardHeader>IMU Gyro Sensor</CardHeader>
          <CardBody>
            <Card body>
              <Table {...{ 'striped': true }}>
                <thead>
                  <tr>
                    <th {...{ 'position': 'sticky', 'top': '0' }}>Date</th>
                    <th {...{ 'position': 'sticky', 'top': '0' }}>gyro_x</th>
                    <th {...{ 'position': 'sticky', 'top': '0' }}>gyro_y</th>
                    <th {...{ 'position': 'sticky', 'top': '0' }}>gyro_z</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sensor.map((imus, index) => {
                    return (
                      <tr key={index}>
                        <td>{//imus.date
                        }25/11/2020</td>
                        <td>{imus.gyro_x}</td>
                        <td>{imus.gyro_y}</td>
                        <td>{imus.gyro_z}</td>
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
