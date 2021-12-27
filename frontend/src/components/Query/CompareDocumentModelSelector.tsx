import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { MODELS } from '../DemoContainer/DemoContainer';

interface CompareDocumentModelSelectorProps {
    compareModel: string;
    compareModelHandler: (v: React.SetStateAction<string>) => void;
}

export const CompareDocumentModelSelector: React.FC<CompareDocumentModelSelectorProps> =
    ({
        compareModel,
        compareModelHandler,
    }: CompareDocumentModelSelectorProps) => {
        return (
            <Card>
                <Card.Header>Model</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={compareModel}
                                onChange={(e) => {
                                    compareModelHandler(e.target.value);
                                }}
                            >
                                {MODELS.map((lang, id) => (
                                    <option key={id} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    };
