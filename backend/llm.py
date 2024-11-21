from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_ollama.llms import OllamaLLM
from langchain import PromptTemplate
import textwrap

# Define request model for API
class QueryRequest(BaseModel):
    query: str


# Helper Class for Document Management
class DocumentManager:
    @staticmethod
    def load_pdfs(file_paths):
        """Load multiple PDFs into a list of documents."""
        all_docs = []
        for file_path in file_paths:
            loader = PyMuPDFLoader(file_path=file_path)
            docs = loader.load()
            all_docs.extend(docs)
        return all_docs

    @staticmethod
    def split_docs(documents, chunk_size=1000, chunk_overlap=20):
        """Split documents into chunks."""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        return text_splitter.split_documents(documents=documents)


# Helper Class for Embedding and Retrieval
class EmbeddingManager:
    @staticmethod
    def load_embedding_model(model_path, normalize_embedding=True):
        """Load the embedding model."""
        from langchain_huggingface import HuggingFaceEmbeddings

        return HuggingFaceEmbeddings(
            model_name=model_path,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": normalize_embedding},
        )

    @staticmethod
    def create_vectorstore(chunks, embedding_model, storing_path="vectorstore"):
        """Create a FAISS vectorstore and save it locally."""
        vectorstore = FAISS.from_documents(chunks, embedding_model)
        vectorstore.save_local(storing_path)
        return vectorstore


# Helper Class for Chain Management
class QAChainManager:
    @staticmethod
    def load_qa_chain(retriever, llm, prompt_template):
        """Create a RetrievalQA chain."""
        return RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            chain_type="stuff",
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt_template},
        )


# Main System Orchestrator
class QAOrchestrator:
    def __init__(self, file_paths, llm_model, embedding_model_path):
        self.file_paths = file_paths
        self.llm_model = llm_model
        self.embedding_model_path = embedding_model_path
        self.chain = None

    def initialize(self):
        """Initialize the QA system."""
        # Load and process documents
        docs = DocumentManager.load_pdfs(self.file_paths)
        document_chunks = DocumentManager.split_docs(docs)

        # Create embeddings
        embedding_model = EmbeddingManager.load_embedding_model(
            self.embedding_model_path
        )
        vectorstore = EmbeddingManager.create_vectorstore(document_chunks, embedding_model)
        retriever = vectorstore.as_retriever()

        # Load LLM and create chain
        llm = OllamaLLM(model=self.llm_model, temperature=0)
        prompt_template = PromptTemplate.from_template(
            """
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
        self.chain = QAChainManager.load_qa_chain(retriever, llm, prompt_template)

    def get_response(self, query):
        """Query the chain and return the response."""
        if not self.chain:
            raise ValueError("QA system is not initialized.")
        response = self.chain.invoke({"query": query})
        return textwrap.fill(response["result"], width=100)

