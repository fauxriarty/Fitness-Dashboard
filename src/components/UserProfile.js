import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

function UserProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [isProfileSaved, setIsProfileSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !age) {
            alert('Please fill in all fields.');
            return;
        }
        setIsProfileSaved(true);
    };

    return (
        <div className="mt-5 mb-5">
            <Card className="container p-4">
                <Card.Body>
                    {isProfileSaved ? (
                        <div>
                            <Card.Title className="mb-4">Profile Details</Card.Title>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Name:</h5>
                                    <p>{name}</p>
                                </div>
                                <div className="col-md-6">
                                    <h5>Email:</h5>
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Age:</h5>
                                    <p>{age}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Card.Title className="mb-4">User Profile</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter your age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="dark" className="mb-2" type="submit">Save Profile</Button>
                            </Form>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserProfile;
