import { get, post } from "./rest"
import { fetchNotes } from "./notes";

export const fetchStats = async (date) => {
    const res = await get(`stats?date=${date.toLocaleDateString()}`)
    return res;
}

export const fetchNoteStats = async (noteId) => {
    // fetch stats of this noteId;
    const res = await post("stats/note", {noteId}, 'POST');
    return res;
}