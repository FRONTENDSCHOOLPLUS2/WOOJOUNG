import { authState } from "@recoil/atoms";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const SERVER_URL = "https://api.fesp.shop";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loggined = useRecoilValue(authState);

  const [, setAuth] = useRecoilState(authState); // recoil 저장
  const navigate = useNavigate();

  const handleId = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch(`${SERVER_URL}/users/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setAuth({ isLoggedIn: false, user: null });
        throw new Error("네트워크 반응 이상함");
      }

      const result = await response.json();
      console.log("Success:", result);
      setAuth({
        isLoggedIn: true,
        user: result.item,
        token: result.item.token.accessToken,
      });

      alert(`환영합니다, ${result.item.name}`);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loggined.isLoggedIn) {
    return (
      <div className="text-center justify-center items-center mt-10 p-60">
        이미 로그인 됐습니다.
        <br />
        <Link to="/" className="">
          home 으로 돌아가기
        </Link>
      </div>
    );
  }
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              onChange={handleId}
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={email}
              name="email"
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={password}
              onChange={handlePassword}
              name="password"
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              로그인
            </button>
            <a
              href="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
