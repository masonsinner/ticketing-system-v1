// import React from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserType from "../types/auth";

type Props = {user:UserType}

export default function KnowlegeBase({user}: Props) {
    return (
        <>
        <Container>
            <Row>
                <div id="ticket-title">
                    <h3>Immedite Assistance</h3>
                </div>
            </Row>
            <Row>
                <div id="new-ticket">
                <Col>
                    <div className="user-options">
                        <ul>
                            <li>Create New Ticket</li>
                            <li>Existing Tickets</li>
                            <li>Knowlege Base</li>
                        </ul>
                    </div>
                </Col>
                <Col>
                    <div id="knowlege-base">
                        <h4>Knowlege Base</h4>
                        <label htmlFor="Knowlege Search">What do you need help with: </label>
                        <input type="text" id="knowlege-search-input" placeholder="Can't login to Coding Temple"/>
                        <Button>Search</Button>
                        <p>Place Holder for data that will be generated for each issue's resolution</p>
                    </div>
                </Col>
                </div>
            </Row>
        </Container>
        </>
    );
}