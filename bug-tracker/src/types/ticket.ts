type TicketType = {
    id: number;
    customer_id: number;
    customer_contact: string;
    company_id: number;
    customer_name: string;
    issue_type: string;
    issue_summary: string;
    issue_level: string;
    source_submitted: string;
    assigned_team: string;
    assigned_agent: string; // Updated property name here
    status: string;
    status_reason: string;
    resolution: string;
    submit_date: string;
    notes: string;
  };
  
  export default TicketType;
  