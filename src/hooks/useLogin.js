// 인증 초기화 된 appAuth 가져오기 => firebase/auth에서 가져오면 안된다.
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  // 에러 관리 -> 회원가입 에러 발생 시 에러 정보 저장
  const [error, setError] = useState(null);
  // 통신 관리 -> 현재 서버와 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null); // 아직 에러가 없음
    setIsPending(true); // 통신 진행 중

    // firebase 문서를 가면 추가적인 메소드를 확인할 수 있다.
    // firebase 로그인 메소드
    signInWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setError(null);
        setIsPending(false);
        if (!user) {
          throw new Error("로그인 실패");
        }
        // 추가적인 정보 저장(displayName)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      });
  };

  return { error, isPending, login };
};
