import axios from "axios";

const get = (valid, setError) => {
  axios
    .get("http://localhost:3001/get")
    .then((response) => {
      valid(response.data);
    })
    .catch(() => setError("Sorry, Something went wrong!"));
};
const post = (task, setTask, newTask, sendError) => {
  axios
    .post("http://localhost:3001/add", { task: task })
    .then((response) => {
      console.log(response.data, "success from axios", task);
      setTask("");
      newTask(true);
    })
    .then(() => newTask(false))
    .catch(() => sendError("Please provide a valid task name!"));
};
const update = (newTask, taskState, updateTaskState, setError) => {
  //updates the tasks to make room for new one
  newTask &&
    axios
      .get("http://localhost:3001/get")
      .then((response) => {
        taskState &&
          updateTaskState((prev) => [
            ...response.data.filter((t) => prev.every((p) => p._id !== t._id)),
            ...prev,
          ]);
        !taskState && updateTaskState(response.data);

        //Stops the notification for New task added...
        newTask = false;
      })
      .catch(() => setError("Sorry, Something went wrong!"));
};
const editTaskPatch = (
  id,
  setError,
  changeThisTaskName,
  configureEditModeState,
  task,
  setTask
) => {
  task.length !== 0 &&
    changeThisTaskName((prev) =>
      [...prev].map((todo) =>
        todo._id === id ? { ...todo, task: task } : todo
      )
    );
  axios
    .patch(`http://localhost:3001/edit_task_name/${id}`, { task: task })
    .then((response) => {
      //------Update the local state
      console.info(
        `%cUpdated the task : ${response.data.task}`,
        "color: green;"
      );
      configureEditModeState({ isEditting: false });
      setTask("");
    })
    .catch(() => {
      task.length === 0 && setError("Please provide a valid task name");
      console.log(
        "Failed to update the task name, please provide a new task name"
      );
      configureEditModeState({ isEditting: false });
    });
};
const patch = (id, completed, setTodos, setError) => {
  //------ Update the task status to completed
  setTodos((prev) =>
    [...prev].map((todo) =>
      todo._id === id ? { ...todo, completed: !completed } : todo
    )
  );
  axios
    .patch(`http://localhost:3001/update/${id}`, { completed: !completed })
    .then((response) => {
      //------Update the local state
      console.info(
        `%cUpdated the task : ${response.data.task}`,
        "color: green;"
      );
    })
    .catch(() => setError("Sorry, the task does not exist!"));
};
const DELETE = (id, setTodos, setError) => {
  axios
    .delete(`http://localhost:3001/delete/${id}`)
    .then((response) => {
      // Delete the task status
      setTodos((prev) => [...prev].filter((todo) => todo._id !== id));
      console.info(
        `%cYou have successfully deleted the task: ${response.data.task}`,
        "color: green;"
      );
    })
    .catch(() => setError("Couldn't Delete the unknown task!"));
};

const ops = {
  GET: get,
  POST: post,
  UPDATE: update,
  PATCH: patch,
  DELETE,
  PATCH_New_Task: editTaskPatch,
};
export default ops;
