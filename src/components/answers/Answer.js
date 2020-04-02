import React from "react";
import { connect } from "react-redux";
import { getUserById, getAnswerById, getAnswerNbLikes } from "../../redux/selectors/selectors";
import { Link } from "react-router-dom";
import "./Answer.css";

function Answer(props) {
  const user = props.owner;
  const answer = props.answer;
  const nbLikes = props.nbLikesAnswer

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
      <div className="Answer-likes">{nbLikes}</div>
    </div>
  );
}

const mapStateToStore = (state, ownProps) => {
  const answer = getAnswerById(state, ownProps.id);
  const owner = getUserById(state, answer.owner);
  const nbLikesAnswer = getAnswerNbLikes(state, ownProps.id)
  return { answer, owner, nbLikesAnswer };
};
export default connect(mapStateToStore)(Answer);
