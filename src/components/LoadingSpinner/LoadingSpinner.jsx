// Special thaks to https://twitter.com/tobiasahlin for making this spinner

import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
  );
}

export default LoadingSpinner;
