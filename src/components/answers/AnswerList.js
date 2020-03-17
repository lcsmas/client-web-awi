import React from 'react'
import Answer from './Answer'
import { getAnswers } from '../../redux/selectors/selectors'
import { connect } from 'react-redux'
import './Answer-list.css'

function AnswerList({answers}) {
    return (
        <div className='Answer-list'>
            {answers ? answers.map(answer => {
                return (<Answer key={`answer-${answer.id}`} 
                content={answer.content}
                userId={answer.userId}
                isAnon={answer.isAnon} />);
            })
            : 'Il n\'y a pas de réponses pour l\'instant !'}
        </div>
    )
}

const mapStateToProps = state => {
    const answers = getAnswers(state)
    return {answers}
}

export default connect(mapStateToProps)(AnswerList);