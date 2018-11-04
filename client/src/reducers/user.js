const user_inital = {
    id: null
} 
//amig nincs 

export default function user(state = user_inital, action){
    switch(action.type){
        case "ADD_USER":
            state = action.payload;
            return state;
        break;
        default:
            return state;
        break;
    }
}