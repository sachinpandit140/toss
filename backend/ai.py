import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API"))
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_text(prompt):
    system_prompt = "Check this tos and provide a summary. Make the result to be phrases and consice to the point so that it can be readed in a\
        bulleted list format, but don't put the bullets in the text, that will be taken care by the user. This should make the user aware of the\
            generic outline of the terms of service. Give sentences in order of importance\
            The summary is to be plain single paragraph with short sentences and no formatting.\n"
    return model.generate_content(system_prompt+prompt).text
