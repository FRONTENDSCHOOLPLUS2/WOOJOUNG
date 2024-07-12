import CommentNew from "@pages/community/CommentNew";
import CommentItem from "./CommentItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SERVER_URL = "https://api.fesp.shop";
function CommentList() {
  const { _id } = useParams();
  const [reply, setReply] = useState([]);

  const replyItems = reply?.map((item, index) => {
    return (
      <CommentItem
        key={item._id}
        name={item.user.name}
        content={item.content}
        time={item.createdAt}
        userInfo={item.user}
        reply={reply[index]._id}
        alldata={item}
      />
    );
  });

  console.log("reply", reply._id);

  useEffect(() => {
    const getAllCommnetList = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts/${_id}/replies`);

        if (!response.ok) {
          throw new Error("네트 워크 오류");
        }
        const data = await response.json();
        setReply(data?.item);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCommnetList();
  }, []);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {replyItems.length}개</h4>

      {/* 댓글 */}

      {/* 댓글 */}
      {replyItems}

      {/* 댓글 입력 */}
      <CommentNew />
    </section>
  );
}

export default CommentList;
