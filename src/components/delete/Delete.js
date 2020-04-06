import Button from '../button/Button'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Delete.css'
import { deleteAnswer } from "redux/slices/answers";
import { deleteProposition } from "redux/slices/propositions";
import { fetchAnswers } from 'redux/slices/answers'
import { fetchPropositions } from 'redux/slices/propositions'

class Delete extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        if(this.props.type === 'answer') {
            this.props.deleteAnswer(this.props.id)
            .then(_ => this.props.fetchPropositions())
            .then(_ => this.props.fetchAnswers())
            
        } else if(this.props.type === 'proposition') {
            this.props.deleteProposition(this.props.id)
            .then(_ => this.props.fetchPropositions())
            .then(_ => this.props.fetchAnswers())
        }
    }
   
    render() {
        return (
            <div className='delete'>
                <Button.RedButton text='Supprimer' onClick={this.handleClick}/>
            </div>
        )
    }
    
}

const mapDispatchToProps = {
    deleteAnswer, deleteProposition, fetchAnswers, fetchPropositions
}

export default connect(null, mapDispatchToProps)(Delete)
