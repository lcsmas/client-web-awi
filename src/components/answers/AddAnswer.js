import React, { Component } from 'react'
import Button from '../button/Button';
import { postSlice, fetchSlice } from '../../redux/actions/sliceActions'
import { updatePropositionAnswers } from '../../redux/actions/propositionsActions'
import { ENTITIES } from '../../redux/schema'
import { connect } from 'react-redux'
import { getCurrentUserId, getSelectedProposition } from '../../redux/selectors/selectors'
import TextArea from '../input/TextArea';
import './AddAnswer.css'

class AddAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            isAnon: false
        }
    }
    updateContent = content => {
        this.setState({ content: content })
    }
    updateCheckbox = checked => {
        this.setState({ isAnon: checked });
    }
    handleAddAnswer = () => {
        const slice = ENTITIES.ANSWERS;
        const data = { content: this.state.content, owner: this.props.currentUserId, isAnon: this.state.isAnon }
        this.props.postSlice(slice, data)
            .then(res => {
                const proposition = this.props.selectedProposition;
                const answer = res.payload.res;
                this.props.updatePropositionAnswers({ id: proposition, answer })
                    .then(() => {
                        this.props.fetchSlice(slice);
                        this.props.fetchSlice(ENTITIES.PROPOSITIONS)
                    });
            })
        this.setState({content: "", isAnon: false })
    }
    render() {
        return (
            <div className="AddAnswer">
                <h2> Votre réponse </h2>
                <TextArea rows="5" cols="92" onChange={e => this.updateContent(e.target.value)} value={this.state.content} />
                <div className="AddAnswer-checkbox">
                    <input name='isAnon' type='checkbox' checked={this.state.isAnon}
                        onChange={e => this.updateCheckbox(e.target.checked)} />
                    <label htmlFor='isAnon'> Publier anonymement </label>
                </div>
                <div className="AddAnswer-button">
                    <Button.BlueSquaredButton text='Publier votre réponse'
                        onClick={() => this.handleAddAnswer()}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        const currentUserId = getCurrentUserId(state);
        const selectedProposition = getSelectedProposition(state);
        return { currentUserId, selectedProposition };
    },
    { postSlice, fetchSlice, updatePropositionAnswers }
)(AddAnswer);