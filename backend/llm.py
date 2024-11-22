from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate

class LLMOrchestrator:
    def __init__(self, file_paths, llm_model, embedding_model_path, default_prompt):
        self.file_paths = file_paths
        self.llm_model = llm_model
        self.embedding_model_path = embedding_model_path
        self.chain = None
        self.prompt_template = default_prompt

    def initialize(self):
        """Initialize the LLM system."""
        docs = self._load_pdfs(self.file_paths)
        document_chunks = self._split_docs(docs)
        embedding_model = self._load_embedding_model(self.embedding_model_path)
        vectorstore = self._create_vectorstore(document_chunks, embedding_model)
        retriever = vectorstore.as_retriever()

        # Load LLM and create chain with the default prompt
        self._load_chain(retriever)

    def _load_pdfs(self, file_paths):
        all_docs = []
        for file_path in file_paths:
            loader = PyMuPDFLoader(file_path=file_path)
            docs = loader.load()
            all_docs.extend(docs)
        return all_docs

    def _split_docs(self, documents, chunk_size=1000, chunk_overlap=20):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        return text_splitter.split_documents(documents=documents)

    def _load_embedding_model(self, model_path, normalize_embedding=True):

        return HuggingFaceEmbeddings(
            model_name=model_path,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": normalize_embedding},
        )

    def _create_vectorstore(self, chunks, embedding_model, storing_path="vectorstore"):
        vectorstore = FAISS.from_documents(chunks, embedding_model)
        vectorstore.save_local(storing_path)
        return vectorstore

    def _load_chain(self, retriever):
        """Load the QA chain with the current prompt."""
        llm = OllamaLLM(model=self.llm_model, temperature=0)
        prompt = PromptTemplate.from_template(self.prompt_template)
        self.chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            chain_type="stuff",
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt},
        )

    def update_prompt(self, new_prompt):
        """Update the prompt template."""
        self.prompt_template = new_prompt

    def get_response(self, query, **kwargs):
        """Query the chain and return the response."""
        if not self.chain:
            raise ValueError("LLM system is not initialized.")
        response = self.chain.invoke({"query": query, **kwargs})
        return response["result"]

