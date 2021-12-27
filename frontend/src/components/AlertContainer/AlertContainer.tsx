import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { ErrorResponse } from '../DemoContainer/DemoContainer';

export const AlertContainer: React.FC<ErrorResponse> = ({
    message,
    errorResponse,
    errorStatus,
}: ErrorResponse) => {
    return (
        <Card className="border-0 text-center">
            <Card.Body>
                <Alert variant="danger">An error occurred: {message}</Alert>
                {errorResponse && errorStatus && (
                    <Alert variant="warning">
                        Status Code: {errorStatus}; Error response:{' '}
                        {errorResponse}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};
