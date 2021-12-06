import React from 'react';
import {connect} from 'react-redux'
import './Table.css'
import labels from '../../constants/labels';


const Table = (props) => {

    const renderFieldValue = (index, fieldValue) => {
        if(props.filterOptions[labels[index]]){
            return (
                <td className="row">{fieldValue}</td>
            )
        }
    }  

    const renderFieldLabels = () => {
        return labels.map((label) => {
            if(props.filterOptions[label]){
                return (
                    <th className="row">{label}</th>
                )
            }
        })
    }

    const renderFields = () => {
        return props.reports.map((report) => {
            return (
            <tr>
                {renderFieldValue(0,report.date.split('T')[0])}
                {renderFieldValue(1,props.appNames[report.app_id])}
                {renderFieldValue(2,report.requests)}
                {renderFieldValue(3,report.responses)}
                {renderFieldValue(4,report.impressions)}
                {renderFieldValue(5,report.clicks)}
                {renderFieldValue(6,'$ '+ Math.floor(report.revenue * 100) / 100)}
                {renderFieldValue(7, Math.floor(((report.requests/report.responses)*100)*100)/100 + '%')}
                {renderFieldValue(8,Math.floor(((report.clicks/report.impressions)*100)*100)/100 + '%')} 
            </tr>
            )
        })
    }

    const renderTable = () => {
        if(props.reports.length > 0){
            return (
                <table>
                     <tr>
                         {renderFieldLabels()}
                     </tr>
                     {renderFields()}
                </table>
            )
        }
        else{
            return (
                <h3>No reports found for the particular parameters</h3>
            )
        }
    }


    return (
        <div className="table-container">
            {renderTable()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        appNames: state.appNames,
        reports: state.reports,
        filterOptions: state.filterOptions
    }
}

export default connect(mapStateToProps)(Table);