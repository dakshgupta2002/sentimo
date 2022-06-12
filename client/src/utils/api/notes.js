import { get } from './get';
import { post } from './post';

export const fetchNotes = async (date) => {
    const notes = await get(`notes?date=${date.toLocaleDateString()}`); //get notes for the date
    return notes;
}

export const postNote = async (title, content, date) => {
    const res = await post("notes", { title, content }, 'POST');
    fetchNotes(date);
    return res;
}
// user/login 