import sys
import urllib.parse 
import text2emotion as te

def emotion_output(text):
    dcde = urllib.parse.unquote(text)
    emotion_dict = te.get_emotion(dcde)

    return emotion_dict

text="Hello%20Everyone%20Iamvery%20sad%20sad%20sad%20sad"
text.replace('\r', '')
text.replace('\n', '')

print(emotion_output(text))
