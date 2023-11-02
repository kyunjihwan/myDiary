import { useState } from "react";
import styles from "./Signup.module.css";
import { useSignUp } from "../../hooks/useSignup";

const Signup = () => {
  // 회원가입 input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignUp();

  // input 상태 변화 함수
  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else if (e.target.type === "text") {
      setDisplayName(e.target.value);
    }
  };

  // 회원가입 버튼 클릭 시
  const handleSubmit = (e) => {
    // submit 기능 막기
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor="myEmail">email : </label>
        <input
          type="email"
          id="myEmail"
          required
          value={email}
          onChange={handleData}
        />
        <label htmlFor="myDisplayName">nick : </label>
        <input
          type="text"
          id="myDisplayName"
          required
          value={displayName}
          onChange={handleData}
        />

        <label htmlFor="myPassword">password : </label>
        <input
          type="password"
          id="myPassword"
          required
          value={password}
          onChange={handleData}
        />

        <button type="submit" className={styles.btn}>
          회원가입
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
