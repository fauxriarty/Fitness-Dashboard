import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ActivityTracker from './components/ActivityTracker';
import DietLog from './components/DietLog';
import GoalSetting from './components/GoalSetting';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './components/Home';
import './App.css';



function App() {
  return (
    <Router>
      <Navigation />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/activity" component={ActivityTracker} />
              <Route path="/diet" component={DietLog} />
              <Route path="/goals" component={GoalSetting} />
              <Route path="/profile" component={UserProfile} />           
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
