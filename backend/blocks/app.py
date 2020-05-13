from web3 import Web3
import json
import os
import solc
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
nonce = web3.eth.getTransactionCount(accnt)
print(nonce,accnt)
# from solc import compile_files

# contracts = compile_files(['RideShare.sol'])
main_contract = contracts.pop("Rideshare.sol:Ride")
# print(main_contract)
truffleFile = json.load(open('../../frontend/src/abis/RideShare.json'))
abi = truffleFile['abi']
bytecode = truffleFile['bytecode']
contract= web3.eth.contract(bytecode=bytecode, abi=abi)
print(abi,bytecode)
# contract_address = Web3.toChecksumAddress("<Deployed Contract Address here>")