from flask import Flask, redirect
from flask import render_template, request
from stellar_base.keypair import Keypair
import json
app = Flask(__name__)
@app.route("/gen_address")
def gen_address():
    kp = Keypair.random()
    publickey = kp.address().decode()
    seed = kp.seed().decode()
    return json.dumps({'publickey': publickey, 'seed': seed})
#     return
if __name__ == "__main__":
    app.run(debug=True)