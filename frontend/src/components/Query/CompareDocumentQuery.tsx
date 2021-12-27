import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { Language } from '../DemoContainer/DemoContainer';

interface CompareDocumentQueryProps {
    documentHeader: string;
    languages: Language[];
    language: string;
    document: string;
    languageHandler: (v: React.SetStateAction<string>) => void;
    documentHandler: (v: React.SetStateAction<string>) => void;
}

export const CompareDocumentQuery: React.FC<CompareDocumentQueryProps> = ({
    documentHeader,
    languages,
    language,
    document,
    languageHandler,
    documentHandler,
}: CompareDocumentQueryProps) => {
    return (
        <Card>
            <Card.Header>{documentHeader}</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            as="select"
                            value={language}
                            onChange={(e) => {
                                languageHandler(e.target.value);
                            }}
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Document</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={document}
                            onChange={(e) => {
                                e.preventDefault();
                                documentHandler(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};
