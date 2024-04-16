import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    
    const textStyle = { color: '#fff' }; 
    

    return (
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
              <Button variant="primary" size="lg" href="/activity">
                Get Started!
              </Button>
            </Col>
          </Row>
        </Container>
      );
    }
    
    export default Home;