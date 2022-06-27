import sys
import urllib.parse 
import text2emotion as te

def emotion_output(text):
    dcde = urllib.parse.unquote(text)
    emotion_dict = te.get_emotion(dcde)

    return emotion_dict

#text="Hello%20Everyone%20Iamvery%20sad%20sad%20sad%20sad"
text = "BSDK%20omantic%20songs%20have%20been%20around%20for%20decades%20and%20can%20be%20found%20in%20the%20histories%20and%20cultures%20of%20most%20Bollywood%20movies,%20social%20cultures,%20though%20their%20ubiquity%20is%20a%20modern%20phenomenon.%20Romantic%20Songs%20are%20also%20known%20as%20Love%20Songs.%20A%20love%20song%20is%20a%20song%20about%20romantic%20love,%20falling%20in%20love,%20heartbreak%20after%20a%20breakup,%20and%20the%20feelings%20that%20these%20experiences%20bring.%20What%20is%20love?%20Love%20is%20an%20emotion%20or%20feeling%20that%20is%20typically%20associated%20with%20a%20strong%20affection%20towards%20someone.%20The%20feeling%20of%20love%20is%20said%20to%20be%20one%20of%20the%20most%20powerful%20emotions%20in%20the%20world.%20When%20it%20comes%20to%20romantic%20songs,%20Bollywood%20has%20given%20us%20some%20of%20the%20most%20beautiful%20and%20romantic%20songs%20of%20all%20time.%20These%20songs%20have%20the%20power%20to%20make%20us%20feel%20love%20and%20emotion%20in%20the%20most%20beautiful%20way%20possible.%0A%0ARead%20more:%20https://www.hinditracks.in/romantic-songs-lyrics"

text.replace('\r', '')
text.replace('\n', '')
print(text)
#print(emotion_output(text))
