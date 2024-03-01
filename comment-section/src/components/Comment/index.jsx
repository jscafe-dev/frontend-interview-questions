import { useState } from "react";
import styles from "./styles.module.css";

const CommentItem = (props) => {
  const { comment, addNewReply } = props;
  const [showReply, toggleReply] = useState(false);
  const [showAddReply, toggleAddReply] = useState(false);

  const addCommentUtil = (e) => {
    const newComment = e.target.value;
    addNewReply(comment.id, newComment);
    toggleAddReply(false);
    toggleReply(true);
  };
  const handleBlur = (e) => {
    addCommentUtil(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      addCommentUtil(e);
    }
  };
  return (
    <div className={styles.commentContainer}>
      <div className={styles.details}>
        <div>{comment.comment}</div>
        <div className={styles.controls}>
          {comment.subComments.length > 0 && (
            <span onClick={() => toggleReply(!showReply)}>View Reply</span>
          )}
          <span onClick={() => toggleAddReply(!showAddReply)}>Add Reply</span>
        </div>
      </div>
      {showReply && (
        <Comment commentData={comment.subComments} addNewReply={addNewReply} />
      )}
      {showAddReply && (
        <input
          className={styles.replyBox}
          type="text"
          autoFocus
          placeholder="Enter your savage reply!"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

const Comment = (props) => {
  const { commentData, addNewReply } = props;
  console.log(commentData);
  return (
    <>
      {commentData.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          addNewReply={addNewReply}
        />
      ))}
    </>
  );
};

export default Comment;
