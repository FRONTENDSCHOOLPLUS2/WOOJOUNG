import { useNavigate, useParams } from "react-router-dom";

import CommentList from "./CommentList";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@recoil/atoms";

const SERVER_URL = "https://api.fesp.shop";

function Detail() {
  const [detail, setDetail] = useState([]);
  const params = useParams();
  console.log(params);
  const recoilLogin = useRecoilValue(authState);
  const token = recoilLogin.user?.token?.accessToken;
  const postId = params?._id;
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailList = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts/${params._id}`);
        if (!response.ok) {
          throw new Error("네트 워크 오류");
        }
        const data = await response.json();
        setDetail(data);
        console.log(detail);
        console.log("받아온데이터", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDetailList();
  }, []);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      });

      if (!response.ok) {
        throw new Error("네트워크 반응 이상함");
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate("/free");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 :{detail.item?.title} </div>
        <div className="text-right text-gray-400">
          작성자 : {detail.item?.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {detail.item?.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => history.back()}
          >
            목록
          </button>
          {recoilLogin?.user?._id === detail?.item?.user._id ? (
            <>
              <button
                type="button"
                className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={() => navigate(`/info/${params._id}/edit`)}
              >
                수정
              </button>
              <button
                type="button"
                className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                onClick={handleDeletePost}
              >
                삭제
              </button>
            </>
          ) : null}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList />
    </main>
  );
}

export default Detail;
