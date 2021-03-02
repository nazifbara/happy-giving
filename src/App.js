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
        <form>
          <label htmlFor="criteria">Choose a search criteria</label>
          <select>
            <option>----------</option>
            <option>Theme</option>
            <option>Organization home country</option>
            <option>Country served</option>
          </select>
          <button className="button">Search</button>
        </form>
      </section>
    </>
  );
}

export default App;
