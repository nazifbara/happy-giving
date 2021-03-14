import spinner from './images/oval.svg';

function Button({ isLoading, type = 'solid', children, ...otherProps }) {
  return (
    <button className={`button ${type}`} {...otherProps}>
      {isLoading ? (
        <img
          className="spinner"
          style={{ color: 'red' }}
          alt=""
          src={spinner}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
