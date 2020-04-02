import React from 'react'
import PropositionList from './PropositionList'
import AddProposition from "./AddProposition";
import { connect } from 'react-redux'
import { getToken } from "redux/selectors/selectors";
import './PropositionView.css'


function PropositionView(props) {
    return (
        <div className="proposition-view">
            <PropositionList />
            {!props.isConnected && <div className='connection-alert'> Vous devez être connecté pour écrire une proposition </div>}
            {props.isConnected && <AddProposition />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isConnected: getToken(state)
})

export default connect(mapStateToProps)(PropositionView)

