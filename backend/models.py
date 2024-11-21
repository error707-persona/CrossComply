from pydantic import BaseModel

class ModelQuery(BaseModel):
    query: str

