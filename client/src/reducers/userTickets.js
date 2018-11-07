

export default function userTickets(state = {}, action){
        
    switch(action.type){
        case "ADD_USER_TICKETS":
            action.payload.tickets.map(ticket => {
                state[ticket.id] = ticket
            });
            
            return state;
        break;
    }
    return state;
}