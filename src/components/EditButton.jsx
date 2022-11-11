import React from "react";
import { useNavigate } from "react-router-dom";

function EditButton({ onEdit, id }) {
  const navigate = useNavigate();
  return (
    <button
      style={{
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={() => {
        onEdit(id);
        navigate("/");
      }}
    >
      <i class="fas fa-play mr-2"></i>Edit
    </button>
  );
}

export default EditButton;
