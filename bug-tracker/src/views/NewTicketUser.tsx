import React, { useState, useEffect, ChangeEvent } from "react";
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
  const [agents, setAgents] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((response) => response.json())
      .then((data) => {
        setAgents(data.agents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    // Remove the "ticketNum" property from the ticketData object
    const { ticketNum, ...dataWithoutTicketNum } = ticketData;

    // Send the request without the "ticketNum" property
    fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithoutTicketNum),
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

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
            <div id="ticket-area">
              <div className="user-data">
                <label htmlFor="ticket-num">Ticket Number: </label>
                <input
                  type="text"
                  name="ticketNum"
                  placeholder="Ticket Number"
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
                  placeholder="Company Name"
                  value={ticketData.companyName}
                  onChange={handleInputChange}
                />
                <br />
                <label htmlFor="Contact">Contact: </label>
                <input
                  type="tel"
                  id="customer-tel"
                  name="customerTel"
                  placeholder="555-555-5555"
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
                <DropdownMenuAsignee
                  users={agents} // Pass the agents array directly
                  handleSelectChange={handleSelectChange}
                />
                {/* <label htmlFor="assignee">Assignee: </label>
                <input type="text" id="ticket-assignee" placeholder="Assignee" name="assignee" onChange={handleInputChange}/> */}
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
