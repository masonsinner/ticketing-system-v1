import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropdownMenuIssues from "../components/DropDownIssues";
import DropdownMenuLevel from "../components/DropDownLevel";
import DropdownMenuTeam from "../components/DropDownTeam";
import DropdownMenuAsignee from "../components/DropDownAsignee";
import DropdownMenuStatus from "../components/DropDownSatus";
import DropdownMenuReason from "../components/DropDownMenuReason";
import DropdownMenuSource from "../components/DropDownSubmitType";

interface TicketData {
  ticketNum: string;
  customerName: string;
  companyName: string;
  customerTel: string;
  issueSummary: string;
  resolution: string;
}

function CreateNewTicket() {
  const initialTicketData: TicketData = {
    ticketNum: "",
    customerName: "",
    companyName: "",
    customerTel: "",
    issueSummary: "",
    resolution: "",
  };

  const [ticketData, setTicketData] = useState<TicketData>(initialTicketData);

  const handleSubmit = () => {
    fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: 1, // Replace with the actual customer ID
        customerContact: ticketData.customerTel,
        companyId: 1, // Replace with the actual company ID
        issueType: "Issue Type", // Replace with the selected issue type
        issueSummary: ticketData.issueSummary,
        issueLevel: "Issue Level", // Replace with the selected issue level
        sourceSubmitted: "Source Submitted", // Replace with the selected source
        assignedTeam: "Assigned Team", // Replace with the selected team
        assignedAgentId: 1, // Replace with the actual agent ID
        status: "Status", // Replace with the selected status
        statusReason: "Status Reason", // Replace with the selected status reason
        resolution: ticketData.resolution,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTicketData(initialTicketData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch the initial ticket number from the backend or set it to "00000001"
    const initialTicketNum = "00000001"; // Replace with the actual initial ticket number from the backend if available
    setTicketData((prevData) => ({
      ...prevData,
      ticketNum: initialTicketNum,
    }));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <div id="ticket-title">
            <h3>Create Ticket</h3>
          </div>
        </Row>
        <Row>
          <Col>
            <div className="user-options">
              <ul>
                <li>Create New Ticket</li>
                <li>Existing Tickets</li>
                <li>Knowledge Base</li>
              </ul>
            </div>
          </Col>
          <Col>
            <div id="ticket-area">
              <div className="user-data">
                <label htmlFor="ticket-num">Ticket Number: </label>
                <input
                  type="text"
                  name="ticketNum"
                  placeholder="Just for now until flask"
                  value={ticketData.ticketNum}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="Customer">Customer: </label>
                <input
                  type="text"
                  id="customer-name"
                  name="customerName"
                  placeholder="Random, Joe"
                  value={ticketData.customerName}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="Company">Company: </label>
                <input
                  type="text"
                  id="company-id"
                  name="companyName"
                  placeholder="Just until flask"
                  value={ticketData.companyName}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="Contact">Contact: </label>
                <input
                  type="tel"
                  id="customer-tel"
                  name="customerTel"
                  value={ticketData.customerTel}
                  onChange={handleInputChange}
                />
              </div>
              <div className="ticket-info">
                <h5>What is the Issue on?</h5>
                <DropdownMenuIssues />
                <label htmlFor="summary">Summary: </label>
                <input
                  type="text"  
                  id="ticket-summary"
                  name="issueSummary"
                  placeholder="Summary"
                  value={ticketData.issueSummary}
                  onChange={handleInputChange}
                />
                <DropdownMenuLevel />
              </div>
              <div className="ticket-assign">
                <DropdownMenuSource />
                <DropdownMenuTeam />
                <DropdownMenuAsignee />
                <DropdownMenuStatus />
                <DropdownMenuReason />
                <label htmlFor="resolution">Resolution: </label>
                <input
                  type="text"  
                  id="ticket-resolution"
                  name="resolution"
                  placeholder="Steps to resolution..."
                  value={ticketData.resolution}
                  onChange={handleInputChange}
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="ticket-notes">
              <div className="note-cat">
                <h4>Notes</h4>
                <h4>Submit Date</h4>
                <h4>Submitter</h4>
              </div>
              <div className="cat-details">
                <p>User needed help with web app.</p>
                <p>Flask will enter data</p>
                <p>I will with React most likely or Flask</p>
              </div>
              <div className="details-enlarge">
                <label htmlFor="Chat">Chat </label>
                <textarea id="chat-large" placeholder="Chat here" />
                <label htmlFor="Notes">Notes</label>
                <textarea id="notes-large" placeholder="Additional notes..."></textarea>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateNewTicket;
