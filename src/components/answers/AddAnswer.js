import React, { Component } from 'react'
import Input from '../input/Input'
import Button from '../button/Button';
import { addAnswer } from '../../redux/actions/action'
import { connect } from 'react-redux'
import { getCurrentUserId } from '../../redux/selectors/selectors'
import TextArea from '../input/TextArea';
import './AddAnswer.css'

class AddAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
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
        this.props.addAnswer(
            this.state.content,
            this.props.currentUserId,
            this.state.isAnon)
        this.setState({ content: '', isAnon: false })
    }
    render() {
        return (
            <div className="AddAnswer">
                <h2> Votre réponse </h2>
                <TextArea rows="10" cols="92" onChange={e => this.updateContent(e.target.value)} value={this.state.content} />
                <div className="AddAnswer-checkbox">
                    <input name='isAnon' type='checkbox' checked={this.state.isAnon}
                        onChange={e => this.updateCheckbox(e.target.checked)} />
                    <label for='isAnon'> Publier anonymement </label>
                </div>
                <div className="AddAnswer-button">
                    <Button.BlueSquaredButton text='Publier votre réponse'
                        onClick={this.handleAddAnswer}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        const currentUserId = getCurrentUserId(state);
        return { currentUserId };
    },
    { addAnswer }
)(AddAnswer);