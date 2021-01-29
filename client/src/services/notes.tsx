import { Note } from "../interfaces/interfaces";

const isProduction = process.env.NODE_ENV === "production";
const url = `${isProduction ? process.env.REACT_APP_BASE_URL_PRODUCTION : process.env.REACT_APP_BASE_URL}/api/notes`;

const getAllNotes = async () => {
  const res = await fetch(url);
  return responseHandler(res);
};

const createNote = async (note: Note) => {
  const options = setRestOptions("POST", note);
  const res = await fetch(url, options);
  return responseHandler(res);
};

const toggleNoteStatus = async (id: string) => {
  const options = setRestOptions("PATCH", { id });
  const res = await fetch(`${url}/${id}`, options);
  return responseHandler(res);
};

const deleteNote = async (id: string) => {
  const options = setRestOptions("DELETE", { id });
  const res = await fetch(`${url}/${id}`, options);
  return responseHandler(res);
};

const setRestOptions = (methodType: string, body?: any) => {
  return {
    method: methodType,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
};

const responseHandler = async (serverRes: Response) => {
  let res: any = { success: false };

  try {
    const data = await serverRes.json();

    if (data) {
      res = { success: true, data };
    }
  } catch (err) { }

  return res;
};

export { getAllNotes, createNote, toggleNoteStatus, deleteNote };