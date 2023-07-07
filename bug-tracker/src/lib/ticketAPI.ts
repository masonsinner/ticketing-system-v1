import { apiClientTokenAuth } from "./apiClient";
import APIResponse from "../types/apiTypes";
import {AxiosResponse} from 'axios';
import TicketType from "../types/ticket";
import UserType from "../types/auth";

const assignedTicketEndpoint: string = '/assigned-ticket';

async function get(user: UserType): Promise<APIResponse<TicketType[]> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<TicketType[]> = await apiClientTokenAuth(user.token!).get(assignedTicketEndpoint)
        data = response.data
    } catch(err) {
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

async function create(user: UserType, createTicket: TicketType): Promise<APIResponse<TicketType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<TicketType> = await apiClientTokenAuth(user.token!).post(assignedTicketEndpoint, createTicket)
        data = response.data
    } catch(err) {
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

async function edit(user: UserType, changedData:Partial<TicketType>, id:number): Promise<APIResponse<TicketType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<TicketType> = await apiClientTokenAuth(user.token!).put(assignedTicketEndpoint+`/${id}`, changedData)
        data = response.data
    } catch(err) {
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

async function del(user: UserType, ticketID: number): Promise<APIResponse<TicketType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<TicketType> = await apiClientTokenAuth(user.token!).delete(assignedTicketEndpoint + '/' + ticketID)
        data = response.data
    } catch(err) {
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

export default {
    get,
    create,
    edit,
    del
}