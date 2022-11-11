// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

function PostInput() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = useState();
  // const navigate = useNavigate();

  const onSubmitPostAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    console.log(image);

    axios
      .post(`https://jcc.brandingyou.id/api/post`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  // async function fetchWithToken(url, options = {}) {
  //   return fetch(url, {
  //     ...options,
  //     headers: {
  //       ...options.headers,
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //   });
  // }
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  return (
    <div>
      <form onSubmit={onSubmitPostAdd}>
        <div className="mb-1">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="input-title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="input-content"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostInput;
