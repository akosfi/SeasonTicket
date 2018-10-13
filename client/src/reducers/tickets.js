

export default function tickets(state = {}, action){
        
    switch(action.type){
        case "ADD_TICKETS":
            action.payload.tickets.map(ticket => {
                state[ticket.id] = ticket
            });
            
            return state;
        break;
        case "DELETE_TICKET":
            delete state[action.payload.id];
            return state;
        break;
    }
    return state;
}