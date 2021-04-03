import githubLogo from './images/github.svg';
import twitterLogo from './images/twitter.svg';

import { useEffect, useCallback, useReducer } from 'react';

import SearchForm from './SearchForm';
import { fetchAllProjects, searchProjects } from './api';
import Button from './Button';

function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { status: 'fetching', data: null, error: null };
    case 'FETCH_MORE_INIT':
      return { ...state, status: 'fetching more', error: null };
    case 'FETCH_SUCCESS':
      return { status: 'resolved', data: action.data, error: null };
    case 'FETCH_MORE_SUCCESS':
      return {
        status: 'resolved',
        data: {
          ...action.data,
          project: [...state.data.project, ...action.data.project],
        },
      };
    case 'FETCH_FAILURE':
      return { ...state, status: 'rejected', error: action.error };
    default:
      break;
  }
}

function App() {
  const [{ status, data, error }, dispatch] = useReducer(appReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' });
    fetchAllProjects().then(
      (data) => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }, []);

  const onSearch = useCallback((option) => {
    dispatch({ type: 'FETCH_INIT' });
    searchProjects(option).then(
      (data) => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }, []);

  function fetchMore() {
    dispatch({ type: 'FETCH_MORE_INIT' });
    data.fetchMore().then(
      (data) => {
        dispatch({ type: 'FETCH_MORE_SUCCESS', data });
      },
      (error) => {
        dispatch({ type: 'FETCH_FAILURE', error });
      }
    );
  }

  return (
    <>
      <header className="header">
        <nav className="container container--px flex flex-jc-sb flex-ai-c">
          <div className="header__appname">
            <a href="/">HappyGiving</a>
          </div>
          <div className="header__links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/nazifbara"
            >
              <img alt="github logo" src={githubLogo} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/nazifbara"
            >
              <img alt="twitter logo" src={twitterLogo} />
            </a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__image"></div>
        <div className="hero__text container container--px">
          <h1>Find a charity</h1>
          <p>
            Charity is the most generous thing we can do in our lives. A helping
            hand to those in need will always bless you. Don’t shy away from
            giving, price doesn’t matter. What matters is how big is your heart.
          </p>
        </div>
      </section>
      <section className="search container container--pall">
        <SearchForm isLoading={status === 'fetching'} onSearch={onSearch} />
      </section>
      {error && (
        <span className="error-message">
          {error.message === 'Network Error'
            ? 'Check your internet connection'
            : 'Something went wrong...'}
        </span>
      )}
      <section className="container container--pall">
        <div className="card__grid">
          {(status === 'resolved' || status === 'fetching more') &&
            data.project.map((p) => (
              <a
                key={`project-${p.id}`}
                href={p.projectLink}
                target="_blank"
                rel="noreferrer"
                className="card"
              >
                <div className="flex flex-ai-c">
                  <img className="card__image" alt="" src={p.imageLink} />
                  <span className="card_title">{p.title}</span>
                </div>

                <p className="card__body">{p.summary}</p>
              </a>
            ))}
        </div>
        {data && data.fetchMore && (
          <Button
            isLoading={status === 'fetching more'}
            type="outlined"
            onClick={fetchMore}
            style={{ margin: '0 auto', display: 'block' }}
          >
            Show more
          </Button>
        )}
      </section>
    </>
  );
}

export default App;
