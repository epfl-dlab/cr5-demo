import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

export const SpinnerContainer: React.FC = () => {
    return (
        <Card className="border-0 text-center">
            <Card.Body>
                <Spinner animation="border" variant="primary" />
            </Card.Body>
        </Card>
    );
};
