import { useEffect, useState } from "react"
import { ITodoData } from "../types"
import TodoRow from "./TodoRow";
import TodoAdd from "./TodoAdd";

export default function TodoList(){
    const [todoList, setTodoList] = useState<ITodoData[]|undefined>(() => {
        const fromSession = localStorage.getItem("todoList") ?? undefined
        if(fromSession && fromSession != "undefined"){
            return JSON.parse(fromSession)
        }
        return undefined
    });

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }, [todoList])

    return <main
        className={`bg-white p-4 flex flex-col shadow-md w-1/3 min-h-1/3 max-h-2/3 min-w-[400px]`}
    >
        <h1
            className={`text-xl`}
        >Todo list</h1>
        <TodoAdd 
            setTodoList={setTodoList}
        />
        <div
            className="overflow-auto h-full"
        >
            {
                todoList
                    ? todoList.length > 0
                        ? todoList.map((t, i) =>
                            <TodoRow
                                key={i}
                                index={i}
                                data={t}
                                setTodoList={(val) => {
                                    const temp = [...todoList]
                                    temp[i] = val
                                    temp.sort((a,b) => a.isDone ? b.isDone ? 0 : 1 : 0)
                                    setTodoList(temp)
                                }}
                                removeTodo={() => {
                                    setTodoList((prev) => prev?.filter((_, j) => j !== i))
                                }}
                            />
                        )
                        : <div className="w-full text-center mt-4">No data</div>
                    : <div className="w-full text-center mt-4">No data</div>
            }
        </div>
    </main>
}