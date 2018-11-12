import { combineReducers } from 'redux'
import tickets from "./tickets";
import user from './user';
import userTickets from './userTickets';
import businesses from './businesses';
export default combineReducers({
    tickets,
    user,
    userTickets,
    businesses
});
