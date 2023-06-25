import time
import os
import subprocess

while True:
    # Delete documents.json file if it exists
    if os.path.exists('./server/documents.json'):
        os.remove('./server/documents.json')

    # Execute the listener.py script
    subprocess.run(['python', './server/listener.py'])
    
    # Wait 
    time.sleep(75)
