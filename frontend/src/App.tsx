import React from 'react';

import { Header } from './components/Header/Header';
import { DemoContainer } from './components/DemoContainer/DemoContainer';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <hr />
            <DemoContainer />
        </>
    );
};

export default App;
