import React, { Component } from 'react';
import { Button, Grid, Row, Col, Panel, Checkbox, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const adultsOptions = [{value: '1',text: '1' }, {value: '2',text: '2' }];
const childrenOptions = [{value: '0',text: '0' }, {value: '1',text: '1' }, {value: '2',text: '2' }];
const adults = adultsOptions.map(adult => {
  return (
    <option value={adult.value} key={adult.value}>{adult.text}</option>
  );
});
const children = childrenOptions.map(child => {
  return (
    <option value={child.value} key={child.value}>{child.text}</option>
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms : [
                {key: 1, text:'Room 1', checked: true,  adult: adultsOptions[0].value, child: childrenOptions[0].value},
                {key: 2, text:'Room 2', checked: false, adult: adultsOptions[0].value, child: childrenOptions[0].value},
                {key: 3, text:'Room 3', checked: false, adult: adultsOptions[0].value, child: childrenOptions[0].value},
                {key: 4, text:'Room 4', checked: false, adult: adultsOptions[0].value, child: childrenOptions[0].value}
              ],
      adult: adultsOptions[0].value,
      child: childrenOptions[0].value,
      checked: false
    };
    this.onRoomSelect = this.onRoomSelect.bind(this);
    this.submit = this.submit.bind(this);
    this.setChild = this.setChild.bind(this);
    this.setAdult = this.setAdult.bind(this);
  }
  componentDidMount() {
    let allSelectedRooms = JSON.parse(localStorage.getItem('rooms')) || this.state.rooms;
    this.setState({rooms: allSelectedRooms});
  }
  onRoomSelect(event, data) {
    event.persist();
    this.state.rooms.filter((room) => {
      if (room.checked) {
        room.checked = room.key === data.key || room.key >= data.key ? !room.checked : room.checked;
      } else {
        room.checked = room.key === data.key || room.key <= data.key ? !room.checked : room.checked;
      }
    });
    this.setState({checked: event.target.value === 'on'});
  }
  submit () {
    setDataToLocalstorage(this.state.rooms);
  }
  setAdult(event, data) {
    event.persist();
    this.state.rooms.filter((room) => {
      if (room.key === data.key) {
        data.adult = event.target.value;
      }
    });
    this.setState({adult: event.target.value});
    // setDataToLocalstorage(this.state.rooms);
  }
  setChild(event, data) {
    event.persist();
    this.state.rooms.filter((room) => {
      if (room.key === data.key) {
        data.child = event.target.value;
      }
    });
    this.setState({child: event.target.value});
  }
  render() {
    const renderChild = this.state.rooms.map((roomData, index) => {
      return (
        <Col xs={6} lg={3} key={roomData.key}>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                {(roomData.key !== 1 ) ? <Checkbox inline onChange={(event) => {this.onRoomSelect(event, roomData)}} checked={roomData.checked}> {roomData.text}</Checkbox> : roomData.text}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Col>
                <FormGroup>
                  <ControlLabel>Adults</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" disabled={!roomData.checked} onChange={(event) => {this.setAdult(event, roomData)}} value={roomData.checked ? roomData.adult : adultsOptions[0].value}>
                    {adults}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <ControlLabel>Childs</ControlLabel>
                <FormControl componentClass="select" placeholder="select" disabled={!roomData.checked} onChange={(event) => {this.setChild(event, roomData)}} value={roomData.checked ? roomData.child : childrenOptions[0].value}>
                  {children}
                </FormControl>
              </FormGroup>
            </Col>
            </Panel.Body>
          </Panel>
        </Col>
      );
    });
    return (
      <Grid>
        <Row>
          {renderChild}
       </Row>
       <Button onClick={this.submit}>Submit</Button>
      </Grid>
    );
  }
}
function setDataToLocalstorage(roomsData) {
  localStorage.setItem('rooms', JSON.stringify(roomsData));
}
export default App;
