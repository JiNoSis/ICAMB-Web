import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import firebase from '../firebase.js';

const Period = [
  '100', '99', '98', '97', '96', '95', '94', '93', '92', '91',
  '90', '89', '88', '87', '86', '85', '84', '83', '82', '81',
  '80', '79', '78', '77', '76', '75', '74', '73', '72', '71',
  '70', '69', '68', '67', '66', '65', '64', '63', '62', '61',
  '60', '59', '58', '57', '56', '55', '54', '53', '52', '51',
  '50', '49', '48', '47', '46', '45', '44', '43', '42', '41',
  '40', '39', '38', '37', '36', '35', '34', '33', '32', '31',
  '30', '29', '28', '27', '26', '25', '24', '23', '22', '21',
  '20', '19', '18', '17', '16', '15', '14', '13', '12', '11',
  '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
var list = [];
var load_list = [];
var gyro_x_list = [];
var gyro_y_list = [];
var gyro_z_list = [];
var accel_x_list = [];
var accel_y_list = [];
var accel_z_list = [];
var humid_list = [];
var temp_list = [];
var heat_list = [];


class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
      pat_id: null
    };
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user })
        const patid = this.state.currentUser.email.slice(0, 10);
        this.setState({ pat_id: patid })
      }
    });
    this.getData();
    setInterval(this.getData, 10000);

  };


  getData = () => {
    const imu_ref = firebase.database().ref('sensor_info').orderByChild('pat_id').equalTo(this.state.pat_id).limitToLast(100);
    imu_ref.once('value', (snapshot) => {
      // console.log(snapshot.key);
      let imu_sens = snapshot.val();
      let newimu = [];
      for (let imu_sen in imu_sens) {
        newimu.push({
          time: imu_sens[imu_sen].time,
          date: imu_sens[imu_sen].date,
          gyro_x: imu_sens[imu_sen].gyro_x,
          gyro_y: imu_sens[imu_sen].gyro_y,
          gyro_z: imu_sens[imu_sen].gyro_z,
          accel_x: imu_sens[imu_sen].accel_x,
          accel_y: imu_sens[imu_sen].accel_y,
          accel_z: imu_sens[imu_sen].accel_z,
          load_cell: imu_sens[imu_sen].load_cell,
          humid: imu_sens[imu_sen].humid,
          temp: imu_sens[imu_sen].temp,
          heat: imu_sens[imu_sen].heat
        });
        this.setState({ sensor: newimu });
      }
    });
    list = this.state.sensor
    // .slice(this.state.sensor.length-8,this.state.sensor.length);
    load_list = list.map(item => item.load_cell);
    gyro_x_list = list.map(item => item.gyro_x);
    gyro_y_list = list.map(item => item.gyro_y);
    gyro_z_list = list.map(item => item.gyro_z);
    accel_x_list = list.map(item => item.accel_x);
    accel_y_list = list.map(item => item.accel_y);
    accel_z_list = list.map(item => item.accel_z);
    humid_list = list.map(item => item.humid);
    temp_list = list.map(item => item.temp);
    heat_list = list.map(item => item.heat);

  }
  render() {
    return (
      <Page
        title="Dashboard "
        breadcrumbs={[{ name: 'das-graph', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Load Cell Data</CardHeader>
              <CardBody>
                <Line data={genLoadData()} options={loadchartOptions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Angular Acceleration Data</CardHeader>
              <CardBody>
                <Line data={genAccelData()} options={accelchartOptions} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Gyroscope Data</CardHeader>
              <CardBody>
                <Line data={genGyroData()} options={gyrochartOptions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Humidity Data</CardHeader>
              <CardBody>
                <Line data={genHumidData()} options={humchartOptions} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Temperature Data</CardHeader>
              <CardBody>
                <Line data={genTempData()} options={tempchartOptions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
};



const genLoadData = () => {
  return {
    labels: Period,
    datasets: [
      {
        label: 'Load Pressure',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: load_list,
      }
    ],
  };
};

const genGyroData = () => {
  return {
    labels: Period,
    datasets: [
      {
        label: 'Gyroscope X',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: gyro_x_list,
      },
      {
        label: 'Gyroscope Y',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,100,192,0.4)',
        borderColor: 'rgba(75,100,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,100,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,100,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: gyro_y_list,
      },
      {
        label: 'Gyroscope Z',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(140,192,20,0.4)',
        borderColor: 'rgba(140,192,20,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(140,192,20,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(140,192,20,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: gyro_z_list,
      }
    ],
  };
};

const genAccelData = () => {
  return {
    labels: Period,
    datasets: [
      {
        label: 'Accel X',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(15,192,10,0.4)',
        borderColor: 'rgba(15,192,10,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(15,192,10,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(15,192,10,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: accel_x_list,
      },
      {
        label: 'Accel Y',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,200,192,0.4)',
        borderColor: 'rgba(75,200,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,200,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,200,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: accel_y_list,
      },
      {
        label: 'Accel Z',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(140,12,20,0.4)',
        borderColor: 'rgba(140,12,20,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(140,12,20,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(140,12,20,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: accel_z_list,
      }
    ],
  };
};

const genHumidData = () => {
  return {
    
    labels: Period,
    datasets: [
      {
        label: 'Humidity',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,0,192,0.4)',
        borderColor: 'rgba(75,0,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,0,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,0,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: humid_list,
      }
    ],
  };
};

const genTempData = () => {
  return {
    labels: Period,
    datasets: [
      {
        label: 'temperature',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: load_list,
      }
    ],
  };
};

var loadchartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 200
      }
    }]
  }
}

var accelchartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 15,
        max: -15
      }
    }]
  }
}

var gyrochartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 200,
        max: -200
      }
    }]
  }
}

var humchartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 30,
        max: 70
      }
    }]
  }
}

var tempchartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 20,
        max: 45
      }
    }]
  }
}



export default TablePage;
