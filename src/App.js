import githubLogo from './images/github.svg';
import twitterLogo from './images/twitter.svg';

import { useEffect, useCallback } from 'react';

import SearchForm from './SearchForm';
import { fetchAllProjects, searchProjects } from './api';
import useAsync from './use-async';

function App() {
  const { status, data, run, error } = useAsync();

  useEffect(() => {
    run(fetchAllProjects());
  }, [run]);

  const onSearch = useCallback(
    (option) => {
      run(searchProjects(option));
    },
    [run]
  );

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
              href="https://twitter.com/zifkage"
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
        <SearchForm isLoading={status === 'pending'} onSearch={onSearch} />
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
          {status === 'resolved' &&
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
      </section>
    </>
  );
}

export default App;
