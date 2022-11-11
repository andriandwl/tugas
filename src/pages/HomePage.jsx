import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [posts, setPost] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const [edit, setEdit] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const getData = () => {
    axios
      .get(`https://jcc.brandingyou.id/api/post`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        setPost(res.data.data);
      });
  };
  React.useEffect(() => {
    setIsLoading(false);
    getData();
  }, []);
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  const addData = () => {
    const formDataEdit = new FormData();
    formDataEdit.append("image", image);
    formDataEdit.append("title", title);
    formDataEdit.append("content", content);
    if (isEdit === true) {
      axios
        .post(`https://jcc.brandingyou.id/api/post/${edit}`, formDataEdit, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then(function (response) {
          setImage(image.name === "");
          setContent("");
          setTitle("");
          getData();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(`https://jcc.brandingyou.id/api/post`, formDataEdit, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then(function (response) {
          getData();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getData();
  };

  const handleRemove = (id) => {
    axios
      .delete(`https://jcc.brandingyou.id/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then(function (response) {
        getData();
      });
  };

  const handleEdit = async (id) => {
    setIsEdit(true);
    axios
      .get(`https://jcc.brandingyou.id/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        setEdit(id);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
      });
    getData();
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="/" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addData();
          }}
        >
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
            Post
          </button>
        </form>
        {isLoading ? (
          <div className="placeholder m-2">
            {posts.map((post) => {
              return (
                <article
                  className="placeholder postcard light blue"
                  key={post.id}
                >
                  <a className="placeholder postcard__img_link" href="/">
                    <img
                      src={post.image}
                      className="placeholder postcard__img"
                      alt=""
                    />
                  </a>
                  <div className="placeholder postcard__text t-dark">
                    <h1 className="placeholder postcard__title blue">
                      <Link href="/">{post.title}</Link>
                    </h1>
                    <div className="placeholder postcard__subtitle small">
                      <time dateTime="2020-05-25 12:00:00">
                        <i className="placeholder fas fa-calendar-alt mr-2"></i>
                        {post.created_at}
                      </time>
                    </div>
                    <div className="placeholder postcard__bar"></div>
                    <div className="placeholder postcard__preview-txt">
                      {post.content}
                    </div>
                    <ul className="placeholder postcard__tagbox d-flex justify-content-between">
                      <li className="placeholder tag__item">
                        <i className="placeholder fas fa-tag mr-2"></i>
                        {post.author}
                      </li>
                      <div>
                        <li className="placeholder tag__item play yellow">
                          <button
                            onClick={() => handleEdit(post.id)}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <i className="placeholder fas fa-play mr-2"></i>Edit
                          </button>
                        </li>
                        <li className="placeholder tag__item play yellow">
                          <button
                            onClick={() => handleRemove(post.id)}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <i className="placeholder fas fa-play mr-2"></i>
                            Delete
                          </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="m-2">
            {posts.map((post) => {
              return (
                <article className="postcard light blue" key={post.id}>
                  <a className="postcard__img_link" href="/">
                    <img src={post.image} className="postcard__img" alt="" />
                  </a>
                  <div className="postcard__text t-dark">
                    <h1 className="postcard__title blue">
                      <Link href="/">{post.title}</Link>
                    </h1>
                    <div className="postcard__subtitle small">
                      <time dateTime="2020-05-25 12:00:00">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {post.created_at}
                      </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{post.content}</div>
                    <ul className="postcard__tagbox d-flex justify-content-between">
                      <li className="tag__item">
                        <i className="fas fa-tag mr-2"></i>
                        {post.author}
                      </li>
                      <div>
                        <li className="tag__item play yellow">
                          <button
                            onClick={() => handleEdit(post.id)}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <i className="fas fa-play mr-2"></i>Edit
                          </button>
                        </li>
                        <li className="tag__item play yellow">
                          <button
                            onClick={() => handleRemove(post.id)}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <i className="fas fa-play mr-2"></i>Delete
                          </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
