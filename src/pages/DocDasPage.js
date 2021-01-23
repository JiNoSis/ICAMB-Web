import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Table
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import firebase from '../firebase.js';

const DasPage = () => {
  let load_list = [];
  let gyro_x_list = [];
  let gyro_y_list = [];
  let gyro_z_list = [];
  let accel_x_list = [];
  let accel_y_list = [];
  let accel_z_list = [];
  let humid_list = [];
  let temp_list = [];
  const [formData, setFormData] = React.useState({
    patId: "",
  })
  const [query, setQuery] = React.useState({
    patId: "",
  })
  const [data, setData] = React.useState([{
    gyro_x: [],
    gyro_y: [],
    gyro_z: [],
    accel_x: [],
    accel_y: [],
    accel_z: [],
    loadcell: [],
    temp: [],
    humid: []
  }])
  React.useEffect(() => {
    firebase.database().ref('sensor_info')
      .orderByChild('pat_id').equalTo(query.patId)
      .limitToFirst(100)
      .on("value", (data) => {
        let tmpArr = []
        data.forEach(patient => {
          let tmpVal = patient.val()
          tmpArr.push({
            gyro_x: tmpVal.gyro_x,
            gyro_y: tmpVal.gyro_y,
            gyro_z: tmpVal.gyro_z,
            accel_x: tmpVal.accel_x,
            accel_y: tmpVal.accel_y,
            accel_z: tmpVal.accel_z,
            loadcell: tmpVal.load_cell,
            temp: tmpVal.temp,
            humid: tmpVal.humid
          })
        })
        setData(tmpArr)
      })
    return () => { }
  }, [query])

  const handleValueChange = (e, state) => {
    setFormData({
      ...formData,
      [state]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(formData)
    setQuery(formData)
  }
  return (
    <Page title="Dashboard" breadcrumbs={[{ name: 'doc-dashboard', active: true }]}>
      {data.map(patient => {
        load_list.push(patient.loadcell);
        accel_x_list.push(patient.accel_x);
        accel_y_list.push(patient.accel_y);
        accel_z_list.push(patient.accel_z);
        gyro_x_list.push(patient.gyro_x);
        gyro_y_list.push(patient.gyro_y);
        gyro_z_list.push(patient.gyro_z);
        humid_list.push(patient.humid);
        temp_list.push(patient.temp);

      })}
      <Card>
        <CardHeader>Insert Patient ID to access Dashboard</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Patient ID:</Label>
              <Input value={formData.patId} onChange={(e) => handleValueChange(e, "patId")} className="mb-2" />
            </FormGroup>
            <Label for="exampleSelect">Click for Search </Label>
            <br></br>
            <Button onClick={handleSubmit}>Search</Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>Load Cell Data</CardHeader>
        <CardBody>
          <Line data={genLoadData(load_list)} options={loadchartOptions} />
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>Angular Acceleration Data</CardHeader>
        <CardBody>
          <Line data={genAccelData(accel_x_list, accel_y_list, accel_z_list)} options={accelchartOptions} />
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>Gyroscope Data</CardHeader>
        <CardBody>
          <Line data={genGyroData(gyro_x_list, gyro_y_list, gyro_z_list)} options={gyrochartOptions} />
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>Humidity Data</CardHeader>
        <CardBody>
          <Line data={genHumidData(humid_list)} options={humchartOptions} />
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardHeader>Temperature Data</CardHeader>
        <CardBody>
          <Line data={genTempData(temp_list)} options={tempchartOptions} />
        </CardBody>
      </Card>
    </Page>
  );
};

const genLoadData = (input) => {
  const Period = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',];
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
        data: input,
      }
    ],
  };
};

const genGyroData = (input1, input2, input3) => {
  const Period = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',];
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
        data: input1,
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
        data: input2,
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
        data: input3,
      }
    ],
  };
};

const genAccelData = (input1, input2, input3) => {
  const Period = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',];
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
        data: input1,
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
        data: input2,
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
        data: input3,
      }
    ],
  };
};

const genHumidData = (input) => {
  const Period = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',];
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
        data: input,
      }
    ],
  };
};

const genTempData = (input) => {
  const Period = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',];
  return {
    labels: Period,
    datasets: [
      {
        label: 'temperature',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(220,100,192,0.4)',
        borderColor: 'rgba(220,100,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(220,100,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(220,100,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: input,
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

export default DasPage;
