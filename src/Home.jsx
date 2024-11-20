import { useState, useEffect } from "react";
import Create from "./Create";
import Task from "./Task";
import ops from "./axiosCrudOp";
import Error from "./Error";
import animate from "./animate/animate.module.css";
import { BsSun, BsMoon } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();
  const [editMode, setEditMode] = useState({ isEditting: false });
  const [lightMode, setLightMode] = useState({
    isLightMode: true,
    state: "light_mode",
  });

  useEffect(() => {
    //gets all the existing tasks when the page is loaded
    ops.GET(setTodos, setError);
  }, []);
  const changeErrorState = (val) => setError(val);

  const editTaskName = (taskDetails) =>
    setEditMode((prev) => {
      return { ...prev, isEditting: true, ...taskDetails };
    });
  //Takes action when a new task was added
  const addTask = (task) => ops.UPDATE(task, todos, setTodos, setError);
  //Takes action when a change is made to a task
  const handleEdit = (id, completed) =>
    ops.PATCH(id, completed, setTodos, setError);
  //Delete a task
  const handleDelete = (id) => ops.DELETE(id, setTodos, setError);

  const modeHandler = () => {
    if (lightMode.isLightMode) {
      setLightMode((prev) => {
        return { ...prev, isLightMode: false, state: "dark_mode" };
      });
    } else {
      setLightMode((prev) => {
        return { ...prev, isLightMode: true, state: "light_mode" };
      });
    }
  };
  return (
    <div className={`home ${animate.home} ${lightMode.state}`}>
      <div className={`Title ${animate.title}`}>
        <span className={animate.letters}>T</span>
        <span className={animate.letters}>O</span>
        <span className={animate.letters}></span>
        <span className={animate.letters}>D</span>
        <span className={animate.letters}>O</span>
        <span className={animate.letters}>s</span>
      </div>
      <br />
      <br />
      <br />
      <Create
        newTask={addTask}
        sendError={changeErrorState}
        editMode={editMode}
        changeThisTaskName={setTodos}
        configureEditModeState={setEditMode}
        handleError={setError}
      />
      {error && <Error message={error} clearError={changeErrorState} />}
      {todos.length === 0 ? (
        <div className={animate.null_task}>No Task Available</div>
      ) : (
        todos.map((todo) => (
          <Task
            className={`task-${lightMode.state}`}
            key={todo._id}
            taskRef={todo}
            isCompleted={todo.completed}
            task={todo.task}
            handlers={{
              handleEdit,
              handleDelete,
            }}
            editTaskName={editTaskName}
          />
        ))
      )}
      <span className="mode" onClick={modeHandler}>
        {!lightMode.isLightMode && <BsSun className="icon" color="white" />}
        {lightMode.isLightMode && <BsMoon className="icon" />}
      </span>
    </div>
  );
}

export default Home;
