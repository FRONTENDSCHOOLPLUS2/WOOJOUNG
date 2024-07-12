import { authState } from "@recoil/atoms";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SERVER_URL = "https://api.fesp.shop";

function Edit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const recoilLogin = useRecoilValue(authState);
  const token = recoilLogin.user?.token?.accessToken;
  const postId = params?._id;
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 정보를 불러오기
    const fetchPost = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 토큰 추가
          },
        });

        if (!response.ok) {
          throw new Error("게시글을 불러오는 중 문제가 발생했습니다.");
        }

        const post = await response.json();
        console.log("x", post);
        setTitle(post.item.title);
        setContent(post.item.content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title, content };

    try {
      const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("게시글을 수정하는 중 문제가 발생했습니다.");
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate("/free");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            history.back();
          }}
        >
          <div className="my-4">
            <label
              className="block text-lg content-center"
              htmlFor="title"
            ></label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={title}
              onChange={handleTitle}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={content}
              onChange={handleContent}
            >
              {content}
            </textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handleSubmit}
            >
              수정
            </button>
            <button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => history.back()}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;
