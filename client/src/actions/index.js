import {ADD_USER, DELETE_TICKET, ADD_TICKETS, ADD_USER_TICKETS} from './action-types';

export const addUserAction = (id) => ({
    type: ADD_USER,
    payload: {
        id
    }
});

export const deleteTicketAction = (_id) => ({
    type: DELETE_TICKET,
    payload: {
        id: _id
    }
});


export const addTicketsAction = (tickets) => ({
    type: ADD_TICKETS,
    payload: {
        tickets: tickets
    }
});

export const addUserTicketsAction = (tickets) => ({
    type: ADD_USER_TICKETS,
    payload: {
        tickets: tickets
    }
});