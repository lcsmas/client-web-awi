import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ManageReport.css'
import { fetchReportedPropositions } from "redux/slices/propositions";
import { fetchReportedAnswers } from "redux/slices/answers";
import { getReportedAnswers, getReportedPropositions, getToken } from 'redux/selectors/selectors'
import Proposition from '../propositions/Proposition'

class ManageReport extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchReportedAnswers(this.props.token);
    }
    render() {
        return (
            <div className='manage-report'>
                <div className='manage-report-header'>
                    <h2 className='manage-report-title'> Signalement</h2>
                </div>
                <div className='manage-report-body'>
                    <ul>
                        {this.props.reportedPropositionsIds &&
                            this.props.reportedPropositionsIds.map(prop => <li>
                                <Proposition id={prop.id} />
                            </li>)}
                    </ul>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const reportedPropositionsIds = getReportedPropositions(state);
    const reportedAnswersIds = getReportedAnswers(state);
    const token = getToken(state)
    // const reportedPropositions = reportedPropositionsIds.map(id => getPropositionById(id));
    // const reportedAnswers = reportedAnswersIds.map(id => getAnswerById(id));
    return { reportedPropositionsIds, reportedAnswersIds, token }
}

const mapDispatchToProps = {
    fetchReportedAnswers, fetchReportedPropositions
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageReport)
