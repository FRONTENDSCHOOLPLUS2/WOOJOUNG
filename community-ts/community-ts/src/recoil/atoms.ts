// authState.ts
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "authState",
  storage: sessionStorage, // 세션 스토리지 사용
});

export const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    user: null,
    token: null,
    accessToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});
