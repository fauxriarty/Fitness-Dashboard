import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const predefinedActivities = ["Running", "Cycling", "Swimming", "Weight Lifting", "Yoga"];

function ActivityTracker() {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [log, setLog] = useState([]);
  const [chartData, setChartData] = useState({
    labels: predefinedActivities,
    datasets: [{
      label: 'Total Duration (minutes)',
      data: predefinedActivities.map(() => 0),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  });
  const [activityAdvice, setActivityAdvice] = useState('');

  useEffect(() => {
    const activityDuration = predefinedActivities.reduce((acc, activity) => {
      acc[activity] = 0;
      return acc;
    }, {});

    log.forEach(entry => {
      if (activityDuration.hasOwnProperty(entry.activity)) {
        activityDuration[entry.activity] += parseInt(entry.duration, 10);
      }
    });

    setChartData({
      labels: Object.keys(activityDuration),
      datasets: [{
        label: 'Total Duration (minutes)',
        data: Object.values(activityDuration),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    });

    // Analyze the activity distribution and set advice or conclusions
    const totalDuration = Object.values(activityDuration).reduce((acc, duration) => acc + duration, 0);
    const averageDuration = totalDuration / predefinedActivities.length;
    const maxDurationActivity = Object.keys(activityDuration).reduce((max, activity) => {
      return activityDuration[activity] > activityDuration[max] ? activity : max;
    }, predefinedActivities[0]);

    if (totalDuration === 0) {
      setActivityAdvice("You haven't logged any activities yet. Start tracking your activities to get personalized advice.");
    } else {
      if (averageDuration < 30) {
        setActivityAdvice("You seem to be spending less time on activities. Consider increasing the duration for each activity.");
      } else if (averageDuration > 60) {
        setActivityAdvice("You're doing great! Your average activity duration is higher than usual. Keep up the good work!");
      } else {
        setActivityAdvice("You have a balanced distribution of activity durations. Keep maintaining this balance for a healthy lifestyle.");
      }
      if (activityDuration[maxDurationActivity] > totalDuration * 0.5) {
        setActivityAdvice(prevAdvice => prevAdvice + ` Spend more time on ${maxDurationActivity.toLowerCase()} to maximize your workout.`);
      }
    }
  }, [log]);

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
      <Card className="container mt-4 p-4">
        <Card.Body>
          <Card.Title>Activity Summary</Card.Title>
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  beginAtZero: true
                }
              }
            }}
          />
          <p className="mt-3">{activityAdvice}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ActivityTracker;
