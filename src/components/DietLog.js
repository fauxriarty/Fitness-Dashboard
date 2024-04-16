import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

function DietLog() {
    const [meal, setMeal] = useState('');
    const [calories, setCalories] = useState('');
    const [mealType, setMealType] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [date, setDate] = useState('');
    const [logs, setLogs] = useState([]);

    const logMeal = () => {
        if (!meal || !calories || !mealType || !mealTime || !date) {
            alert('Please fill in all fields.');
            return;
        }
        const newLog = { meal, calories, mealType, mealTime, date, id: logs.length + 1 };
        setLogs([...logs, newLog]);
        setMeal('');
        setCalories('');
        setMealType('');
        setMealTime('');
        setDate('');
    };

    const deleteLog = (id) => {
        setLogs(logs.filter(log => log.id !== id));
    };

    return (
        <div className="mt-5 mb-5">
            <Card className="container p-4">
                <Card.Body>
                    <Card.Title className="mb-4">Diet Log</Card.Title>
                    <Form>
                        <Form.Group className="mb-4"controlId="formMeal">
                            <Form.Label>Meal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter meal"
                                value={meal}
                                onChange={e => setMeal(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formCalories">
                            <Form.Label>Calories</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter calories"
                                value={calories}
                                onChange={e => setCalories(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formMealType" className="mb-4">
                            <Form.Label>Meal Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={mealType}
                                onChange={e => setMealType(e.target.value)}
                            >
                                <option value="">Select meal type</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formMealTime" className="mb-4">
                            <Form.Label>Meal Time</Form.Label>
                            <Form.Control
                                as="select"
                                value={mealTime}
                                onChange={e => setMealTime(e.target.value)}
                            >
                                <option value="">Select meal time</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                                <option value="Night">Night</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="dark" className="mb-2" onClick={logMeal}>Log Meal</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="container mt-4 p-4">
                <Card.Body>
                    <Card.Title>Your Logged Meals</Card.Title>
                    <ListGroup variant="flush">
                        {logs.map(log => (
                            <ListGroup.Item key={log.id} className="d-flex justify-content-between align-items-center">
                                <span>{log.meal} - {log.calories} Calories ({log.mealType}, {log.mealTime})</span>
                                <Button variant="outline-danger" size="sm" onClick={() => deleteLog(log.id)}>Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DietLog;
