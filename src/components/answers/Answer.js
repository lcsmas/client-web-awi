import React from 'react'
import { connect } from 'react-redux'
import { getUserById } from '../../redux/selectors/selectors'
import { Link } from 'react-router-dom'
import './Answer.css'

function Answer({ content, userId, isAnon, ...props }) {
    let user;
    if (!isAnon) {
        user = (<Link to={`/users/${userId}`}>
            {props.user.name}
        </Link>)
    } else {
        user = (<a>Anonyme</a>)
    }

    return (
        <div className='Answer'>
            <p className='Answer-content'> {content} </p>
            <div className='Answer-subheader'>
                <p>Réponse de <span className="user-info">{user}</span></p>
            </div>
        </div>
    )
}

const mapStateToStore = (state, ownProps) => {
    const user = getUserById(state, ownProps.userId);
    return { user }
}
export default connect(mapStateToStore)(Answer)
