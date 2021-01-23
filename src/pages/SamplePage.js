import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import firebase from '../firebase.js';

const Period = [
  '1','2','3','4','5','6','7','8','9','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25','26','27','28','29','30',
  '31','32','33','34','35','36','37','38','39','40',
  '41','42','43','44','45','46','47','48','49','50',
  '51','52','53','54','55','56','57','58','59','60',
  '61','62','63','64','65','66','67','68','69','70',
  '71','72','73','74','75','76','77','78','79','80',
  '81','82','83','84','85','86','87','88','89','90',
  '91','92','93','94','95','96','97','98','99','100',];

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
          <Col xl={6} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>Humidity Data</CardHeader>
              <CardBody>
                <Line data={genHumidData()} options={humchartOptions} />
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
      },
      scaleLabel: {
        display: true,
        labelString: 'Exerted weight (lbs)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Recorded Data (from oldest -> newest)'
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
      },
      scaleLabel: {
        display: true,
        labelString: 'Acceleration (m/s^2)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Recorded Data (from oldest -> newest)'
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
        min: 150,
        max: -150
      },
      scaleLabel: {
        display: true,
        labelString: 'Angular velocity (dps)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Recorded Data (from oldest -> newest)'
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
      },
      scaleLabel: {
        display: true,
        labelString: 'Humidity (%)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Recorded Data (from oldest -> newest)'
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
      },
      scaleLabel: {
        display: true,
        labelString: 'Temperature (˚C)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Recorded Data (from oldest -> newest)'
      }
    }]
  }
}



export default TablePage;
