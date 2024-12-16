import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_text(prompt):
    system_prompt = "Check this tos and provide a summary. The summary is to be plain single paragraph with short sentences and no formatting.\n"
    return model.generate_content(system_prompt+prompt).text
