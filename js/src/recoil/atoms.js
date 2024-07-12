
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'authState', 
  storage: sessionStorage, 
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
