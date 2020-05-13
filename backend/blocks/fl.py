# import flask
from flask import Flask, jsonify,url_for
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
import json
# Declare Flask application
from flask_web3 import current_web3, FlaskWeb3


TWILIO_ACCOUNT_SID = "ACc8e3a5361026364333bcd339433f54f9"
TWILIO_AUTH_TOKEN = "74ca46f63ad8f45bc5fbb642ad510b58"
TWILIO_NUMBER = "+1 207 477 7406"
from twilio.twiml.voice_response import VoiceResponse
from twilio.rest import Client
app = Flask(__name__)
# from ..models import Appointment
# from ..backend.models  import Appointment
# Set Flask-Web3 configuration
app.config.update({'ETHEREUM_PROVIDER': 'http', 'ETHEREUM_ENDPOINT_URI': 'http://localhost:8545'})

# Declare Flask-Web3 extension
web3 = FlaskWeb3(app=app)

def load_into_db():
    print("hey")
# Declare route
@app.route('/blockNumber')
def block_number():
    print(current_web3.isConnected())
    print(current_web3.eth.blockNumber)
    accnt = current_web3.eth.accounts[0]
    accnt1 = current_web3.eth.accounts[1]
    print(accnt,"",accnt1)
    print(web3.toWei(1, 'ether'))
    print(web3.isAddress(accnt))
    tx = web3.eth.sendTransaction({'to': accnt1, 'from': accnt, 'value': 12345})
    # print(tx)
    t = tx.decode('ISO-8859-1')
    print(t)
    return jsonify({'data': current_web3.eth.blockNumber,"tx":t})
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
