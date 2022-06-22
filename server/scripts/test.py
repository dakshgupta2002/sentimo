import sys
import urllib.parse 
import text2emotion as te

def emotion_output(text):
    dcde = urllib.parse.unquote(text)
    emotion_dict = te.get_emotion(dcde)

    return emotion_dict


print(emotion_output("Hello%20Everyone%20Iamvery%20sad%20sad%20sad%20sad"))
