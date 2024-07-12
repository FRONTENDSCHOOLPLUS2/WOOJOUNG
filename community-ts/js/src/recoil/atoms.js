
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'authState', // 이 키는 세션 스토리지에 저장될 때 사용됩니다.
  storage: sessionStorage, // 세션 스토리지 사용, 로컬 스토리지를 사용하려면 localStorage로 변경
});

export const authState = atom({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
    token: null,
  }, // 기본 상태 
  effects_UNSTABLE: [persistAtom],
});
