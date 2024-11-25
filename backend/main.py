import json
from llm import LLMOrchestrator
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ModelQuery
from faker import Faker

mock = False
fake = Faker()

default_prompt = """
### System:
You are a respectful and honest assistant. You have to answer the user's
questions using only the context provided to you. If you don't know the answer,
please think rationally and answer from your own knowledge base.

### Context:
{context}

### User:
{question}

### Response:
"""

json_prompt = lambda x="": """
### System:
Return the data only in json which can be directly parsed, don't return in a formatted way.
Because the output will be put into json.loads function in python.

You are a respectful and honest assistant. You have to answer the user's
questions using only the context provided to you. If you don't know the answer,
please think rationally and answer from your own knowledge base.


""" + x + """ 

If it is an error return it as `{{"error": {{"message":""}}}}`

### Context:
{context}

### User:
{question}

### Response:
"""

# Clean up the response to remove code block delimiters
def clean_up_json_response(response):
    if response.startswith("```"):
        response = response.replace("```","")
        response = response.replace(r"\n","")
        response = response[4:].strip()
    return response

# Define orchestrator (before app launch)
llm_orchestrator = LLMOrchestrator(
    file_paths=[
        "../notebooks/docs/rodtep_guidelines-output.pdf",
        "../notebooks/docs/Drawback-Rates.pdf",
        "../notebooks/docs/furniture_tv.pdf",
        "../notebooks/docs/htsdata.pdf",
        "../notebooks/docs/Tariff3.pdf",
        "../notebooks/docs/Tariff4.pdf",
        "../notebooks/docs/weekly_currency_notice_11-22-2024.pdf",
        "../notebooks/docs/Tariff1.pdf",
        "../notebooks/docs/CustomsAndTariffs.pdf"
    ],
    llm_model="gemini-1.5-flash",
    embedding_model_path="sentence-transformers/all-mpnet-base-v2",
    default_prompt=default_prompt
)

# Explicitly initialize at runtime
if not mock:
    try:
        llm_orchestrator.initialize(build_vector_store=False)
    except Exception as e:
        raise RuntimeError(f"Failed to initialize QA system: {e}")

# Initialize FastAPI app
app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify the frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def test():
    return {"data": "hello-world"}

@app.post("/dutiesTariffs")
def dutiesTariffs(request: ModelQuery):
    """Endpoint to process user queries."""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt())

        response = clean_up_json_response(response)

        return {"response": json.loads(response)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/potentialCostSavings")
def potentialCostSavings(request: ModelQuery):
    """Endpoint to process user queries."""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt("""
            1. Success: `[{{"costs": "value"}}]`
            2. Error: `[{{"error": {{"message": "value"}}}}]`"
        """))

        response = clean_up_json_response(response)

        return {"response": json.loads(response)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/estimatedCosts")
def estimatedCosts(request: ModelQuery):
    """Endpoint to process user queries."""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt())

        response = clean_up_json_response(response)

        return {"response": json.loads(response)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


# @app.get("/potentialCostSavings")
# def potentialCostSavings():
#     return {"data": "Some potential Cost Savings stuff from api"}

# @app.get("/estimatedCosts")
# def estimatedCosts():
#     return {"data": "Some Estimated Costs stuff from api"}

@app.post("/ask")
def ask_question(request: ModelQuery):
    """Endpoint to process user queries."""
    if mock:
        return {"query": request.query, "response": fake.text()}

    try:
        response = llm_orchestrator.get_response(request.query)
        return {"query": request.query, "response": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/get_json")
def get_json(request: ModelQuery):
    """Endpoint to process user queries."""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt())

        response = clean_up_json_response(response)

        return {"response": json.loads(response)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

@app.post("/get_compliance_data")
def get_compliance_data(request: ModelQuery):
    """Fetches compliance data from Ollama model"""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt())

        response = clean_up_json_response(response)

        return {"complianceData": json.loads(response)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/get_incentives_data")
def get_incentives_data(request: ModelQuery):
    """Fetches incentives data from Ollama model"""
    if mock:
        return {"response": fake.text()}

    try:
        response = llm_orchestrator.get_response_with_custom_prompt(request.query, json_prompt)

        response = clean_up_json_response(response)

        return {"detail": json.loads(response)}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
