import os

from config.settings import MODELS, RATE_LIMIT
from config.schemas import *
import cr5

CR5_HOST = os.getenv('CR5_HOST', 'localhost:5005')

template = {
    "swagger": "2.0",
    "info": {
        "title": "Cr5 API",
        "description": "API for using Cr5 to embed, compare, or search documents in a memory-efficient manner.",
        "contact": {
            "email": "wanhao.zhou@gmail.com",
        },
        "version": cr5.__version__
    },
    "host": CR5_HOST,
    "schemes": [
        "http",
    ],
    "definitions": {
        "CompareQuery": COMPARE_QUERY_SCHEMA,
        "Document": DOCUMENT_SCHEMA,
    },
}

get_document_embedding_specs = {
    "summary": "Get the document embedding of a specific language with Cr5 model.",
    "description": f"""
        Embed the document of a specific language of a Cr5 model.
        The rate limit is {RATE_LIMIT}.
    """,
    "parameters": [
        {
            "name": "model_name",
            "in": "path",
            "description": "Name of the Cr5 model.",
            "type": "string",
            "enum": list(MODELS.keys()),
            "required": "true",
        },
        {
            "name": "lang_code",
            "in": "path",
            "description": "The language of the document in the query.",
            "type": "string",
            "required": "true",
        },
        {
            "name": "document",
            "in": "body",
            "schema": {
                "$ref": "#/definitions/Document",
            },
            "description": "The document to be embedded.",
            "required": "true",
            "type": "string",
        },
    ],
    "responses": {
        "200": {
            "description": "A list of embedding values representing the current document. The size will be 300.",
        },
        "400": {
            "description": """
                The provided document cannot be embedded due to errors in the arguments. 
                Details will be displayed in the error message.
            """,
        },
    }
}

compare_documents_specs = {
    "summary": "Compare the similarity of documents across different languages.",
    "description": f"""
        Compare the similarity of documents across different languages with a Cr5 model.
        The rate limit is {RATE_LIMIT}.
    """,
    "parameters": [
        {
            "name": "model_name",
            "in": "path",
            "description": "Name of the Cr5 model.",
            "type": "string",
            "enum": list(MODELS.keys()),
            "required": "true",
        },
        {
            "name": "src_lang",
            "in": "path",
            "description": "The language of the document #1 in the query.",
            "type": "string",
            "required": "true",
        },
        {
            "name": "dst_lang",
            "in": "path",
            "description": "The language of the document #2 in the query.",
            "type": "string",
            "required": "true",
        },
        {
            "name": "query",
            "in": "body",
            "schema": {
                "$ref": "#/definitions/CompareQuery"
            },
            "description": "The compare query object.",
            "required": "true",
            "type": "string"
        },
    ],
    "responses": {
        "200": {
            "description": "A JSON object with field `score` representing the cosine similarity between two documents.",
        },
        "400": {
            "description": """
                The provided document cannot be compared due to errors in the arguments. 
                Details will be displayed in the error message.
            """,
        },
    }
}

search_similar_documents_specs = {
    "summary": "Search the top documents in Wikipedia that are closest to the given document.",
    "description": f"""
        Search the top documents in Wikipedia that are closest to the 
        given document across different languages with a Cr5 model.
        The rate limit is {RATE_LIMIT}.
    """,
    "parameters": [
        {
            "name": "model_name",
            "in": "path",
            "description": "Name of the Cr5 model.",
            "type": "string",
            "enum": list(MODELS.keys()),
            "required": "true",
        },
        {
            "name": "src_lang",
            "in": "path",
            "description": "The language of the document in the query.",
            "type": "string",
            "required": "true",
        },
        {
            "name": "dst_lang",
            "in": "path",
            "description": "The language of the target search space.",
            "type": "string",
            "required": "true",
        },
        {
            "name": "document",
            "in": "body",
            "schema": {
                "$ref": "#/definitions/Document",
            },
            "description": "The document to search.",
            "required": "true",
            "type": "string",
        },
    ],
    "responses": {
        "200": {
            "description": """ A JSON object. 
            `articles`: a list of top documents in Wikipedia that are most similar to the given document.
            Each document is represented by the page id and the title.
            `size`: the size of search space.
            """,
        },
        "400": {
            "description": """
                The provided document cannot be searched due to errors in the arguments. 
                Details will be displayed in the error message.
            """,
        },
    }
}
