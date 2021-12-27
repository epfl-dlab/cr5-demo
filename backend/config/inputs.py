from config.schemas import *

from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema


class DocumentInputs(Inputs):
    json = [
        JsonSchema(
            schema=DOCUMENT_SCHEMA,
        ),
    ]


class CompareQueryInputs(Inputs):
    json = [
        JsonSchema(
            schema=COMPARE_QUERY_SCHEMA,
        ),
    ]
