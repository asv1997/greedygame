import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'
import {getAppNames , getReports, toggleFilterOption} from './actions/index'
import { useEffect, useState } from 'react';
import labels from './constants/labels';

import Table from './components/Table/Table';

function App(props) {

  let [startDate, setStartDate] = useState('2021-05-01');
  let [endDate, setEndDate] = useState('2021-05-03');

  let [settings, toggleSettings] = useState(false);

  useEffect(() => {
    props.getAppNames();
    props.getReports(startDate,endDate);
  }, [])

  
  const renderFilterOptions = () => {

    
    const options =  labels.map((option) => {
      return (<div onClick={() => toggleFilterOption(option)} className={props.filterOptions[option] ? 'filter-option selected' : 'filter-option'}>
         {option}
     </div>)
    })

    if(settings){
      return (
        <div className="filter-container">
            {options}
        </div> 
      )
    }
  


}

const toggleFilterOption = (option) => {
  props.toggleFilterOption(option);
}

  const onDateChange = (type, event) => {
    if(type==="start"){
      setStartDate(event.target.value);
    }
    else{
      setEndDate(event.target.value);
    }
  } 

  const getReportsBtnClick = () => {
    props.getReports(startDate, endDate);
  }


  return (
    
    <div className="ui-container">
        
        <h3>Analytics</h3>
        
        <div className="options-container">
          <div className="date-options-container">
            <div className="date-option">
              <span>Start Time</span><input value={startDate} onChange={(event) => onDateChange("start",event)}  style={{marginLeft:"10px"}} type="date"></input>
            </div>
            <div  className="date-option">
              <span>End Time</span><input value={endDate} onChange={(event) => onDateChange("end",event)}  style={{marginLeft:"10px"}} type="date"></input>
            </div>
            <button onClick={() => {getReportsBtnClick()}}>Get Reports</button>
          </div>
          <div className="filter-button-container">
              <button onClick={() => {toggleSettings((currentState) => !currentState)}}>Settings</button>
          </div>
        </div> 

      
            {renderFilterOptions()}


        <div className="reports-container">
            <Table/>
        </div>
       
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filterOptions: state.filterOptions
  }
}



export default connect(mapStateToProps , {getReports, getAppNames, toggleFilterOption})(App);
