import sys
import urllib.parse 
import speech_recognition as sr 
import text2emotion as te 

def emotion_speech():
	r = sr.Recognizer()

	with sr.Microphone() as source:

		audio_text = r.listen(source, phrase_time_limit = 60)

		try:
			speech_text = r.recognize_google(audio_text)
			
		except: 
			print("Sorry, I didn't get that.")

	dcdespch = urllib.parse.unquote(speech_text)
	emotion_speech_dict = te.get_emotion(dcdespch)

	result = urllib.parse.urlencode(emotion_speech_dict)

	return result

print(emotion_speech())
