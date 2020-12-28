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
  const [formData, setFormData] = React.useState({
    patId: "",
  })
  const [query, setQuery] = React.useState({
    patId: "",
  })
  const [data, setData] = React.useState([{
    time:[],
    gyro_x: [],
    gyro_y: [],
    gyro_z: [],
    accel_x: [],
    accel_y: [],
    accel_z: [],
    loadcell: [],
    temp: [],
    humid: [],
    date:[]
  }])
  React.useEffect(() => {
    firebase.database().ref('sensor_info')
      .orderByChild('pat_id').equalTo(query.patId)
      .on("value", (data) => {
        let tmpArr = []
        data.forEach(patient => {
          let tmpVal = patient.val()
          tmpArr.push({
            date: tmpVal.date,
            time: tmpVal.time,
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
    <Page
        title="Raw Load Pressure Data Tables"
        breadcrumbs={[{ name: 'load-tables', active: true }]}
        className="TablePage"
      >
      <Card>
        <CardHeader>Insert Patient ID to access Data</CardHeader>
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

      <br />

      <Card className="mb-3">
        <CardHeader>Foot Pressure Raw Data</CardHeader>
        <CardBody>
          <Table {...{ 'striped': true }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Loadcell</th>
              </tr>
            </thead>
            <tbody>
            {data.map(patient => {
                return (
                  <tr>
                    <td>{patient.date}</td>
                    <td>{patient.time}</td>
                    <td>{patient.loadcell}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
};


export default DasPage;
