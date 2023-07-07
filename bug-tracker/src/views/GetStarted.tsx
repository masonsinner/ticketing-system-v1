import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../index.css"
import UserType from '../types/auth';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import RegisterCompany from '../components/RegisterCompany';

type Props = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export default function GetStarted({ user, setUser }: Props) {
  return (
    <Container>
      <Row>
        <div className="title">
          <h1>Take the Next Steps!</h1>
        </div>
      </Row>
      <Row>
        <div className="login-reg">
          <Col>
            <RegisterForm />
          </Col>
          <Col>
            <LoginForm setUser={setUser} />
          </Col>
          <Col>
            <RegisterCompany />
          </Col>
        </div>
      </Row>
    </Container>
  );
}
