class CompareDocumentOutputs:
    def __init__(self, score):
        self.kvs = {
            'score': score,
        }


class SearchDocumentOutputs:
    def __init__(self, titles, size):
        self.kvs = {
            'articles': list(map(lambda t: {
                'name': t[0],
                'pageId': t[1],
            }, titles)),
            'size': size,
        }
