import { apiClientNoAuth, apiClientTokenAuth, apiClientBasicAuth } from './apiClient';
import APIResponse from '../types/apiTypes';
import { AxiosResponse } from 'axios';
import UserType from '../types/auth';

const userEndpoint = 'api/user';
const customerEndpoint = 'api/customer'; // Assuming you have a separate endpoint for customer related operations

async function register(newUser: UserType): Promise<APIResponse<string>> {
  let error: string | undefined;
  let data: string | null = null; // Assign null as the default value for data
  try {
    const response: AxiosResponse<string> = await apiClientNoAuth().post(userEndpoint, newUser);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function login(username: string, password: string): Promise<APIResponse<UserType>> {
  let error: string | undefined;
  let data: UserType | null = null; // Assign null as the default value for data
  try {
    const response: AxiosResponse<UserType> = await apiClientBasicAuth(username, password).get(userEndpoint);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function editProfile(user: UserType, changedData: Partial<UserType>): Promise<APIResponse<string>> {
  let error: string | undefined;
  let data: string | null = null; // Assign null as the default value for data
  try {
    const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).put(userEndpoint, changedData);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function deleteUser(user: UserType): Promise<APIResponse<string>> {
  let error: string | undefined;
  let data: string | null = null; // Assign null as the default value for data
  try {
    const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).delete(userEndpoint);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function getCustomers(user: UserType, lastName?: string): Promise<APIResponse<UserType[]>> {
  let error: string | undefined;
  let data: UserType[] | null = null; // Assign null as the default value for data
  try {
    let url = customerEndpoint;
    if (lastName) {
      url += `?lastName=${lastName}`;
    }
    const response: AxiosResponse<UserType[]> = await apiClientTokenAuth(user.token!).get(url);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function getCustomerByName(user: UserType, name: string): Promise<APIResponse<UserType[]>> {
  let error: string | undefined;
  let data: UserType[] | null = null; // Assign null as the default value for data
  try {
    const response: AxiosResponse<UserType[]> = await apiClientTokenAuth(user.token!).get(`${customerEndpoint}?name=${name}`);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

export default {
  register,
  login,
  editProfile,
  deleteUser,
  getCustomers,
  getCustomerByName,
};
