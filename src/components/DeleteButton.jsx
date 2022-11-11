import React from "react";
import { useNavigate } from "react-router-dom";

function DeleteButton({ id, onDelete }) {
  const navigate = useNavigate();
  return (
    <button
      style={{
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={() => {
        onDelete(id);
        navigate("/");
      }}
    >
      <i className="fas fa-play mr-2"></i>Delete
    </button>
  );
}

export default DeleteButton;
