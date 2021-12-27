import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Article } from '../DemoContainer/DemoContainer';

interface SearchResponseContainerProps {
    articles: Article[];
    size: number;
    targetLanguage: string;
}

export const SearchResponseContainer: React.FC<SearchResponseContainerProps> =
    ({ articles, size, targetLanguage }: SearchResponseContainerProps) => {
        return (
            <Card>
                <Card.Header>
                    Top Matches from {size.toLocaleString()} Records
                </Card.Header>
                <Card.Body>
                    <Table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Page ID</th>
                                <th>Article Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((data) => (
                                <tr key={data.pageId}>
                                    <td>
                                        <a
                                            href={`https://${targetLanguage}.wikipedia.org/?curid=${data.pageId}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {data.pageId}
                                        </a>
                                    </td>
                                    <td>{data.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    };
