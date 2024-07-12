import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();

  const SERVER_URL = "https://api.fesp.shop";

  const [listData, setListData] = useState([]);
  const [search, setsearch] = useState("");

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/posts?keyword=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("검색 중 문제가 발생했습니다.");
      }

      const result = await response.json();
      setListData(result.item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts`);
        if (!response.ok) {
          throw new Error("네트 워크 오류");
        }
        const data = await response.json();
        console.log("받아온데이터", data);
        setListData(data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getList();
  }, []);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <form onSubmit={handleSearchSubmit}>
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form>

        <button
          type="button"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => navigate("/info/new")}
        >
          글작성
        </button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {/*
              <tr>
                <td colSpan="6" className="py-20 text-center">로딩중...</td>
              </tr>
            */}

            {/* 에러 메세지 출력 */}
            {/*
              <tr>
                <td colSpan="6" className="py-20 text-center">에러 메세지</td>
              </tr>
            */}

            {/* 본문 출력 */}
            {listData.map((item) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                key={item._id}
              >
                <td className="p-2 text-center">{item._id}</td>
                <td
                  className="p-2 truncate indent-4 cursor-pointer"
                  onClick={() => navigate(`/info/${item._id}`)}
                >
                  {item.title}
                </td>
                <td className="p-2 text-center truncate">{item.user.name}</td>
                <td className="p-2 text-center hidden sm:table-cell">
                  {item.views}
                </td>
                <td className="p-2 text-center hidden sm:table-cell">2</td>
                <td className="p-2 truncate text-center hidden sm:table-cell">
                  {item.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="text-bold text-blue-700">
              <Link to="/info?page=1">1</Link>
            </li>
            <li>
              <Link to="/info?page=2">2</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default List;
