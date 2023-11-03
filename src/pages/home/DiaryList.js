import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";

const DiaryList = ({ diaries }) => {
  const { deleteDocument } = useFirestore("diary");

  return (
    <>
      {diaries.map((it) => {
        return (
          <li key={it.id}>
            <strong className={styles.title}>{it.title}</strong>
            <p className={styles.text}>{it.text}</p>
            <button
              type="button"
              onClick={() => {
                deleteDocument(it.id);
              }}
            >
              삭제
            </button>
          </li>
        );
      })}
    </>
  );
};

export default DiaryList;
