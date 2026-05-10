import requests
import json

try:
    response = requests.get('http://127.0.0.1:5000/api/news')
    print(f"Status Code: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
