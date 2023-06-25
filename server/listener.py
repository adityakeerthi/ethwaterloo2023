import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

# The address' for all the deployers we manually collected
deployers = [
    "0x0bb2ca5ea700ba04c713008e1a3d198b4e8da7a7",
]

url = "https://api.etherscan.io/api?module=account&action=txlist&address=0x0bb2ca5ea700ba04c713008e1a3d198b4e8da7a7&erc20=true&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=QBZ6JG6VDQ456IYSH3R91CFAQ19Y2DV1M5"

url = "https://api.etherscan.io/api?module=account&action=txlist&address="+deployers[0]+"&erc20=true&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey="+os.getenv("ETHERSCAN_API_KEY")

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)



print(response.text)
