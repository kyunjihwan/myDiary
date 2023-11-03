import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending": {
      return { isPending: true, document: null, success: false, error: null };
    }
    case "addDoc": {
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    }
    case "removeDoc": {
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    }
    case "error": {
      return {
        isPending: true,
        document: null,
        success: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // colRef : 컬렉션의 참조를 요구
  const colRef = collection(appFireStore, transaction);

  // 컬렉션에 문서를 추가
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });
    try {
      const createTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createTime });
      console.log(docRef);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // 컬렉션에서 문서를 제거
  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "removeDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
