
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

function DietLog() {
    const [meal, setMeal] = useState('');
    const [calories, setCalories] = useState('');
    const [mealType, setMealType] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [logs, setLogs] = useState([]);
    const [dietAdvice, setDietAdvice] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Calorie Distribution',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const caloriesByType = logs.reduce((acc, log) => {
            acc[log.mealType] = (acc[log.mealType] || 0) + parseInt(log.calories, 10);
            return acc;
        }, {});

        const sortedMealTypes = Object.keys(caloriesByType).sort();
        const sortedCalories = sortedMealTypes.map(type => caloriesByType[type]);

        setChartData({
            ...chartData,
            labels: sortedMealTypes,
            datasets: [{
                ...chartData.datasets[0],
                data: sortedCalories
            }]
        });

        const totalCalories = sortedCalories.reduce((acc, val) => acc + val, 0);
        if (totalCalories > 2000) {
            setDietAdvice("Your calorie intake is above the recommended daily amount. Consider revising your diet to include lower-calorie meals.");
        } else if (totalCalories < 1200) {
            setDietAdvice("Your calorie intake is below the recommended daily amount. It's important to consume enough calories for a balanced diet.");
        } else {
            setDietAdvice("Your calorie distribution is within a healthy range. Keep up the good work!");
        }

    }, [logs, chartData]);

    const logMeal = () => {
        if (!meal || !calories || !mealType || !mealTime) {
            alert('Please fill in all fields.');
            return;
        }
        const newLog = { meal, calories, mealType, mealTime, id: logs.length + 1 };
        setLogs([...logs, newLog]);
        setMeal('');
        setCalories('');
        setMealType('');
        setMealTime('');
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
           

            <Card className="container mt-4 p-4">
                <Card.Body>
                    <Card.Title>Calorie Distribution</Card.Title>
                    <Pie data={chartData} />
                    <p className="mt-3">{dietAdvice}</p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DietLog;
