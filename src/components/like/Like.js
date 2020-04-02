import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Like.css'
import { getAnswerNbLikes, getPropositionNbLikes, getCurrentUserId, getAnswerById, getPropositionById } from "redux/selectors/selectors";
import { likeAnswer, dislikeAnswer, fetchAnswers } from "redux/slices/answers";
import { likeProposition, dislikeProposition, fetchPropositions } from 'redux/slices/propositions'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

class Like extends Component {
    constructor(props) {
        super(props)
    }
    handleLike = () => {
        if (this.props.currentUserId) {
            this.props.like().then(() => {
                this.props.fetch()
            })
        }
    }
    handleDislike = () => {
        if (this.props.currentUserId) {
            this.props.dislike().then(() => {
                this.props.fetch()
            })
        }
    }
    render() {
        return (
            <div className='like'>
                {!this.props.isAlreadyLiked && <FaRegHeart onClick={this.handleLike} />}
                {this.props.isAlreadyLiked && <FaHeart onClick={this.handleDislike} />}
                <span className='like-number'>{this.props.nbLike}</span>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.type === 'answer') {
        return {
            like: () => dispatch(likeAnswer(ownProps.id)),
            dislike: () => dispatch(dislikeAnswer(ownProps.id)),
            fetch: () => dispatch(fetchAnswers())
        }
    } else if (ownProps.type === 'proposition') {
        return {
            like: () => dispatch(likeProposition(ownProps.id)),
            dislike: () => dispatch(dislikeProposition(ownProps.id)),
            fetch: () => dispatch(fetchPropositions())
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === 'answer') {
        const nbLike = getAnswerNbLikes(state, ownProps.id)
        const currentUserId = getCurrentUserId(state)
        const isAlreadyLiked = getAnswerById(state, ownProps.id).idLikes ?
            getAnswerById(state, ownProps.id).idLikes.includes(currentUserId) : false
        return { nbLike, isAlreadyLiked, currentUserId }
    } else if (ownProps.type === 'proposition') {
        const nbLike = getPropositionNbLikes(state, ownProps.id)
        const currentUserId = getCurrentUserId(state)
        const isAlreadyLiked = getPropositionById(state, ownProps.id).idLikes ?
            getPropositionById(state, ownProps.id).idLikes.includes(currentUserId) : false
        return { nbLike, isAlreadyLiked, currentUserId }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Like)
