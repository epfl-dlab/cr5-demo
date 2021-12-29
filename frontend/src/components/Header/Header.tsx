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
                    Source code for the paper:{' '}
                    <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {project.sourceCode}
                    </a>
                </p>
            )}

            {project.libraryLink && (
                <p>
                    Try the library here:{' '}
                    <a
                        href={project.libraryLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {project.libraryLink}
                    </a>
                </p>
            )}

            {project.demoProjectLink && (
                <p>
                    Source code for the demo:{' '}
                    <a
                        href={project.demoProjectLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {project.demoProjectLink}
                    </a>
                </p>
            )}

            {project.apiDocs && (
                <p>
                    API docs:{' '}
                    <a href={project.apiDocs} target="_blank" rel="noreferrer">
                        {project.apiDocs}
                    </a>
                </p>
            )}
        </Jumbotron>
    );
};
