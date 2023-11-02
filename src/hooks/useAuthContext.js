import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context; // state와 dispatch 함수가 들어있음 -> hooks를 따로 만든 이유를 모르겠다
};
