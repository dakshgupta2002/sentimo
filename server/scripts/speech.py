import speech_recognition as sr 
import text2emotion as te 

r = sr.Recognizer()

with sr.Microphone() as source:
	
	audio_text = r.listen(source, phrase_time_limit = 60)

	try:
		speech_text = r.recognize_google(audio_text)
	except: 
		print("Sorry, I didn't get that.")

result = te.get_emotion(speech_text)

print(result)
