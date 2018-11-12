

export default function businesses(state = {}, action){
        
    switch(action.type){
        case "ADD_USER_BUSINESSES":
            action.payload.businesses.map(business => {
                state[business.id] = business
            });
            
            return state;
        break;
    }
    return state;
}