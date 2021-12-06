import analytics from "../apis/analytics";


//action for getting the app names 
export const getAppNames = () => {
    return async (dispatch) => {

        //If the data is present in the cache load it from there
        if(localStorage.getItem('appInfoArray')!==null){
            dispatch({type:"GET_APP_NAMES", payload: JSON.parse(localStorage.getItem('appInfoArray'))});
        }

        else{
            const response = await analytics.get('/apps');
        
            let appInfoArray = response.data.data;
           
            localStorage.setItem('appInfoArray', JSON.stringify(appInfoArray));
           
            dispatch({type:"GET_APP_NAMES", payload: appInfoArray});
        }


    }
}




//action for getting the reports
export const getReports = (startDate, endDate) => {
     return async (dispatch) => {
        
        //If the data is present in the cache load it from there
        if(localStorage.getItem(startDate.toString()+endDate.toString())!==null){
            dispatch({type:"GET_REPORTS", payload: JSON.parse(localStorage.getItem(startDate.toString()+endDate.toString()))});
        }

        //Calling the network if no cache is available for a particular request
        else{ 
            const response = await analytics.get(`/report?startDate=${startDate}&endDate=${endDate}`);
            console.log(response);
            let reports = response.data.data ? response.data.data : [] ;
    
            localStorage.setItem(startDate.toString()+endDate.toString(), JSON.stringify(reports)); //storing the data for future purposes
    
            dispatch({type:"GET_REPORTS", payload: reports});
        }


    }
}

export const toggleFilterOption = (option) => {
    return {
        type: "CHANGE_FILTER_OPTION",
        payload: option
    }
}


