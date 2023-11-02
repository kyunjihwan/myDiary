import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// context 객체를 생성
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    case "ISAUTHREADY": {
      return { ...state, user: action.payload, isAuthReady: true };
    }

    default:
      return state;
  }
};

// context를 구독할 컴포넌트의 묶음 범위을 설정
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  // 로그인 정보 확인
  //   console.log(`user state : `, state);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      dispatch({ type: "ISAUTHREADY", payload: user });
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
