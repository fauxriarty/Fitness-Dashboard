import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    const textStyle = { color: '#fff' };
    const footerStyle = { fontSize: '1.2rem', fontWeight: 'bold' };

    return (
        <div>
            <Container className="py-5 my-5 text-center">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1 className="display-4 mb-4" style={textStyle}>Welcome to Your Personal Fitness Dashboard</h1>
                        <p className="lead" style={textStyle}>
                            Your journey to a healthier lifestyle starts here. Track your activities, log your diet,
                            set goals, and monitor your progress.
                        </p>
                        <hr className="my-4" style={{ backgroundColor: '#fff' }} />
                        <p style={textStyle}>Ready to take the first step? Start by tracking your first activity.</p>
                        <Button variant="primary" size="lg" href="/activity">Get Started!</Button>
                    </Col>
                </Row>
            </Container>
            <footer className="fixed-bottom text-center py-5" style={footerStyle}>
                <p style={{ color: '#fff',marginBottom: '0.5rem' }}>Made by Aditya Chheda</p>
                <a href="./pf.html" target="_blank" rel="noopener noreferrer" style={{ color: '#fff',marginBottom: '2rem' }}>Visit Portfolio</a>
            </footer>
        </div>
    );
}

export default Home;
