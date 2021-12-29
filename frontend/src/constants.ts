export interface Project {
    name: string;
    authors: string;
    description: string;
    sourceCode?: string;
    paperLink?: string;
    libraryLink?: string;
    demoProjectLink?: string;
    apiDocs?: string;
}

export const HOST = process.env.REACT_APP_HOST_URL || 'http://localhost:5005';

export const project: Project = {
    name: 'Crosslingual Document Embedding as Reduced-Rank Ridge Regression',
    authors:
        'Martin Josifoski, Ivan S. Paskov, Hristo S. Paskov, Martin Jaggi, Robert West',
    description: `There has recently been much interest in extending vector-based word representations to multiple languages, such that words can be compared across languages. 
        In this paper, we shift the focus from words to documents and introduce a method for embedding documents written in any language into a single, language-independent vector space. 
        For training, our approach leverages a multilingual corpus where the same concept is covered in multiple languages (but not necessarily via exact translations), such as Wikipedia. 
        Our method, Cr5 (Crosslingual reduced-rank ridge regression), starts by training a ridge-regression-based classifier that uses language-specific bag-of-word features in order to predict the concept that a given document is about. 
        We show that, when constraining the learned weight matrix to be of low rank, it can be factored to obtain the desired mappings from language-specific bags-of-words to language-independent embeddings. 
        As opposed to most prior methods, which use pretrained monolingual word vectors, postprocess them to make them crosslingual, and finally average word vectors to obtain document vectors, Cr5 is trained end-to-end and is thus natively crosslingual as well as document-level. 
        Moreover, since our algorithm uses the singular value decomposition as its core operation, it is highly scalable. 
        Experiments show that our method achieves state-of-the-art performance on a crosslingual document retrieval task. 
        Finally, although not trained for embedding sentences and words, it also achieves competitive performance on crosslingual sentence and word retrieval tasks.
        `,
    sourceCode: 'https://github.com/epfl-dlab/Cr5',
    paperLink: 'https://arxiv.org/abs/1904.03922',
    libraryLink: 'https://github.com/epfl-dlab/cr5-lib',
    demoProjectLink: 'https://github.com/epfl-dlab/cr5-demo',
    apiDocs: new URL('apidocs', HOST).toString(),
};
