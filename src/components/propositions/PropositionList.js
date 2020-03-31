import React from 'react';
import { connect } from 'react-redux';
import { getPropositionsList, getPropositionsFetchState} from '../../redux/selectors/selectors'
import Button from '../button/Button'
import Proposition from "../propositions/Proposition";
import './PropositionsList.css'
import { fetchPropositions } from "redux/slices/propositions";

class PropositionList extends React.Component {
    handleRefresh = () => {
        this.props.fetchPropositions()
    }
    render() {
        const { error } = this.props.fetchState || false;
        const propositionsList = this.props.propositionsList;
        return (
            <>
                <Button.BlueSquaredButton onClick={this.handleRefresh} text='Refresh' />
                <div className='propositions-list'>
                    {error && <p>{error}</p>}
                    {propositionsList && propositionsList.map(propId => <Proposition key={propId} id={propId} />)}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    propositionsList: getPropositionsList(state),
    fetchState: getPropositionsFetchState(state),
})
export default connect(mapStateToProps, { fetchPropositions })(PropositionList)
