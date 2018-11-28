const user_inital = {
    id: null
} 

export default function user(state = user_inital, action){
    switch(action.type){
        case "ADD_USER":
            state = action.payload.user;
            return state;
        break;
        case "REMOVE_USER":
            state = user_inital;
            return state;
        break;
        default:
            return state;
        break;
    }
}