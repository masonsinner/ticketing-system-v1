import { apiClientNoAuth, apiClientTokenAuth, apiClientBasicAuth } from './apiClient';
import APIResponse from '../types/apiTypes';
import { AxiosResponse } from 'axios';
import CompanyType from '../types/companyAuth';

const companyEndpoint = '/api/company';

async function createCompany(newCompany: CompanyType): Promise<APIResponse<CompanyType>> {
  let error: string | undefined;
  let data: CompanyType | null = null;
  try {
    const response: AxiosResponse<CompanyType> = await apiClientNoAuth().post(companyEndpoint, newCompany);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function updateCompany(company: CompanyType, changedData: Partial<CompanyType>): Promise<APIResponse<string>> {
  let error: string | undefined;
  let data: string | null = null;
  try {
    const response: AxiosResponse<string> = await apiClientTokenAuth(company.token!).put(companyEndpoint, changedData);
    data = response.data;
  } catch (err) {
    error = 'Something went wrong';
  }
  return {
    error,
    data,
  };
}

async function deleteCompany(company: CompanyType): Promise<APIResponse<string>> {
  let error: string | undefined;
  let data: string | null = null;
  try {
    const response: AxiosResponse<string> = await apiClientTokenAuth(company.token!).delete(companyEndpoint);
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
  createCompany,
  updateCompany,
  deleteCompany,
};
