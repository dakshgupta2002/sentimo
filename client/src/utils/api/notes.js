import { get, post } from './rest';

export const fetchNotes = async (date) => {
    const notes = await get(`notes?date=${date.toLocaleDateString()}`); //get notes for the date
    return notes;
}

export const postNote = async (title, content, date, notesAdded, setNotesAdded) => {
    const res = await post("notes", { title, content }, 'POST');
    setNotesAdded(notesAdded + 1);      
    return res;
}
export const removeNote = async (id, notesAdded, setNotesAdded) => {
    const res = await post(`notes?noteId=${id}`, {}, 'DELETE');
    setNotesAdded(notesAdded-1);
    return res;
}

export const updateFav = async (noteId) => {
    const res = await post(`notes/favourite`, {noteId}, 'PUT');
    return res;
}

export const updateProtect = async (noteId) => {
    const res = await post(`notes/protect`, {noteId}, 'PUT');
    return res;
}