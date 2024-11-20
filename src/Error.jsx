import PropTypes from "prop-types";
import { BsXCircleFill } from "react-icons/bs";
import animate from "./animate/animate.module.css";

const Error = ({ message, clearError }) => {
  const handleClick = () => {
    clearError(false);
  };
  return (
    <div className={`task error ${animate.error}`}>
      Error : {message}
      <span>
        <BsXCircleFill onClick={handleClick} className={animate.button} />
      </span>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default Error;
