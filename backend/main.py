import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from typing import List
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")

# print(api_key)


DATA = {
    
    "2025-02-02" : [
        { "description": "Food", "amount": 300, "date": "2025-02-02", "index": 0 },
        { "description": "Transport", "amount": 100, "date": "2025-02-02", "index": 1 },
        { 'description': "Rent", "amount": 1000, "date": "2025-02-02", "index": 2 },
        
    ],
    "2025-02-05" : [
        { "description": "Food", "amount": 300, "date": "2025-02-05", "index": 0 },
        { "description": "Transport", "amount": 100, "date": "2025-02-05", "index": 1 },
        { "description": "Rent", "amount": 1000, "date": "2025-02-05", "index": 2 },
        
    ],

}




class ChatData(BaseModel):
    message: str
    data: Dict[str, List[Dict[str, any]]]
    
app = FastAPI()

origins = ['http://localhost:5500', 'http://localhost:5000', 'http://localhost:5501']

app.add_middleware('CORSMiddleware', 
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=['*'], 
                   allow_headers=['*']
                   )

@app.post('/chat')
async def chat_with_gemini(chat_data: ChatData):
    prompt = "DATA REQUIRED\n" + str (chat_data.data) + "\nPrompt" + "\n" + chat_data.message
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents= chat_data.data, prompt=chat_data.message
    )
    print(response.text)
    return {"response": response}

# client = genai.Client(api_key=api_key)
# response = client.models.generate_content(
# model="gemini-2.0-flash", contents = prompt
# )
# print(response.text)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)