import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import SubscribeForm from '../components/subscribe/SubscribeForm';
import Navbar from '../components/navbar/Navbar';
import { fetchPropositions } from 'redux/slices/propositions'
import { fetchUsers } from 'redux/slices/users'
import { fetchTags } from 'redux/slices/tags'
import { fetchAnswers } from 'redux/slices/answers'
import { connect } from 'react-redux';
import PropositionsAnswersSplitContainer from "./PropositionsAnswersSplitContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPropositions();
    this.props.fetchUsers();
    this.props.fetchTags();
    this.props.fetchAnswers();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/subscribe'>
            <SubscribeForm />
          </Route>
          <Route path='/'>
          <PropositionsAnswersSplitContainer/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default connect(null, { fetchPropositions, fetchUsers, fetchTags, fetchAnswers })(App)
