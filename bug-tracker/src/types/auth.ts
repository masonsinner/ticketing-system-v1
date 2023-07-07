type UserType = {
    id: number;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    phone_number: string;
    modified_on: string;
    token_exp: string;
    company_id: number;
    user_type: string; // Added user_type field with "customer" and "agent" as possible values
  };
  
  export default UserType;
  