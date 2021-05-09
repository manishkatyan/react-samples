import React, { useState } from "react";

export default function Like(props) {
  const [like, setLike] = useState({
    count: parseInt(props.like),
    clicked: false,
  });
  const [dislike, setDislike] = useState({
    count: parseInt(props.dislike),
    clicked: false,
  });

  const handleLike = () => {
    const newLike = { ...like };
    newLike.clicked = !newLike.clicked;
    newLike.count += newLike.clicked ? 1 : -1;
    setLike(newLike);

    if (dislike.clicked) {
      const newDislike = { ...dislike };
      newDislike.count -= 1;
      newDislike.clicked = false;
      setDislike(newDislike);
    }
  };

  const handleDislike = () => {
    const newDislike = { ...dislike };
    newDislike.clicked = !newDislike.clicked;
    newDislike.count += newDislike.clicked ? 1 : -1;
    setDislike(newDislike);

    if (like.clicked) {
      const newLike = { ...like };
      newLike.count -= 1;
      newLike.clicked = false;
      setLike(newLike);
    }
  };

  return (
    <>
      <div>
        <button
          style={like.clicked ? activeClass : inactiveClass}
          onClick={handleLike}
        >
          Like | <span>{like.count}</span>
        </button>
        <button
          style={dislike.clicked ? activeClass : inactiveClass}
          onClick={handleDislike}
        >
          Dislike | <span>{dislike.count}</span>
        </button>
      </div>
    </>
  );
}

const activeClass = {
  padding: "10px 20px",
  margin: "20px",
  border: "none",
  borderRadius: "4px",
  background: "#1890ff",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
  transition: ".3s background",
};

const inactiveClass = {
  padding: "10px 20px",
  margin: "20px",
  border: "none",
  borderRadius: "4px",
  background: "#eeeeee",
  color: "#999999",
  fontSize: "14px",
  cursor: "pointer",
  transition: ".3s background",
};
