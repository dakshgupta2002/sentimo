import { get } from './get';
import { post } from './post';

export const fetchNotes = async (date) => {
    const notes = await get(`notes?date=${date.toLocaleDateString()}`); //get notes for the date
    return notes.notes;
}

export const postNote = async (title, content) => {
    const res = await post("notes", { title, content }, 'POST');
    fetchNotes();
    return res;
}
// user/login 