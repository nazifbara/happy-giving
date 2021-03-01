import githubLogo from './images/github.svg';
import twitterLogo from './images/twitter.svg';

function App() {
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
    </>
  );
}

export default App;
