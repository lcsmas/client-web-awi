import React from 'react'
import { connect } from 'react-redux'
import AddAnswer from '../answers/AddAnswer'
import AnswersList from '../answers/AnswerList'
import { getCurrentUserId } from '../../redux/selectors/selectors'
import './AnswersView.css'

function AnswersView(props) {
    return (
        <div className='AnswersView'>
            <AnswersList />
            {props.currentUserId && <AddAnswer />}
        </div>
    )
}

const mapStateToProps = state => {
    const currentUserId = getCurrentUserId(state)
    return { currentUserId }
}

export default connect(mapStateToProps)(AnswersView)