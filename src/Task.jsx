import PropTypes from "prop-types";
import { useState } from "react";
import {
  BsCircle,
  BsFillTrashFill,
  BsCheckCircle,
  BsPencil,
} from "react-icons/bs";

const Task = ({
  className,
  taskRef,
  isCompleted,
  task,
  handlers,
  editTaskName,
}) => {
  const [hoverState, setHoverState] = useState(false);

  const editTaskHandler = (task) => {
    editTaskName(task);
  };
  return (
    <div
      key={taskRef._id}
      className={`task ${className} ${isCompleted ? "completed" : ""}`}
      onDoubleClick={() => editTaskHandler(taskRef)}
      onPointerOver={() => setHoverState(true)}
      onPointerOut={() => setHoverState(false)}
    >
      <div
        className="checkbox"
        onClick={() => handlers.handleEdit(taskRef._id, isCompleted)}
      >
        {isCompleted ? (
          <BsCheckCircle className="icon" />
        ) : (
          <BsCircle className="icon" />
        )}
        <p className={isCompleted ? "blur" : ""}>{task}</p>
      </div>
      <div>
        {hoverState && (
          <span className="change" onClick={() => editTaskHandler(taskRef)}>
            <BsPencil className="icon" />
          </span>
        )}
        <span onClick={() => handlers.handleDelete(taskRef._id)}>
          <BsFillTrashFill className="icon delete" />
        </span>
      </div>
    </div>
  );
};

Task.propTypes = {
  className: PropTypes.string,
  taskRef: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  task: PropTypes.string.isRequired,
  handlers: PropTypes.object.isRequired,
  editTaskName: PropTypes.func.isRequired,
};

export default Task;
