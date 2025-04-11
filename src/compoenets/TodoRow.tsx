import { useEffect, useState } from "react"
import { ITodoData } from "../types"
import { MinusCircleIcon, PencilIcon } from "@heroicons/react/16/solid"
import { CLASSLIST } from "../constant"

interface ITodorow {
    index: number
    data: ITodoData
    setTodoList: (val: ITodoData) => void
    removeTodo: Function
}

export default function TodoRow(props: ITodorow){
    const [isEdit, setIsEdit] = useState(false)
    const [todo, setTodo] = useState<ITodoData>(props.data)

    useEffect(() => {
        setTodo(props.data)
    }, [props.data])

    return <main
        className={`flex flex-row justify-between h-12 shadow-md p-2`}
    >
        <div
            className={`w-1/12 flex justify-center items-center`}
        >{props.index+1}</div>
        <div
            className={`w-9/12 flex items-center`}
        >
            {
                isEdit
                ? <div className="w-full flex flex-row">
                    <input
                        autoComplete="off"
                        className={`${CLASSLIST.textInput}`}
                        value={todo.name}
                        onChange={(e) => setTodo(prev => {
                            return {...prev, name: e.target.value}
                        })}
                        type="text"
                        maxLength={64}
                    />
                    <button
                        className="mx-2 cursor-pointer hover:brightness-90 duration-200"
                        onClick={() => {
                            if(!confirm(`Are you sure to remove ${todo.name}`))
                                return
                            setIsEdit(false)
                            props.removeTodo()
                        }}
                    >
                        <MinusCircleIcon 
                            className="size-6 text-red-500"
                        />
                    </button>
                </div>
                : props.data.name
            }
        </div>
        <div
            className={`w-2/12 flex justify-around items-center`}
        >
            <input
                className="cursor-pointer"
                type="checkbox"
                checked={todo.isDone}
                name="isDone"
                onChange={(e) => setTodo(prev => {
                    props.setTodoList({...prev, isDone: e.target.checked})
                    return {...prev, isDone: e.target.checked}
                })}
            />
            <button
                className="cursor-pointer bg-white hover:brightness-90 duration-200"
                onClick={() => setIsEdit(prev => {
                    if(prev)
                        props.setTodoList(todo)
                    return !prev
                })}
            >
                <PencilIcon 
                    className="size-8 text-blue-500"
                />
            </button>
        </div>
    </main>
}