import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

const typicalGoals = {
    "Weight Loss": "Losing weight can improve your overall health and reduce the risk of chronic diseases. To achieve weight loss, focus on a balanced diet and regular exercise.",
    "Muscle Gain": "Building muscle can increase strength, improve metabolism, and enhance overall physique. To gain muscle, focus on resistance training and adequate protein intake.",
    "Fitness Improvement": "Improving fitness levels can enhance energy, mood, and overall well-being. To improve fitness, engage in regular physical activity, including cardiovascular and strength exercises.",
    "Healthy Eating": "Adopting a healthy eating pattern can improve nutrient intake and reduce the risk of chronic diseases. Focus on consuming a variety of fruits, vegetables, lean proteins, and whole grains.",
};

function GoalSetting() {
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [goals, setGoals] = useState([]);
    const [selectedGoalAdvice, setSelectedGoalAdvice] = useState('');

    const addGoal = () => {
        if (!goal || !deadline) {
            alert('Please fill in all fields.');
            return;
        }
        const newGoal = { goal, deadline, id: goals.length + 1 };
        setGoals([...goals, newGoal]);
        setGoal('');
        setDeadline('');
    };

    const handleGoalChange = (selectedGoal) => {
        setGoal(selectedGoal);
        setSelectedGoalAdvice(typicalGoals[selectedGoal]);
    };

    return (
        <div className="mt-5 mb-5">
            <Card className="container p-4">
                <Card.Body>
                    <Card.Title className="mb-4">Set Your Goals</Card.Title>
                    <Form>
                        <Form.Group controlId="formGoal" className="mb-3">
                            <Form.Label>Your Goal</Form.Label>
                            <Form.Control
                                as="select"
                                value={goal}
                                onChange={(e) => handleGoalChange(e.target.value)}
                            >
                                <option value="">Select a goal</option>
                                {Object.keys(typicalGoals).map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDeadline" className="mb-5">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="dark" className="mb-2" onClick={addGoal}>Set Goal</Button>
                    </Form>
                </Card.Body>
            </Card>

            {selectedGoalAdvice && (
                <Card className="container mt-4 p-4">
                    <Card.Body>
                        <Card.Title>Goal Advice</Card.Title>
                        <p>{selectedGoalAdvice}</p>
                    </Card.Body>
                </Card>
            )}

            <Card className="container mt-4 p-4">
                <Card.Body>
                    <Card.Title>Your Goals</Card.Title>
                    <ListGroup variant="flush">
                        {goals.map((goal) => (
                            <ListGroup.Item key={goal.id} className="d-flex justify-content-between align-items-center">
                                <span>{goal.goal} - by {goal.deadline}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}

export default GoalSetting;
