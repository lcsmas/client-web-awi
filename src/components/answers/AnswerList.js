import React from 'react'
import Answer from './Answer'
import { getAnswersOfProposition, getSelectedProposition, getCurrentUserId } from '../../redux/selectors/selectors'
import { connect } from 'react-redux'
import './Answer-list.css'

function AnswerList({answers, ...props}) {
    return (
        <div className='Answer-list'>
            {answers.length === 0 && <div className="no-answer"> Il n'y a pas de réponses pour le moment, soyez le premier à répondre ! </div> }
            {answers && answers.map(answer => {
                return (<Answer key={answer} id={answer}/>);
            })}
            {!props.isConnected && <div className='connection-alert'> Vous devez être connecté pour écrire une réponse </div>}

        </div>
    )
}

const mapStateToProps = state => {
    const answers = getAnswersOfProposition(state, getSelectedProposition(state));
    const isConnected = getCurrentUserId(state)
    return {answers, isConnected}
}

export default connect(mapStateToProps)(AnswerList);