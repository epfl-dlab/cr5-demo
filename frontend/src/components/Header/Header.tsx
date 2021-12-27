import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { project } from '../../constants';

export const Header: React.FC = () => {
    return (
        <Jumbotron>
            <h1 className="display-4" style={{ fontFamily: 'sans-serif' }}>
                {project.name}
            </h1>

            <i className="lead">{project.authors}</i>

            <hr className="my-4"></hr>

            <blockquote className="blockquote">
                <p className="small">{project.description}</p>
            </blockquote>

            {project.paperLink && (
                <p>
                    Full paper:{' '}
                    <a
                        href={project.paperLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {project.paperLink}
                    </a>
                </p>
            )}

            {project.sourceCode && (
                <p>
                    Source code:{' '}
                    <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {project.sourceCode}
                    </a>
                </p>
            )}

            {project.apiDocs && project.credits && (
                <p>
                    API docs:{' '}
                    <a href={project.apiDocs} target="_blank" rel="noreferrer">
                        {project.apiDocs}
                    </a>{' '}
                    <br />
                    <i
                        style={{
                            fontSize: 'small',
                        }}
                    >
                        Credits:{' '}
                        <a href={project.credits[0]}>{project.credits[1]}</a>
                    </i>
                </p>
            )}
        </Jumbotron>
    );
};
