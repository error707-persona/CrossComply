from llm import LLMOrchestrator
from fastapi import FastAPI, HTTPException
from models import ModelQuery
from faker import Faker

mock = True
fake = Faker()

# Define orchestrator (before app launch)
llm_orchestrator = LLMOrchestrator(
    file_paths=[
        "../notebooks/docs/rodtep_guidelines-output.pdf",
        "../notebooks/docs/Drawback-Rates.pdf",
        "../notebooks/docs/furniture_tv.pdf",
    ],
    llm_model="llama3.2",
    embedding_model_path="sentence-transformers/all-mpnet-base-v2",
    default_prompt="""
    ### System:
    You are a respectful and honest assistant. You have to answer the user's \
    questions using only the context provided to you. If you don't know the answer, \
    please think rationally and answer from your own knowledge base.

    ### Context:
    {context}

    ### User:
    {question}

    ### Response:
    """
)

# Explicitly initialize at runtime
if not mock:
    try:
        llm_orchestrator.initialize()
    except Exception as e:
        raise RuntimeError(f"Failed to initialize QA system: {e}")

# Initialize FastAPI app
app = FastAPI(debug=True)

@app.get("/test")
def test():
    return {"data": "hello-world"}

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
        response = llm_orchestrator.get_response(request.query, system="""
            Return the data in json format no matter what.
            If it is an error return it is `{error: {message:""}}`
        """)
        return {"response": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

