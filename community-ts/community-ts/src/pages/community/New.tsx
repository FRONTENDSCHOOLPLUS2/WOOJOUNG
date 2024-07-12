import { authState } from "@recoil/atoms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SERVER_URL = "https://api.fesp.shop";

function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const recoilLogin = useRecoilValue(authState);
  const [name] = useState(recoilLogin.user?.name);
  const token = recoilLogin.user?.token?.accessToken;

  const navigate = useNavigate();
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title, content, name };
    console.log(data);

    try {
      const response = await fetch(`${SERVER_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
        method: "POST",
        body: JSON.stringify(data),
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

  if (!recoilLogin) {
    return <div>로그인 먼저 ㄱㄱ</div>;
  }

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
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
              id="content"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              onChange={handleContent}
              value={content}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              등록
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

export default New;
