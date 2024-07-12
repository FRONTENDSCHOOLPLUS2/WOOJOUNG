import Button from "@components/Button";
import { authState } from "@recoil/atoms";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SERVER_URL = "https://api.fesp.shop";

function CommentNew() {
  const [newReply, setNewReply] = useState<string>("");
  const recoilLogin = useRecoilValue(authState);
  const token = recoilLogin.user?.token?.accessToken;
  const { _id } = useParams();

  const handleRep = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReply(e.target.value);
  };

  const postNewReply = async (e: FormEvent) => {
    e.preventDefault();
    const data = { content: newReply };
    try {
      const response = await fetch(`${SERVER_URL}/posts/${_id}/replies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("네트워크 반응 이상함");
      }
      const result = await response.json();
      console.log("Success:", result);
      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={postNewReply}>
        <div className="mb-4">
          <textarea
            rows={3}
            cols={40}
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            onChange={handleRep}
          ></textarea>
          {/* 에러 메세지 출력 */}
          {/*
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p>
          */}
        </div>
        <Button type="submit" size="sm">
          댓글 등록
        </Button>
      </form>
    </div>
  );
}

export default CommentNew;
