import React from 'react'
import { connect } from 'react-redux'
import AddAnswer from '../answers/AddAnswer'
import AnswersList from '../answers/AnswerList'
import { getToken } from '../../redux/selectors/selectors'
import './AnswersView.css'

function AnswersView(props) {
    return (
        <div className='AnswersView'>
            <AnswersList />
            {props.token && <AddAnswer />}
        </div>
    )
}

const mapStateToProps = state => {
    const token = getToken(state)
    return { token }
}

export default connect(mapStateToProps)(AnswersView)