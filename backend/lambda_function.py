import uuid
import subprocess
import os
import json


## This func is deployed onto AWS lambda
def handler(event, context):
    code = event.get('code', '')

    code_file = f"/tmp/{uuid.uuid4()}.py"
    with open(code_file, "w") as file:
        file.write(code)
    
    result = subprocess.run(["python3", code_file], capture_output=True, text=True)
    
    os.remove(code_file)
        
    return json.dumps({"stdout": result.stdout,
                        "stderr": result.stderr, 
                        "retval": result.returncode})
