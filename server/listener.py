import os
import time
import requests
import json
from dotenv import load_dotenv

load_dotenv()
mainNet = True

def extract_fields(json_data):
    data = json.loads(json_data)
    result = []

    for obj in data['result']:
        timestamp = obj['timeStamp']
        tx_hash = obj['hash']
        to_address = obj['to']
        contract_address = obj['contractAddress']

        result.append({
            'timeStamp': timestamp,
            'hash': tx_hash,
            'to': to_address,
            'address': contract_address
        })

    return result

# The address' for all the deployers we manually collected
deployers = {}
if mainNet:
    deployers = {
        "0xbd723fc4f1d737dcfc48a07fe7336766d34cad5f": "Aave",
        "0x30fe242a69d7694a931791429815db792e24cf97": "Aave", 
        "0x51f22ac850d29c879367a77d241734acb276b815": "Aave", 
        "0x2fbb0c60a41cb7ea5323071624dcead3d213d0fa": "Aave", 
        "0x46bcf35d96eda5e5f6ec48c7956bb4ed9caba1f2": "Aave",
        "0xa6842c2c7fece4cdc6a4aaad331eb1c7910e419a": "Aave", 
        "0xf71fc92e2949ccf6a5fd369a0b402ba80bc61e02": "bdglabs.eth", 
        "0x6c9fc64a53c1b71fb3f9af64d1ae3a4931a5f4e9": "Uniswap", 
        "0xd32ff78579352ca78f416120a9f68b65c410871b": "Uniswap",
        "0xda0fab05039809e63c5d068c897c3e602fa97457": "MakerDAO",
        "0x4f26ffbe5f04ed43630fdc30a87638d53d0b0876": "MakerDAO",
        "0x9996571372066a1545d3435c6935e3f9593a7ef5": "Optimism",
        "0x0bb2ca5ea700ba04c713008e1a3d198b4e8da7a7": "Optimism",
        "0x6d64e3ae391b5f79e526138f325a2e787027b453": "Crypto.com",
        "0x6d1c18bccde60142af23a3f8aa6f5f59c532a675": "adidas Originals"  
    }
else:
    deployers = {
        "0x6e3bdebd0c90a36d88169c7f4d948c12db0bfaca": "SimpliAudit"  
    }

for deployer in deployers:
    if mainNet:
        url = "https://api.etherscan.io/api?module=account&action=txlist&address="+deployer+"&erc20=true&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey="+os.getenv("ETHERSCAN_API_KEY")
    else:
        url = "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address="+deployer+"&erc20=true&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey="+os.getenv("ETHERSCAN_API_KEY")
    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    # Check if the request was successful
    if response.status_code == 200:
        # Convert the response to JSON format
        result = extract_fields(response.text)
        json_result = []
        for contract in result:
            #check if it is a contract
            address = contract['to']
            if not address:
                address = contract['address']
            if mainNet:
                url = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address="+address+"&apikey="+os.getenv("ETHERSCAN_API_KEY")
            else:
                url = "https://api-sepolia.etherscan.io/api?module=contract&action=getsourcecode&address="+address+"&apikey="+os.getenv("ETHERSCAN_API_KEY")
            contractResponse = requests.request("GET", url, headers=headers, data=payload)
            #convert contractResponse to dictionary
            contractResponse = json.loads(contractResponse.text)
            SourceCode = contractResponse['result'][0]['SourceCode']
            if not SourceCode == ":" or SourceCode == "":
                #store result in documents.json
                #store timeStamp and hash
                output = {
                    "protocol": deployers[deployer],
                    "timeStamp": contract['timeStamp'],
                    "hash": contract['hash'],
                    "contractAddress": contract['to'],
                    "SourceCode": SourceCode
                }
                json_result.append(output)

        with open('server\documents.json', 'a') as outfile:
            json.dump(json_result, outfile)

    else:
        print("Request failed. Status code:", response.status_code)