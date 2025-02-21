import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")

class ChatData(BaseModel):
    message: str
    data: Dict[str, List[Dict[str, Any]]]  
    
class SuggestionData(BaseModel):
    data: Dict[str, List[Dict[str, Any]]]  

app = FastAPI()

origins = ['http://localhost:5500', 'http://localhost:5000', 'http://localhost:5501', '*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*' , 'http://127.0.0.1:5500'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
async def root():
    return {"message": "Welcome to my API :)"}


@app.get('/hi')
async def root():
    return {"message": "Hello World"}

@app.post('/chat')
async def chat_with_gemini(chat_data: ChatData):
    
    prompt = "*DATA REQUIRED*\n" + str(chat_data.data) + "\n*Prompt*\n" + chat_data.message + " DONT use markdown . ONLY use tags. Dont include the <html> tag and ```. wrap it in a div. All expenses are in rupees (INR ₹). Make the use of appropriate tags Use inline css for styling, keep the  background transparent. Even if the prompt is not related to expenses, the response should be given."

    genai.configure(api_key=api_key)
    try:
        model = genai.GenerativeModel('gemini-pro')  # Use the correct model name
        response = model.generate_content(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini API: {str(e)}")

    print(response)
    return {"response": response.text}

@app.post('/Suggestions')
async def suggest_with_gemini(chat_data: SuggestionData):
    
    prompt = "DATA REQUIRED\n" + str(chat_data.data) + "\n Give me a suggestion for my expenses. All expenses are in rupees (INR ₹) \n give me the response such that i can add it inside of the innerHTML of the div.Dont use markdown only use tags. Dont include the <html> tag. wrap it in a div. Response should be around 60 words."
  
    genai.configure(api_key=api_key)
    try:
        model = genai.GenerativeModel('gemini-pro')  # Use the correct model name
        response = model.generate_content(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini API: {str(e)}")

    # print(response)
    return {"response": response.text}


# prompt = "DATA REQUIRED\n" + str(data_dict) + "\nPrompt\n" + "Give me a summary of my expenses"
# model = genai.GenerativeModel('gemini-pro')
# genai.configure(api_key=api_key)
# response = model.generate_content(prompt)
# print(response.text)

host = os.getenv("HOST")

if __name__ == "__main__":
    uvicorn.run(app, host=host, port=10000)