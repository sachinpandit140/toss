from fastapi import FastAPI
from ai import generate_text

app = FastAPI()


@app.get("/api/scan")
def scan(query: str):
    return {"summary": generate_text(query).split("."), "alerts": []}
