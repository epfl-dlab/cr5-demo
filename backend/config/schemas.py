DOCUMENT_SCHEMA = {
    "type": "object",
    "discriminator": "documentType",
    "properties": {
        "text": {
            "type": "string",
            "description": "Text of document",
        },
    },
    "required": [
        "text",
    ]
}

COMPARE_QUERY_SCHEMA = {
    "type": "object",
    "discriminator": "compareQueryType",
    "properties": {
        "srcText": {
            "type": "string",
            "description": "Text of document #1",
        },
        "dstText": {
            "type": "string",
            "description": "Text of document #2",
        },
    },
    "required": [
        "srcText",
        "dstText",
    ]
}


