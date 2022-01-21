import Loader from "react-loader-spinner";

const Spin = () => {
  return (
    <div
      className="loader-styles"
      style={{ position: "absolute", left: "50%", top: "50%" }}
    >
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        visible={true}
      />
    </div>
  );
};
export default Spin;
