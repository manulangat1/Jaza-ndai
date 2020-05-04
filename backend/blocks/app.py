from web3 import Web3
import json
import os
# from interface import ContractInterface
ganache_url = 'http://127.0.0.1:8545'
contract_dir = os.path.abspath('../frontend/src/contracts/')
abi_dir =  os.path.abspath('../../frontend/src/abis/RideShare.json')
print(abi_dir)
web3 = Web3(Web3.HTTPProvider(ganache_url))
print(web3.isConnected())
print(web3.eth.blockNumber)
accnt = web3.eth.accounts[0]
accnt1 = web3.eth.accounts[1]
print(accnt,"",accnt1)
with open(abi_dir, 'r') as f:
    data = f.read()
print(data)
nonce = web3.eth.getTransactionCount(accnt)
print(nonce,accnt)
# print(web3.eth.)
    