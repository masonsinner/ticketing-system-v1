from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
import os
from datetime import datetime as dt, timedelta
import secrets
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import dotenv_values

env_variables = dotenv_values(".env")

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, resources={r"/*": {"origins": "*"}})

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, index=True, unique=True)
    phone_number = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    password = db.Column(db.String)
    created_on = db.Column(db.DateTime, default=dt.utcnow)
    modified_on = db.Column(db.DateTime, onupdate=dt.utcnow)
    user_type = db.Column(db.String)
    token = db.Column(db.String, index=True, unique=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship('Company', backref='users')

    def __init__(self, user_type=None, **kwargs):
        self.user_type = user_type
        super(User, self).__init__(**kwargs)

    def get_token(self, exp=900):
        current_time = dt.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token

    def revoke_token(self):
        self.token_exp = dt.utcnow() - timedelta(seconds=120)

    @staticmethod
    def check_token(token):
        u = User.query.filter_by(token=token).first()
        if not u or u.token_exp < dt.utcnow():
            return None
        return u

    def hash_password(self, original_password):
        return generate_password_hash(original_password)

    def check_hashed_password(self, login_password):
        return check_password_hash(self.password, login_password)

    def __repr__(self):
        return f'<{self.id} | {self.email}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "phone_number": self.phone_number,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "user_type": self.user_type,
        }

    def from_dict(self, data):
        for field in ["email", "first_name", "last_name", "password", "phone_number"]:
            if field in data:
                if field == "password":
                    setattr(self, field, self.hash_password(data[field]))
                else:
                    setattr(self, field, data[field])
        self.modified_on = dt.utcnow()


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    customer_contact = db.Column(db.String)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    issue_type = db.Column(db.String)
    issue_summary = db.Column(db.String)
    issue_level = db.Column(db.String)
    source_submitted = db.Column(db.String)
    assigned_team = db.Column(db.String)
    assigned_agent_id = db.Column(db.Integer, db.ForeignKey('agent.id'))
    status = db.Column(db.String)
    status_reason = db.Column(db.String)
    resolution = db.Column(db.String)
    ticket_notes = db.relationship('TicketNote', backref='ticket', lazy='dynamic')
    assigned_tickets = db.relationship('Customer', backref='customer_assigned_tickets')  # Updated backref name



    def to_dict(self):
        return {
            "id": self.id,
            "customer": self.customer.to_dict(),
            "customer_contact": self.customer_contact,
            "company": self.company.to_dict(),
            "issue_type": self.issue_type,
            "issue_summary": self.issue_summary,
            "issue_level": self.issue_level,
            "source_submitted": self.source_submitted,
            "assigned_team": self.assigned_team,
            "assigned_agent": self.assigned_agent.to_dict() if self.assigned_agent else None,
            "status": self.status,
            "status_reason": self.status_reason,
            "resolution": self.resolution,
            "ticket_notes": [note.to_dict() for note in self.ticket_notes]
        }


class TicketNote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'))
    note = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "note": self.note
        }


class Agent(User):
    __tablename__ = 'agent'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    email = db.Column(db.String, unique=True)  # Add this line
    tickets = db.relationship('Ticket', backref='assigned_agent', lazy='dynamic')

    def __repr__(self):
        return f'<Agent {self.id} | {self.email}>'


class Customer(User):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    tickets = db.relationship('Ticket', backref='customer', lazy='dynamic')

    def __repr__(self):
        return f'<Customer {self.id} | {self.email}>'


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/api/user', methods=['GET', 'POST'])
@cross_origin(origin='http://localhost:5173/get-started')
def handle_user():
    if request.method == 'POST':
        # Handle POST request for user registration
        user_data = request.json
        email = user_data.get('email')
        password = user_data.get('password')
        user_type = user_data.get('user_type')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        if user_type.lower() == 'agent':
            agent = Agent(email=email, password=password, user_type='agent')
            db.session.add(agent)
            db.session.commit()
            return jsonify({'message': 'Agent registered successfully'}), 201
        
        if user_type.lower() == 'customer':
            customer = Customer(email=email, password=password, user_type='customer')
            db.session.add(customer)
            db.session.commit()
            return jsonify({'message': 'Customer registered successfully'}), 201

        user = User(user_type='customer')
        user.from_dict(user_data)  # Update user fields from the provided data
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201

    elif request.method == 'GET':
        user_type = request.args.get('type')

        if user_type == 'agent':
            agents = Agent.query.all()
            return jsonify({'users': [agent.to_dict() for agent in agents]})

        # Handle GET request to retrieve user data
        # Implement the logic to retrieve and return user data as per your requirements
        return jsonify({'message': 'GET request received'})

    else:
        # Method not allowed
        return jsonify({'error': 'Method not allowed'}), 405



@app.route('/api/company', methods=['POST'])
def create_company():
    company_data = request.json
    name = company_data.get('name')

    if not name:
        return jsonify({'error': 'Company name is required'}), 400

    company = Company(name=name)
    db.session.add(company)
    db.session.commit()

    return jsonify({'message': 'Company created successfully'}), 201


@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.all()
    return jsonify([ticket.to_dict() for ticket in tickets])


@app.route('/api/tickets', methods=['POST', 'GET'])
@cross_origin(origin='http://localhost:5173/new-ticket')
def create_ticket():
    ticket_data = request.json

    ticket = Ticket(
        customer_contact=ticket_data['customer_contact'],
        company_id=ticket_data['company_id'],
        issue_type=ticket_data['issue_type'],
        issue_summary=ticket_data['issue_summary'],
        issue_level=ticket_data['issue_level'],
        source_submitted=ticket_data['source_submitted'],
        assigned_team=ticket_data['assigned_team'],
        assigned_agent_id=ticket_data['assigned_agent_id'],
        status=ticket_data['status'],
        status_reason=ticket_data['status_reason'],
        resolution=ticket_data['resolution']
    )

    db.session.add(ticket)
    db.session.commit()

    return jsonify({'message': 'Ticket created successfully'}), 201

def get_tickets():
    assigned_agent_id = request.args.get('assignedAgentId')

    if assigned_agent_id:
        tickets = Ticket.query.filter_by(assigned_agent_id=assigned_agent_id).all()
    else:
        tickets = Ticket.query.all()

    return jsonify([ticket.to_dict() for ticket in tickets])


@app.route('/api/tickets/<int:ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return jsonify({'error': 'Ticket not found'}), 404

    ticket_data = request.json
    ticket.customer_id = ticket_data['customerId']
    ticket.customer_contact = ticket_data['customerContact']
    ticket.company_id = ticket_data['companyId']
    ticket.issue_type = ticket_data['issueType']
    ticket.issue_summary = ticket_data['issueSummary']
    ticket.issue_level = ticket_data['issueLevel']
    ticket.source_submitted = ticket_data['sourceSubmitted']
    ticket.assigned_team = ticket_data['assignedTeam']
    ticket.assigned_agent_id = ticket_data['assignedAgentId']
    ticket.status = ticket_data['status']
    ticket.status_reason = ticket_data['statusReason']
    ticket.resolution = ticket_data['resolution']

    db.session.commit()
    return jsonify({'message': 'Ticket updated successfully'})


@app.route('/api/tickets/<int:ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return jsonify({'error': 'Ticket not found'}), 404

    db.session.delete(ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket deleted successfully'})

if __name__ == '__main__':
    app.run()