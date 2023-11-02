import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const DiaryForm = ({ uid }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");
  console.log(response);

  const handleData = (e) => {
    if (e.target.id === "tit") {
      setTitle(e.target.value);
    } else if (e.target.id === "cont") {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      setText("");
      setTitle("");
    }
  }, [response.success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="tit">일기 제목 : </label>
          <input
            value={title}
            type="text"
            required
            id="tit"
            onChange={handleData}
          />

          <label htmlFor="cont">일기 내용 : </label>
          <textarea
            value={text}
            id="cont"
            required
            onChange={handleData}
          ></textarea>

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
};

export default DiaryForm;
