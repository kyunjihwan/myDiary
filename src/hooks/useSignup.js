// 인증 초기화 된 appAuth 가져오기 => firebase/auth에서 가져오면 안된다.
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  // 에러 관리 -> 회원가입 에러 발생 시 에러 정보 저장
  const [error, setError] = useState(null);
  // 통신 관리 -> 현재 서버와 통신 상태 저장
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null); // 아직 에러가 없음
    setIsPending(true); // 통신 진행 중

    // firebase 문서를 가면 추가적인 메소드를 확인할 수 있다.
    // 회원가입하는 메소드
    createUserWithEmailAndPassword(appAuth, email, password, displayName)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (!user) {
          throw new Error("회원가입 실패");
        }
        // 추가적인 정보 저장(displayName)
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            dispatch({ type: "LOGIN", payload: user });
            setError(null);
            setIsPending(false);
          })
          .catch((error) => {
            setError(error.message);
            setIsPending(false);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      });
  };

  return { error, isPending, signup };
};
