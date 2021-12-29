import React, { useState } from 'react';
import {
    Row,
    Col,
    Nav,
    TabPane,
    TabContainer,
    TabContent,
    Card,
    Button,
    CardDeck,
} from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import { SpinnerContainer } from '../SpinnerContainer/SpinnerContainer';
import { AlertContainer } from '../AlertContainer/AlertContainer';
import { CompareResponseContainer } from '../ResponseContainer/CompareResponseContainer';
import { SearchResponseContainer } from '../ResponseContainer/SearchResponseContainer';
import { CompareDocumentQuery } from '../Query/CompareDocumentQuery';
import { SearchDocumentQuery } from '../Query/SearchDocumentQuery';
import { TabHeader } from '../TabHeader/TabHeader';
import { CompareDocumentModelSelector } from '../Query/CompareDocumentModelSelector';
import { HOST } from '../../constants';

const JOINT_4_LANGUAGES: Language[] = [
    { name: 'English', code: 'en' },
    { name: 'Danish', code: 'da' },
    { name: 'Italian', code: 'it' },
    { name: 'Vietnamese', code: 'vi' },
];
const JOINT_28_LANGUAGES: Language[] = [
    { name: 'English', code: 'en' },
    { name: 'Bulgarian', code: 'bg' },
    { name: 'Catalan', code: 'ca' },
    { name: 'Czech', code: 'cs' },
    { name: 'Danish', code: 'da' },
    { name: 'German', code: 'de' },
    { name: 'Greek', code: 'el' },
    { name: 'Spanish', code: 'es' },
    { name: 'Estonian', code: 'et' },
    { name: 'Finnish', code: 'fi' },
    { name: 'French', code: 'fr' },
    { name: 'Croatian', code: 'hr' },
    { name: 'Hungarian', code: 'hu' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Italian', code: 'it' },
    { name: 'Macedonian', code: 'mk' },
    { name: 'Dutch', code: 'nl' },
    { name: 'Norwegian', code: 'no' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Russian', code: 'ru' },
    { name: 'Slovak', code: 'sk' },
    { name: 'Slovenian', code: 'sl' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Ukrainian', code: 'uk' },
    { name: 'Vietnamese', code: 'vi' },
];

type LanguageMap = {
    [key: string]: Language[];
};

export const MODELS = ['joint_4', 'joint_28'];
export const LANGUAGE_MAP: LanguageMap = {
    joint_4: JOINT_4_LANGUAGES,
    joint_28: JOINT_28_LANGUAGES,
};

const COMPARE_HREF = '#compare';
const SEARCH_HREF = '#search';
const COMPARE_TAB_HEADER =
    'Compute Similarity of Documents from Different Languages with Cr5';
const SEARCH_TAB_HEADER =
    'Search Similar Documents in Wikipedia across Languages with Cr5';

export const DemoContainer: React.FC = () => {
    // Used to control which tab is active
    const [compare, setCompare] = useState(true);
    const [search, setSearch] = useState(false);
    const [activeKey, setActiveKey] = useState(COMPARE_HREF);

    // Used to track the state of the "compare" query
    const [compareModel, setCompareModel] = useState('joint_4');
    const [languageFirst, setLanguageFirst] = useState('en');
    const [documentFirst, setDocumentFirst] = useState('');
    const [languageSecond, setLanguageSecond] = useState('en');
    const [documentSecond, setDocumentSecond] = useState('');

    // compareResponse data
    const [compareResponse, setCompareResponse] = useState<CompareResponse>();
    const [hasCompareResponse, setHasCompareResponse] = useState(false);

    const [compareLoading, setCompareLoading] = useState(false);
    const [compareError, setCompareError] = useState<ErrorResponse>();

    const compareDocuments = () => {
        const request = { srcText: documentFirst, dstText: documentSecond };
        const url = new URL(
            `compare/${compareModel}/${languageFirst}/${languageSecond}`,
            HOST
        ).toString();

        setCompareLoading(true);
        axios
            .post<CompareResponse>(url, request)
            .then((resp) => {
                setCompareLoading(false);
                setCompareError(undefined);
                setHasCompareResponse(true);
                setCompareResponse(resp.data);
            })
            .catch((err: AxiosError) => {
                setCompareLoading(false);
                setCompareError({
                    message: err.message,
                    errorResponse: err.response?.data,
                    errorStatus: err.response?.status,
                });
                setHasCompareResponse(false);
                setCompareResponse(undefined);
            });
    };

    const resetCompareDocuments = () => {
        setCompareLoading(false);
        setCompareError(undefined);
        setHasCompareResponse(false);
        setCompareResponse(undefined);
        setCompareModel('joint_4');
        setLanguageFirst('en');
        setLanguageSecond('en');
        setDocumentFirst('');
        setDocumentSecond('');
    };

    // Used to track the state of the "search" query
    const [searchModel, setSearchModel] = useState('joint_4');
    const [documentLanguage, setDocumentLanguage] = useState('en');
    const [documentText, setDocumentText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en');

    // searchResponse data
    const [searchResponse, setSearchResponse] = useState<SearchResponse>();
    const [hasSearchResponse, setHasSearchResponse] = useState(false);

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<ErrorResponse>();

    const searchSimilar = () => {
        const request = { text: documentText };
        const url = new URL(
            `search/${searchModel}/${documentLanguage}/${targetLanguage}`,
            HOST
        ).toString();

        setSearchLoading(true);
        axios
            .post<SearchResponse>(url, request)
            .then((resp) => {
                setSearchLoading(false);
                setSearchError(undefined);
                setHasSearchResponse(true);
                setSearchResponse(resp.data);
            })
            .catch((err: AxiosError) => {
                setSearchLoading(false);
                setSearchError({
                    message: err.message,
                    errorResponse: err.response?.data,
                    errorStatus: err.response?.status,
                });
                setHasSearchResponse(false);
                setSearchResponse(undefined);
            });
    };

    const resetSearchDocuments = () => {
        setSearchLoading(false);
        setSearchError(undefined);
        setHasSearchResponse(false);
        setSearchResponse(undefined);
        setSearchModel('joint_4');
        setDocumentLanguage('en');
        setDocumentText('');
        setTargetLanguage('en');
    };

    return (
        <Row style={{ marginLeft: '200px', marginRight: '200px' }}>
            {/* First, we define the left navigation column here */}
            <Col md={2}>
                <Nav
                    className="flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                    activeKey={activeKey}
                >
                    <Nav.Link
                        className="nav-link"
                        id="v-pills-compare-tab"
                        data-toggle="pill"
                        href={COMPARE_HREF}
                        role="tab"
                        aria-controls="v-pills-compare"
                        aria-selected={compare}
                        onClick={() => {
                            setCompare(true);
                            setSearch(false);
                            setActiveKey(COMPARE_HREF);
                        }}
                    >
                        Compare Documents
                    </Nav.Link>
                    <Nav.Link
                        className="nav-link"
                        id="v-pills-search-tab"
                        data-toggle="pill"
                        href={SEARCH_HREF}
                        role="tab"
                        aria-controls="v-pills-search"
                        aria-selected={search}
                        onClick={() => {
                            setCompare(false);
                            setSearch(true);
                            setActiveKey(SEARCH_HREF);
                        }}
                    >
                        Search Similar Documents
                    </Nav.Link>
                </Nav>
            </Col>

            {/* Next, we define the right column with actual contents */}
            <Col md={9}>
                <TabContainer
                    id="v-pills-tabContainer"
                    activeKey={COMPARE_HREF}
                >
                    {/* Define the tab for compare documents */}
                    <TabContent>
                        <TabPane
                            className="fade"
                            id="v-pills-compare"
                            role="tabpanel"
                            aria-labelledby="v-pills-compare-tab"
                            active={compare}
                        >
                            <Card>
                                <TabHeader
                                    headerName={COMPARE_TAB_HEADER}
                                    resetHandler={resetCompareDocuments}
                                />
                                <Card.Body>
                                    <CompareDocumentModelSelector
                                        compareModel={compareModel}
                                        compareModelHandler={setCompareModel}
                                    />
                                    <br />
                                    <CardDeck>
                                        <CompareDocumentQuery
                                            documentHeader="Document #1"
                                            languages={
                                                LANGUAGE_MAP[compareModel]
                                            }
                                            language={languageFirst}
                                            document={documentFirst}
                                            languageHandler={setLanguageFirst}
                                            documentHandler={setDocumentFirst}
                                        />
                                        <CompareDocumentQuery
                                            documentHeader="Document #2"
                                            languages={
                                                LANGUAGE_MAP[compareModel]
                                            }
                                            language={languageSecond}
                                            document={documentSecond}
                                            languageHandler={setLanguageSecond}
                                            documentHandler={setDocumentSecond}
                                        />
                                    </CardDeck>
                                    <Card className="border-0">
                                        <Card.Body className="text-center">
                                            <Button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    compareDocuments();
                                                }}
                                            >
                                                Compute Similarity
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    {compareLoading ? (
                                        <SpinnerContainer />
                                    ) : compareError ? (
                                        <AlertContainer
                                            message={compareError.message}
                                            errorResponse={
                                                compareError.errorResponse
                                            }
                                            errorStatus={
                                                compareError.errorStatus
                                            }
                                        />
                                    ) : hasCompareResponse &&
                                      compareResponse ? (
                                        <CompareResponseContainer
                                            score={compareResponse.score}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Card.Body>
                            </Card>
                        </TabPane>
                    </TabContent>

                    {/* Define the tab for search documents */}
                    <TabContent>
                        <TabPane
                            className="fade"
                            id="v-pills-search"
                            role="tabpanel"
                            aria-labelledby="v-pills-search-tab"
                            active={search}
                        >
                            <Card>
                                <TabHeader
                                    headerName={SEARCH_TAB_HEADER}
                                    resetHandler={resetSearchDocuments}
                                />

                                <Card.Body>
                                    <SearchDocumentQuery
                                        searchModel={searchModel}
                                        documentLanguage={documentLanguage}
                                        documentText={documentText}
                                        targetLanguage={targetLanguage}
                                        searchModelHandler={setSearchModel}
                                        documentLanguageHandler={
                                            setDocumentLanguage
                                        }
                                        documentTextHandler={setDocumentText}
                                        targetLanguageHandler={
                                            setTargetLanguage
                                        }
                                    />
                                    <Card className="border-0 text-center">
                                        <Card.Body>
                                            <Button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    searchSimilar();
                                                }}
                                            >
                                                Search Similar Documents
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                    {searchLoading ? (
                                        <SpinnerContainer />
                                    ) : searchError ? (
                                        <AlertContainer
                                            message={searchError.message}
                                            errorResponse={
                                                searchError.errorResponse
                                            }
                                            errorStatus={
                                                searchError.errorStatus
                                            }
                                        />
                                    ) : hasSearchResponse && searchResponse ? (
                                        <SearchResponseContainer
                                            articles={searchResponse.articles}
                                            size={searchResponse.size}
                                            targetLanguage={targetLanguage}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Card.Body>
                            </Card>
                        </TabPane>
                    </TabContent>
                </TabContainer>
            </Col>
        </Row>
    );
};

export interface Article {
    name: string;
    pageId: string;
}

export interface ErrorResponse {
    message: string;
    errorResponse?: string;
    errorStatus?: number;
}

export interface CompareResponse {
    score: number;
}

export interface SearchResponse {
    articles: Article[];
    size: number;
}

export interface Language {
    name: string;
    code: string;
}
