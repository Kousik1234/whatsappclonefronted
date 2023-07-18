import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const initiaValue = {
    signup:null,
    signin:null,
    reqUser:null,
    serachUsers: [],
}

export const authReducer = (store=initiaValue, {type,payload})=>{
    if (type === REGISTER) {
        return{...store,signup:payload}
    } else if (type === LOGIN) {
        return{...store,signin:payload}
    } else if (type === REQ_USER) {
        return{...store,reqUser:payload}
    } else if (type === SEARCH_USER) {
        return{...store,serachUsers:payload}
    } else if (type === UPDATE_USER) {
        return{...store,updateUser:payload}
    }
    return store;
} 