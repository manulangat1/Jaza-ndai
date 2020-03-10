# import json 
# import os
# # from blockchain import *
# # from . import blockchain
# with open('blockchain/one','r') as f:
#     data = f.read()
#     print(data)
#     # print("file")
# # def get_blocks():
# #     blocks = os.listdir("blockchain")
# #     print(blocks)
# #     return sorted([int(i) for i in blocks])
# # get_blocks()
# def get_hash(blockName):
#     file = open("blockchain/{0}",'rb'.format(blockName)).read()
#     print(file)
#     return hashlib.sha256(file).hexdigest()
# get_hash("one")
# # def verify():
# #     blocks = get_blocks()
# #     results = []
# #     for file in blocks[1:]:
# #         prev_h = json.load(open(blockchain + str(file)))['hash']
# #         prev_b = str(file-1)
# #         true_h = get_hash(prev_b)
# #         if prev_h == true_h:
# #             res = "genuine"
# #         else:
# #             res = "fake"
# #         results.append({'block':prev_b,'result':res})
# #     return results
# # def create_block(payer,amount,payee,p_hash=''):
# #     blocks = get_blocks()
# #     last_block = blocks[-1]

# #     blockName = str(last_block + 1)
# #     p_hash = get_hash(str(last_block))
# #     data = {
# #         'payer':payer,
# #         'amount':amount,
# #         'payee':payee,
# #         'hash':p_hash
# #     }
# #     with open(blockchain + blockName, 'w') as file:
# #         json.dump(data,file,indent=4)
# # def main():
# #     create_block('John',1,'Adam')
# #     print(verify())
# # if __name__ == '__main__':
# #     main()