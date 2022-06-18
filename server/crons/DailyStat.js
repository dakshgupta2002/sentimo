import { schedule } from 'node-cron';
import User from '../models/User.js';
import Stat from '../models/Stat.js';
import Diary from '../models/Diary.js';
import Note from '../models/Note.js';
import { spawn } from 'child_process';

var dailyStat = schedule('59 59 23 * * *', async () => {
  const date = (new Date()).toLocaleDateString();
  //at 11:59:59 pm of every day
  //create and save emotions of every user 
  //for that date
  const users = await User.find({}).exec(); //get all users
  users.forEach(async user => {
    const diary = await Diary.findOne({ user: user._id }).exec();
    if (diary) {
      const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())
      if (notes) {
        //notes is an array of promises, resolve all 
        await Promise.all(notes).then(notes => {
          notes.filter(note => {
            return (new Date(note.createdAt)).toLocaleDateString() === date
          });
          let text = "";
          notes.forEach(note => {
            text += note.title + " " + note.content + " ";
          })

          let data = encodeURI(text);
          let emotion;

          // spawn new child process to call the python script
          const python = spawn('python', ['scripts/emotion.py', data]);

          python.stdout.on('data', data => {
            emotion = data.toString();
          });

          python.on('close', async () => {
            var obj = "";
            for (var i = 0; i < emotion.length; i++) {
              if (emotion[i] === "'") {
                obj += '"';
              } else obj += emotion[i];
            }
            // emotion is a string, parse it to JSON
            obj = JSON.parse(obj);
            // save the emotion to the database
            const dailyStat = new Stat({
              user: user._id,
              date: date,
              emotion: obj
            });
            await dailyStat.save();
          })

        })
      }

    }
  });
});

dailyStat.start();