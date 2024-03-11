import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { postComment, fetchComments, CommentData } from "../../api/CommentApi";

interface CommentBoxProps {
  post: any;
  user: any;
  allUsers: any;
}

const CommentBox: React.FC<CommentBoxProps> = ({ post, user, allUsers }) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const fetchCommentsData = async () => {
    try {
      const commentsData = await fetchComments();
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentData: CommentData = {
        id: 0,
        comment: commentText,
        date: new Date(),
        userId: user.id,
        postId: post.id,
      };

      await postComment(commentData, localStorage.getItem("authToken"));
      console.log("Comment submitted:", commentText);
      setCommentText("");
      fetchCommentsData();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Add your comment..."
          style={{
            flexGrow: 1,
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "8px",
            marginRight: "10px",
          }}
          className="w-full"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {t("Comment")}
        </button>
      </div>
      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          paddingRight: "20px",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        }}
      >
        {comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => (
            <div
              key={comment.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                fontFamily: "sans-serif",
              }}
            >
              <div style={{ marginBottom: "5px", textAlign: "left" }}>
                <p style={{ fontWeight: "bold", marginBottom: "3px" }}>
                  {allUsers.find((u: any) => u.id === comment.userId)?.name ||
                    "Unknown User"}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {timeFormatter.format(new Date(comment.date))}
                  {", "}
                  {dateFormatter.format(new Date(comment.date))}
                </p>
              </div>
              <p style={{ marginTop: "5px", flexGrow: 1, textAlign: "left" }}>
                {comment.comment}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentBox;
