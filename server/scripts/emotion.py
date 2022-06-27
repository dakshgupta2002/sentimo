import sys
import urllib.parse 
# import text2emotion as te

def emotion_output(text):
    dcde = urllib.parse.unquote(text)
    # emotion_dict = te.get_emotion(dcde)

    return dcde


text = sys.argv[1]
text.replace('\r', '')
text.replace('\n', ' ')
# print(emotion_output(text))

print(emotion_output(text))
