import { combineReducers } from "redux";


let InitialfilterOptions = {
    'Date': true,
    'App': true,
    'Ad Requests': true,
    'Ad Responses': true,
    'Impression': true,
    'Clicks': true,
    'Revenue': true,
    'Fill Rate' : true,
    'CTR': true
  }


const appnamesReducer =  (state={},action) => {
    if(action.type==="GET_APP_NAMES"){
        let namesObj = {}
        action.payload.forEach((appInfo) => {
            namesObj[appInfo.app_id] = appInfo.app_name
        })

        return {...namesObj}
    }

    return state
}

const reportsReducer = (state=[],action) => {
    if(action.type==="GET_REPORTS"){
        return [...action.payload]
    }

    return state
}

const filterReducer = (state={...InitialfilterOptions}, action) => {

    if(action.type==="CHANGE_FILTER_OPTION"){
        let temp = {...state};
        temp[action.payload] =  !temp[action.payload];
        return {...temp};
    }

    return state;
}


export default combineReducers({
    appNames: appnamesReducer,
    reports: reportsReducer,
    filterOptions: filterReducer
})