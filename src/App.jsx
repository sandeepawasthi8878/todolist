import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
    const [title, settitle] = useState("");
    const [tasks, settasks] = useState([]);

    const TaskHandler = (e) => {
        e.preventDefault();
        const newtask = { id: nanoid(), title, isCompleted: false };

        const copytasks = [...tasks];
        copytasks.push(newtask);
        settasks(copytasks);

        // settasks([...tasks, newtask])

        settitle("");
        toast.success("Task Created In Pending Queue");
    };

    const CompleteToggler = (index) => {
        const copyTasks = [...tasks];
        copyTasks[index].isCompleted = !copyTasks[index].isCompleted;
        settasks(copyTasks);
    };

    const DeleteHandler = (index) => {
        const copyTasks = [...tasks];
        if (!copyTasks[index].isCompleted) {
            if (
                confirm(
                    "Task is incomplete, are you sure to delete this task ?"
                )
            ) {
                copyTasks.splice(index, 1);
                settasks(copyTasks);
            } else {
                return;
            }
        } else {
            copyTasks.splice(index, 1);
            settasks(copyTasks);
        }
    };

    let tasksrender = (
        <h1 className="mt-10 font-extrabold text-red-400 text-center text-3xl">
            No Pending Tasks
        </h1>
    );
    if (tasks.length > 0) {
        tasksrender = tasks.map((task, index) => {
            return (
                <li
                    key={task.id}
                    className="mb-5 flex justify-between items-center border rounded-xl p-5"
                >
                    <div className="flex items-center">
                        <div
                            onClick={() => CompleteToggler(index)}
                            className={`mr-4 rounded-full w-[30px] h-[30px] ${
                                task.isCompleted
                                    ? "bg-green-400"
                                    : "border border-orange-600"
                            } `}
                        ></div>
                        <h1
                            className={`${
                                task.isCompleted ? "line-through" : ""
                            } text-2xl font-extrabold text-yellow-100`}
                        >
                            {task.title}
                        </h1>
                    </div>
                    <div className="flex gap-3 text-2xl text-yellow-100">
                        <i className="ri-file-edit-line"></i>
                        <i
                            onClick={() => DeleteHandler(index)}
                            className="ri-delete-bin-3-line"
                        ></i>
                    </div>
                </li>
            );
        });
    }

    return (
        <div className=" border-t-2 w-screen h-screen bg-zinc-800 flex  items-center flex-col">
            <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-4xl font-extrabold flex justify-center items-center w-[8vmax] h-[8vmax] rounded-full bg-orange-600">
                    {tasks.filter((t) => t.isCompleted === true).length}/
                    {tasks.length}
                </div>
            </div>

            {/*  */}

            <form
                onSubmit={TaskHandler}
                className="w-[25%] flex justify-between px-5 my-[2%]"
            >
                <input
                    placeholder="write your next task..."
                    className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700 "
                    type="text"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                />

                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>

            {/*  */}

            <ul className="list-none w-[25%] ">{tasksrender}</ul>
        </div>
    );
};

export default App;
