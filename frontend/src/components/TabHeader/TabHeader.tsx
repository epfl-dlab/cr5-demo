import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface TabHeaderProps {
    headerName: string;
    resetHandler: () => void;
    exemplifyHandler: () => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
    headerName,
    resetHandler,
    exemplifyHandler,
}: TabHeaderProps) => {
    return (
        <Card.Header>
            <h5 style={{ fontSize: '130%' }}>
                {headerName}
                <span style={{ float: 'right' }}>
                    <Button
                        type="submit"
                        size="sm"
                        variant="outline-secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            resetHandler();
                        }}
                    >
                        Reset
                    </Button>
                </span>
                <span style={{ float: 'right' }}>
                    <Button
                        type="submit"
                        size="sm"
                        variant="outline-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            exemplifyHandler();
                        }}
                    >
                        Try an example
                    </Button>
                </span>
            </h5>
        </Card.Header>
    );
};
