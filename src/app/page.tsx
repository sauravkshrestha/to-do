// import Image from "next/image";
"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Task from "./components/Task";

interface TaskData {
  id: number,
  task: string,
  createDate: Date,
  editDate: Date | "",
  endDate: Date | "",
}

async function getTasks(): Promise<TaskData[]> {
  let localData: string | null = await localStorage.getItem("tasks");

  if(localData != "" && localData != null) {
    let taskArray: TaskData[] = await JSON.parse(localData);
    return taskArray;
  }

  return [];
}

export default function Home() {
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");

  useEffect(() => {
    const data = getTasks();
    data.then(response => {
      setTaskData(response);
    });
  }, []);

  const setTask = (taskArray: TaskData[]): void => {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    setTaskData(taskArray);
  }

  const taskElement = taskData.map(data => {
    return <Task dataProps={data} setTask={setTask} allData={taskData} key={data.id} />
  });

  const handleAdd = (): void => {
    if(taskInput) {
      const nowDate = new Date();

      const newData: TaskData[] = [{
        id: taskData.length + 1,
        task: taskInput,
        createDate: nowDate,
        endDate: "",
        editDate: ""
      }, ...taskData];

      setTaskInput("");
      setTask(newData);
    }
  }

  return (
    <div className="body-wrapper min-h-dvh flex flex-col justify-between">
      <div className="body-top">
        <Header />

        <main className="main" id="main">
          <div className="todo">
            <div className="container mx-auto">
              <div className="todo-wrapper">
                <h2 className="text-2 text-center">My TODO</h2>

                <div className="todo-body w-1/2 mx-auto">
                  <div className="todo-input relative mb-[50px]">
                    <input type="text" className="text-black w-full h-full p-2.5 outline-none rounded" value={taskInput} onChange={(e) => { setTaskInput(e.target.value) }} />

                    <div className="absolute top-[50%] right-[20px] -translate-y-1/2 z-10">
                      <button className="bg-green-600 px-6 py-0.5 rounded-sm" onClick={handleAdd}>ADD</button>
                    </div>
                  </div>

                  <ul className="">
                    {taskElement}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
