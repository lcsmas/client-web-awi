import React, { Component } from "react";
import Button from "../button/Button";
import {
  updatePropositionsAnswers,
  fetchPropositions
} from "redux/slices/propositions";
import { fetchAnswers, postAnswer } from "redux/slices/answers";
import { connect } from "react-redux";
import {
  getCurrentUserId,
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
      content: this.state.content,
      owner: this.props.currentUserId,
      isAnon: this.state.isAnon
    };
    this.props.postAnswer(data).then(res => {
      const proposition = this.props.selectedProposition;
      const answer = this.props.postedAnswerId;
      this.props
        .updatePropositionsAnswers({ id: proposition, answer })
        .then(() => {
          this.props.fetchAnswers();
          this.props.fetchPropositions();
        });
    });
    //this.reset();
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
    const currentUserId = getCurrentUserId(state);
    const selectedProposition = getSelectedProposition(state);
    const postedAnswerId = getAnswersFetchState(state).postResult;
    return { currentUserId, selectedProposition, postedAnswerId };
  },
  { postAnswer, fetchAnswers, updatePropositionsAnswers, fetchPropositions }
)(AddAnswer);
