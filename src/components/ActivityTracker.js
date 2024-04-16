import React, { useState } from 'react';
import { Card, Form, Button, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const predefinedActivities = ["Running", "Cycling", "Swimming", "Weight Lifting", "Yoga"];

function ActivityTracker() {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [log, setLog] = useState([]);

  const logActivity = () => {
    if (!activity || !duration || !date) {
      alert('Please fill in all fields.');
      return;
    }
    const newEntry = { activity, duration, date, id: Date.now() };
    setLog([...log, newEntry]);
    setActivity('');
    setDuration('');
    setDate('');
  };

  const removeActivity = (id) => {
    setLog(log.filter(entry => entry.id !== id));
  };
  return (
    <div className="mt-5 mb-5">
      <Card className="container p-4">
        <Card.Body>
          <Card.Title className="mb-4">Log your Activities  </Card.Title>
          <Form>
            <Form.Group controlId="dropdownActivityType" className="mb-3">
              <Form.Label>Activity Type</Form.Label>
              <DropdownButton
                variant="outline-secondary"
                title={activity || "Select Activity"}
                onSelect={(eventKey) => setActivity(eventKey)}
                className="mb-4" 
              >
                {predefinedActivities.map((act, idx) => (
                  <Dropdown.Item key={idx} eventKey={act}>{act}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group controlId="formActivityDuration" className="mb-3">
              <Form.Label>Duration (in minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formActivityDate" className="mb-5">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" className="mb-2" onClick={logActivity}>
              Log Activity
            </Button>
          </Form>
        </Card.Body>
      </Card>


      <Card className="container mt-4 p-4">
        <Card.Body>
          <Card.Title>Your Logged Activities</Card.Title>
          <ListGroup variant="flush">
            {log.map((entry) => (
              <ListGroup.Item key={entry.id} className="d-flex justify-content-between align-items-center">
                {entry.activity} - {entry.duration} minutes on {entry.date}
                <Button variant="outline-danger" size="sm" onClick={() => removeActivity(entry.id)}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ActivityTracker;
