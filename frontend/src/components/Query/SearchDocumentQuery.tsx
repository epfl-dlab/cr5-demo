import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { MODELS, LANGUAGE_MAP } from '../DemoContainer/DemoContainer';

interface SearchDocumentQueryProps {
    searchModel: string;
    documentLanguage: string;
    documentText: string;
    targetLanguage: string;
    searchModelHandler: (v: React.SetStateAction<string>) => void;
    documentLanguageHandler: (v: React.SetStateAction<string>) => void;
    documentTextHandler: (v: React.SetStateAction<string>) => void;
    targetLanguageHandler: (v: React.SetStateAction<string>) => void;
}

export const SearchDocumentQuery: React.FC<SearchDocumentQueryProps> = ({
    searchModel,
    documentLanguage,
    documentText,
    targetLanguage,
    searchModelHandler,
    documentLanguageHandler,
    documentTextHandler,
    targetLanguageHandler,
}: SearchDocumentQueryProps) => {
    return (
        <Card>
            <Card.Header>Query</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchModel}
                            onChange={(e) => {
                                searchModelHandler(e.target.value);
                            }}
                        >
                            {MODELS.map((lang, id) => (
                                <option key={id} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Document Language</Form.Label>
                        <Form.Control
                            as="select"
                            value={documentLanguage}
                            onChange={(e) => {
                                documentLanguageHandler(e.target.value);
                            }}
                        >
                            {LANGUAGE_MAP[searchModel].map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Document Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={documentText}
                            onChange={(e) => {
                                e.preventDefault();
                                documentTextHandler(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Target Language</Form.Label>
                        <Form.Control
                            as="select"
                            value={targetLanguage}
                            onChange={(e) => {
                                targetLanguageHandler(e.target.value);
                            }}
                        >
                            {LANGUAGE_MAP[searchModel].map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};
