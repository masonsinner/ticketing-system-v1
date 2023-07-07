import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserType from '../types/auth';

interface Ticket {
  id: number;
  issue_summary: string;
  assigned_agent: {
    email: string;
  } | null;
  // Add other properties of the Ticket object as needed
}

type Props = { user: UserType | null };

export default function UserPortal({ user }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/tickets', {
          params: { assignedAgentId: user?.id },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchTickets();
  }, [user]);

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
                  <li>Get Help Now</li>
                </ul>
              </div>
            </Col>
            <Col>
              <div id="user-current-screen">
                <h1>
                  {tickets.map((ticket) => (
                    <div key={ticket.id}>
                      <p>Ticket ID: {ticket.id}</p>
                      <p>Issue Summary: {ticket.issue_summary}</p>
                      <p>
                        Assigned Agent:{' '}
                        {ticket.assigned_agent ? ticket.assigned_agent.email : 'Unassigned'}
                      </p>
                      <hr />
                    </div>
                  ))}
                </h1>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}
