import React, { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { DemoContainer } from './components/DemoContainer/DemoContainer';
import { project } from './constants';

const App: React.FC = () => {
    useEffect(() => {
        document.title = project.name;
    }, []);

    return (
        <>
            <Header />
            <hr />
            <DemoContainer />
        </>
    );
};

export default App;
