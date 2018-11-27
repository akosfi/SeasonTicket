import {ADD_USER, DELETE_TICKET, ADD_TICKETS, ADD_USER_TICKETS, REMOVE_USER, ADD_USER_BUSINESSES, ADD_TICKET, CLEAR_TICKETS} from './action-types';

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
export const addTicketAction = (ticket) => ({
    type: ADD_TICKET,
    payload: {
        ticket: ticket
    }
});
export const addUserTicketsAction = (tickets) => ({
    type: ADD_USER_TICKETS,
    payload: {
        tickets: tickets
    }
});

export const addUserBusinessesAction = (businesses) => ({
    type: ADD_USER_BUSINESSES,
    payload: {
        businesses: businesses
    }
});

export const removeUserAction = () => ({
    type: REMOVE_USER
});
export const clearTicketsAction = () => ({
    type: CLEAR_TICKETS
});