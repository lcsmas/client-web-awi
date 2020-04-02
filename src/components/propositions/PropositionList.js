import React from 'react';
import { connect } from 'react-redux';
import { getPropositionsList, getPropositionsFetchState } from '../../redux/selectors/selectors'
import Proposition from "../propositions/Proposition";
import './PropositionsList.css'
import { fetchPropositions } from "redux/slices/propositions";

class PropositionList extends React.Component {
    render() {
        const propositionsList = this.props.propositionsList;
        return (
            <>
                <div className='propositions-list'>
                    {propositionsList && propositionsList.map(propId => <Proposition key={propId} id={propId} />)}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    propositionsList: getPropositionsList(state),

})
export default connect(mapStateToProps, { fetchPropositions })(PropositionList)
