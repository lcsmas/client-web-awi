import React, { Component } from "react";
import Button from "../button/Button";
import {
  fetchPropositions
} from "redux/slices/propositions";
import { fetchAnswers, postAnswer } from "redux/slices/answers";
import { connect } from "react-redux";
import {
  getToken,
  getSelectedProposition,
  getAnswersFetchState
} from "redux/selectors/selectors";
import TextArea from "../input/TextArea";
import "./AddAnswer.css";

class AddAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      isAnon: false
    };
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }
  updateContent = e => {
    this.setState({ content: e.target.value });
  };
  updateCheckbox = e => {
    this.setState({ isAnon: e.target.checked });
  };
  handleAddAnswer = e => {
    e.preventDefault();
    const data = {
      contentAnswer: this.state.content,
      isAnonymous: this.state.isAnon,
      idProp: this.props.selectedProposition,
      tagsAnswer: ""
    };
    const token = this.props.token;
    this.props.postAnswer(data, token).then(this.props.fetchPropositions).then(this.props.fetchAnswers);
  };
  reset() {
    this.setState({
      content: "",
      isAnon: false
    });
  }
  render() {
    return (
      <div className="AddAnswer">
        <h2> Votre réponse </h2>
        <TextArea
          rows="5"
          cols="92"
          onChange={this.updateContent}
          value={this.state.content}
        />
        <div className="AddAnswer-checkbox">
          <input
            name="isAnon"
            type="checkbox"
            checked={this.state.isAnon}
            onChange={this.updateCheckbox}
          />
          <label htmlFor="isAnon"> Publier anonymement </label>
        </div>
        <div className="AddAnswer-button">
          <Button.BlueSquaredButton
            text="Publier votre réponse"
            onClick={this.handleAddAnswer}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const token = getToken(state);
    const selectedProposition = getSelectedProposition(state);
    const postedAnswerId = getAnswersFetchState(state).postResult;
    return { token, selectedProposition, postedAnswerId };
  },
  { postAnswer, fetchAnswers, fetchPropositions }
)(AddAnswer);
