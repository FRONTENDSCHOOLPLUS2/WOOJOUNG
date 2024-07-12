import Button from "@components/Button";

import { authState } from "@recoil/atoms";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SERVER_URL = "https://api.fesp.shop";

const CommentItem = ({ name, content, time, reply, alldata }) => {
  const recoilLogin = useRecoilValue(authState);
  const token = recoilLogin.user?.token?.accessToken;
  const { _id } = useParams();
  const replyIdparse = reply + "";

  console.log(alldata);

  console.log("ss", replyIdparse);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/posts/${_id}/replies/${replyIdparse}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 토큰 추가
          },
        }
      );

      if (!response.ok) {
        throw new Error("네트워크 반응 이상함");
      }

      const result = await response.json();
      console.log("Success:", result);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
          alt="무지 프로필 이미지"
        />
        <Link to="" className="text-orange-400">
          {name}
        </Link>
        <time className="ml-auto text-gray-500" dateTime="2024.07.07 12:34:56">
          {time}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        <Button bgColor="red" size="sm" onClick={handleDeletePost}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;
