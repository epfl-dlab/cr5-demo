import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { CompareResponse } from '../DemoContainer/DemoContainer';

const convertScore = (score: number | undefined) => {
    if (!score) {
        return 0.0;
    }
    return parseFloat((score * 100).toFixed(2));
};

export const CompareResponseContainer: React.FC<CompareResponse> = (
    compareResponse: CompareResponse
) => {
    return (
        <Card>
            <Card.Header>Similarity Score</Card.Header>
            <Card.Body>
                <ProgressBar
                    striped
                    now={Math.abs(convertScore(compareResponse?.score))}
                    label={`${convertScore(compareResponse?.score)}%`}
                />
            </Card.Body>
        </Card>
    );
};
