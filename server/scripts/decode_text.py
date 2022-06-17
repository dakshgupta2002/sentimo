import sys
import urllib.parse 
import text2emotion as te

def emotion_output(text):
    dcde = urllib.parse.unquote(text)
    emotion_dict = te.get_emotion(dcde)

    result = urllib.parse.urlencode(emotion_dict)

    return result


text = sys.argv[1]

print(emotion_output(text))
