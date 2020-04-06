import React from "react";
import { connect } from "react-redux";
import { getUserById, getAnswerById, isCurrentUserAdmin, getCurrentUserId } from "../../redux/selectors/selectors";
import { Link } from "react-router-dom";
import "./Answer.css";
import Like from '../like/Like'
import Delete from '../delete/Delete'

function Answer(props) {
  const user = props.owner;
  const answer = props.answer;
  return (
    <div className="Answer">
      {answer.content && (
        <div className="Answer-subheader">
          <p style={{ marginBottom: 0 }}>
            {" "}
            {answer.isAnon ? (
              <a>@anon</a>
            ) : (
                <Link className="user-info" to={`/users/${user.id}`}>
                  @{user.name}
                </Link>
              )}
          </p>
        </div>
      )}
      <p className="Answer-content">{answer.content}</p>
      <div className="actions">
        <Like id={props.id} type='answer' />
        {(props.currentUser && props.currentUser === answer.owner || props.isAdmin) && <Delete id={props.id} type='answer' />}
      </div>
    </div>
  );
}

const mapStateToStore = (state, ownProps) => {
  const answer = getAnswerById(state, ownProps.id);
  const owner = getUserById(state, answer.owner);
  const currentUser = getCurrentUserId(state)
  const isAdmin = isCurrentUserAdmin(state)
  return { answer, owner, currentUser, isAdmin };
};
export default connect(mapStateToStore)(Answer);
