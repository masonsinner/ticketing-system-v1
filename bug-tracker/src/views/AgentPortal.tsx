// import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserType from '../types/auth';

type Props = {user:UserType}

export default function AgentPortal({user}: Props) {
    return (
        <>
        <Container>
            <Row>
                <div id="user-title">
                    <h3>Welcome Back!</h3>
                </div>
            </Row>
            <Row>
                <div id="user-portal">
                <Col>
                    <div className="user-options">
                        <ul>
                            <li>Create New Ticket</li>
                            <li>Existing Tickets</li>
                            <li>Equipment Request</li>
                            <li>Knowlege Base</li>
                        </ul>
                    </div>
                </Col>
                <Col>
                    <div id="user-current-screen">
                        <h1>This is where the selected tab will be opened for the agent</h1>
                    </div>
                </Col>
                </div>
            </Row>
        </Container>
        </>
    );
}