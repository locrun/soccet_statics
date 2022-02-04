import Loader from "react-loader-spinner";
import "./index.css";
const Spin = () => {
  return (
    <div className="loader-styles">
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
