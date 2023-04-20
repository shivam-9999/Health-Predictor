
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';

import BgImage from "../assets/img/illustrations/signin.svg";

import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";


const RegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();
  const toast = useToast();

  const isNurseRegistration = React.useMemo(() => {
    return searchParams.get('_key') === 'nurse_key';
  }, [searchParams]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    
    setLoading(true);
    const res = await signup(isNurseRegistration ? 'nurse' : 'patient', data);
    setLoading(false);

    if (res) {
      toast({
        title: 'Registration successful',
        content: 'You may now login with your credentials.',
      });
      navigate('/login');
    } else {
      toast({
        title: 'Registration failed',
        content: 'Something went wrong! Please try again.',
      });
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                  <p className="text-gray">{`Fill out the form to get started as a ${isNurseRegistration ? 'nurse' : 'patient'}.`}</p>
                </div>
                <Form className="mt-4" onSubmit={onSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus name="email" required type="email" disabled={loading} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required name="password" type="password" disabled={loading} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="firstName" className="mb-4">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <Form.Control autoFocus name="firstName" required type="text" disabled={loading} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="lastName" className="mb-4">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <Form.Control autoFocus name="lastName" required type="text" disabled={loading} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="address" className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                      <Form.Control autoFocus name="address" required type="text" disabled={loading} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="phoneNumber" className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <Form.Control autoFocus name="phoneNumber" required type="text" disabled={loading} />
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    Sign up
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={'/login'} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
                { isNurseRegistration ? (
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Need a patient account instead?
                      <Card.Link as={Link} to={'/register'} className="fw-bold">
                        {` Click here `}
                      </Card.Link>
                    </span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Need a nurse account instead?
                      <Card.Link as={Link} to={'/register?_key=nurse_key'} className="fw-bold">
                        {` Click here `}
                      </Card.Link>
                    </span>
                  </div>
                ) }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default RegistrationPage;