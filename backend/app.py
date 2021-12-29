import http

from config.api_specs import *
from config.settings import *
from config.inputs import *
from config.outputs import CompareDocumentOutputs, SearchDocumentOutputs

from cr5.settings import SUPPORTED_LANGUAGES_PER_MODEL
from cr5.errors import ModelNotSupportedError, LanguageNotSupportedInModelError

import numpy as np
from flask import Flask, request, jsonify, make_response
from flasgger import Swagger, swag_from
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin

app = Flask(__name__)
Swagger(app=app, template=template)
limiter = Limiter(app=app, key_func=get_remote_address)
CORS(app=app)


@app.route('/embedding/<model_name>/<lang_code>', methods=['POST'])
@swag_from(get_document_embedding_specs)
@limiter.limit(RATE_LIMIT)
@cross_origin()
def get_document_embedding(model_name, lang_code):
    if model_name not in MODELS.keys():
        return make_response(
            ModelNotSupportedError(
                model_name=model_name,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    if lang_code not in SUPPORTED_LANGUAGES_PER_MODEL[model_name]:
        return make_response(
            LanguageNotSupportedInModelError(
                model_name=model_name,
                lang_code=lang_code,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    inputs = DocumentInputs(request)
    if not inputs.validate():
        return make_response(
            str(inputs.errors),
            http.HTTPStatus.BAD_REQUEST,
        )

    try:
        json = request.get_json()
        model = MODELS[model_name]
        embedding = model.get_document_embedding(
            document=json[DOCUMENT_SCHEMA['required'][0]],
            lang_code=lang_code,
            in_memory_model=False,
        )
        return make_response(
            jsonify(embedding.tolist()),
            http.HTTPStatus.OK,
        )

    except (ValueError, Exception) as e:
        return make_response(
            str(e),
            http.HTTPStatus.BAD_REQUEST,
        )


@app.route('/compare/<model_name>/<src_lang>/<dst_lang>', methods=['POST'])
@swag_from(compare_documents_specs)
@limiter.limit(RATE_LIMIT)
@cross_origin()
def compare_documents(model_name, src_lang, dst_lang):
    if model_name not in MODELS.keys():
        return make_response(
            ModelNotSupportedError(
                model_name=model_name,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    if src_lang not in SUPPORTED_LANGUAGES_PER_MODEL[model_name]:
        return make_response(
            LanguageNotSupportedInModelError(
                model_name=model_name,
                lang_code=src_lang,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    if dst_lang not in SUPPORTED_LANGUAGES_PER_MODEL[model_name]:
        return make_response(
            LanguageNotSupportedInModelError(
                model_name=model_name,
                lang_code=dst_lang,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    inputs = CompareQueryInputs(request)
    if not inputs.validate():
        return make_response(
            str(inputs.errors),
            http.HTTPStatus.BAD_REQUEST,
        )

    try:
        json = request.get_json()
        model = MODELS[model_name]
        src_embedding = model.get_document_embedding(
            document=json[COMPARE_QUERY_SCHEMA['required'][0]],
            lang_code=src_lang,
            in_memory_model=False,
        )
        dst_embedding = model.get_document_embedding(
            document=json[COMPARE_QUERY_SCHEMA['required'][1]],
            lang_code=dst_lang,
            in_memory_model=False,
        )
        return make_response(
            jsonify(
                **CompareDocumentOutputs(
                    score=(np.dot(src_embedding, dst_embedding) /
                           (np.linalg.norm(src_embedding) * np.linalg.norm(dst_embedding))).item()
                ).kvs
            ),
            http.HTTPStatus.OK,
        )

    except (ValueError, Exception) as e:
        return make_response(
            str(e),
            http.HTTPStatus.BAD_REQUEST,
        )


@app.route('/search/<model_name>/<src_lang>/<dst_lang>', methods=['POST'])
@swag_from(search_similar_documents_specs)
@limiter.limit(RATE_LIMIT)
@cross_origin()
def search_similar_documents(model_name, src_lang, dst_lang):
    if model_name not in MODELS.keys():
        return make_response(
            ModelNotSupportedError(
                model_name=model_name,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    if src_lang not in SUPPORTED_LANGUAGES_PER_MODEL[model_name]:
        return make_response(
            LanguageNotSupportedInModelError(
                model_name=model_name,
                lang_code=src_lang,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    if dst_lang not in SUPPORTED_LANGUAGES_PER_MODEL[model_name]:
        return make_response(
            LanguageNotSupportedInModelError(
                model_name=model_name,
                lang_code=dst_lang,
            ).message,
            http.HTTPStatus.BAD_REQUEST,
        )

    inputs = DocumentInputs(request)
    if not inputs.validate():
        return make_response(
            str(inputs.errors),
            http.HTTPStatus.BAD_REQUEST,
        )

    try:
        json = request.get_json()
        model = MODELS[model_name]
        titles, size = model.search_similar_documents_on_disk(
            document=json[DOCUMENT_SCHEMA['required'][0]],
            src_lang=src_lang,
            dst_lang=dst_lang,
            normalize=True,
        )
        return make_response(
            jsonify(
                **SearchDocumentOutputs(
                    titles=titles,
                    size=size,
                ).kvs
            ),
            http.HTTPStatus.OK
        )
    except (ValueError, Exception) as e:
        return make_response(
            str(e),
            http.HTTPStatus.BAD_REQUEST,
        )


if __name__ == "__main__":
    app.run(
        debug=True,
        host=APP_HOST,
        port=int(APP_PORT),
    )
