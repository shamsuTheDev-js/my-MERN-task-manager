import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ops from "./axiosCrudOp";

const Create = ({
  newTask,
  sendError,
  editMode,
  changeThisTaskName,
  configureEditModeState,
  handleError,
}) => {
  const [task, setTask] = useState("");
  useEffect(() => {
    editMode.isEditting && inputRef.current.focus();
  }, [editMode]);

  const inputRef = useRef(null);

  //  Request to add a new task or edit an existing Task and notifies the list of tasks if valid
  const handleEditTask = () =>
    ops.PATCH_New_Task(
      editMode._id,
      handleError,
      changeThisTaskName,
      configureEditModeState,
      task,
      setTask
    );
  const handleAddTask = () => ops.POST(task, setTask, newTask, sendError);

  const inputProps = {
    type: "text",
    name: "task-add",
    value: task,
    placeholder: editMode.task || "Enter Your Task Here",
    onFocus: () => sendError(false),
    onChange: (e) => setTask(e.target.value),
  };

  return (
    <div className="create_form">
      <input
        {...inputProps}
        ref={inputRef}
        onClick={() => editMode.isEditting && setTask(editMode.task)}
      />
      {editMode.isEditting ? (
        <button type="submit" onClick={handleEditTask}>
          Edit
        </button>
      ) : (
        <button type="submit" onClick={handleAddTask}>
          Add
        </button>
      )}
    </div>
  );
};

Create.propTypes = {
  newTask: PropTypes.func.isRequired,
  sendError: PropTypes.func.isRequired,
  editMode: PropTypes.object.isRequired,
  changeThisTaskName: PropTypes.func.isRequired,
  configureEditModeState: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default Create;
