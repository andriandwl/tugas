// import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import MenuDetail from "../components/MenuDetail";
import PostEditPage from "../pages/PostEditPage";
import { fetchWithToken } from "../utils/api";

function EditPage() {
  const { id } = useParams();
  const [allPost, setAllPost] = useState({});
  const [isLoading, setLoading] = useState(true);

  async function getPst(id) {
    const response = await fetchWithToken(
      `https://jcc.brandingyou.id/api/post/${id}`
    );
    const responseJson = await response.json();
    if (responseJson.meta.status !== "success") {
      return { meta: true, data: null };
    }

    return { meta: false, data: responseJson.data };
  }
  getPst(id).then((data) => {
    setAllPost(data.data);
    setLoading(false);
  });
  return (
    <div>
      <PostEditPage allPost={allPost} id={id} isLoading={isLoading} />
    </div>
  );
}

export default EditPage;
