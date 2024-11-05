// "use client";

import { withRouter } from "next/router";
import React from "react";

interface TaskData {
  id: number,
  task: string,
  createDate: Date,
  editDate: Date | "",
  endDate: Date | "",
}

interface TaskProps {
  dataProps: {
    id: number,
    task: string,
    createDate: Date,
    editDate: Date | "",
    endDate: Date | "",
  },
  setTask: (arr: TaskData[]) => void,
  allData: TaskData[]
}


export default function Task(props: TaskProps) {
  const { dataProps, setTask, allData } = props;
  const arrData = [...allData];

  const handleDelete = () => {
    let foundIndex = findIndex();

    if(foundIndex < 0) {
      console.log("not found");
      return;
    }else {
      arrData.splice(foundIndex,1);

      for(let i = 0, j = arrData.length; i < arrData.length; i++, j--) {
        arrData[i].id = j;
      }

      setTask(arrData);
    }
  }
  
  const findIndex = (): number => {
    let arrDataLen = arrData.length;
    let first = 0;
    let last = arrDataLen - 1;

    while(first <= last) {
      let mid = Math.floor((first + last) / 2);
      if(arrData[mid].id == dataProps.id) {
        return mid;
      }else if(dataProps.id > arrData[mid].id) {
        last = mid - 1;
      }else {
        first = mid + 1;
      }
    }

    return -1;
  }

  const fixIDs = () => {
    console.log(arrData);
  }

  const returnFormateDate = (value: Date): string => {
    return new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  return (
    <li className="mb-8">
      <div className="flex items-center">
        <label htmlFor={"task" + dataProps.id} className="flex-grow w-full cursor-pointer flex items-center group">
          <input type="checkbox" className="cursor-pointer" name="task" id={"task" + dataProps.id} />

          <div className="flex justify-between grow">
            <span className="text-base group-has-[:checked]:line-through">{dataProps.task}</span>
          </div>
        </label>

        <div className="flex gap-4 shrink-0">
          <button className="text-xs cursor-pointer">Edit</button>
          <button className="text-xs cursor-pointer" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="grow flex justify-between items-center"></div>

      <p className="text-xs text-end capitalize">{(!dataProps.editDate && dataProps.editDate != "") ? returnFormateDate(dataProps.editDate) : returnFormateDate(dataProps.createDate)}</p>
    </li>
  );
}