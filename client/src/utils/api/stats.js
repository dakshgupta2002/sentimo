import { post } from "./rest"
import { fetchNotes } from "./notes";

export const fetchStats = async (date) => {
    //first fetch all notes for this date
    const notes = await fetchNotes(date);
    
    //convert notes object to text 
    var text = "";
    notes?.data?.notes.forEach(note => text += note.title + " " + note.content + " ");
    console.log(text);

    //spawn new child process to call the python script
    const res = await post("stats", {text, date}, 'POST');    
    return res;
}