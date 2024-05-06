import "../Styles/Loading.scss"

function Loading() {
  return (
    <div className="LoadingContainer">
      <img className="LoadingImg" alt="loading" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F2400px%2Fsvg_to_png%2F22144%2FSteren-Futurist-circle.png&f=1&nofb=1&ipt=de6ec52acaeaf8bd865ccf026d21bcf2225f5126e303708dcf80555398db8c9c&ipo=images" />
      <h4 className="LoadingText">Loading...</h4>
    </div>
  );
}
export default Loading;
