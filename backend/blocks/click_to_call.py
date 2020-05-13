from flask import Flask,jsonify,url_for
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
app = Flask(__name__)
TWILIO_ACCOUNT_SID = "ACc8e3a5361026364333bcd339433f54f9"
TWILIO_AUTH_TOKEN = "74ca46f63ad8f45bc5fbb642ad510b58"
TWILIO_NUMBER = "+1 207 477 7406"
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
@app.route('/')
def hello():
    return "Hello world"
@app.route('/call',methods=['GET','POST'])
def call():
    twilio_client = Client(TWILIO_ACCOUNT_SID,
                               TWILIO_AUTH_TOKEN)
    twilio_client.calls.create(from_=TWILIO_NUMBER,
                                   to="+254740415950",
                                   url=url_for('.outbound',
                                               _external=True))
    return jsonify({'message': 'Call incoming!'})
@app.route('/outbound', methods=['POST'])
def outbound():
    response = VoiceResponse()

    response.say("Thank you for contacting our sales department. If this "
                 "click to call application was in production, we would "
                 "dial out to your sales team with the Dial verb.",
                 voice='alice')
    
    response.number("+254740415950")
    return str(response)
