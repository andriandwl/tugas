// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function PostEditPage({ allPost, isLoading }) {
  // console.log(allPost);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const onSubmitPostAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    console.log(image);

    addPost(formData);
    navigate("/");
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
  async function addPost(formData) {
    axios
      .post(`https://jcc.brandingyou.id/api/post`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        console.log(res);
      });

    // const responseJson = await response.json();
    // console.log(responseJson);

    // if (responseJson.meta.status !== "success") {
    //   return {
    //     meta: true,
    //     data: null,
    //   };
    // }

    // return {
    //   meta: false,
    //   data: responseJson.data,
    // };
  }
  return isLoading ? (
    <p>Memuatttt....</p>
  ) : (
    <div className="container mt-5">
      <form onSubmit={onSubmitPostAdd} id="form">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={allPost.title}
            onChange={(e) => setTitle(e.target.value)}
            id="input-title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={allPost.content}
            onChange={(e) => setContent(e.target.value)}
            id="input-content"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            id="image_uploads"
            className="form-control"
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

export default PostEditPage;
