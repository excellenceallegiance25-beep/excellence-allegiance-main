import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RegisterManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    managerCode: '',
    department: '',
    teamSize: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    name,
    email,
    password,
    confirmPassword,
    managerCode,
    department,
    teamSize
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/auth/register/manager', {
        name,
        email,
        password,
        managerCode,
        department,
        teamSize: teamSize || 0
      });
      
      if (res.data.success) {
        setSuccess('Manager registration successful! You can now login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          <h4 className="mb-0">Register as Manager</h4>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formManagerCode">
                  <Form.Label>Manager Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter manager code"
                    name="managerCode"
                    value={managerCode}
                    onChange={onChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Required code: MANAGER2024
                  </Form.Text>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter department"
                    name="department"
                    value={department}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formTeamSize">
              <Form.Label>Team Size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of team members"
                name="teamSize"
                value={teamSize}
                onChange={onChange}
              />
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register as Manager'}
            </Button>
          </Form>

          <div className="mt-4 text-center">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
            <p>
              Want to register as <Link to="/register/employee">Employee</Link> or <Link to="/register/admin">Admin</Link>?
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterManager;