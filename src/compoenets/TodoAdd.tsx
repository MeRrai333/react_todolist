import { useState } from "react"
import { CLASSLIST } from "../constant"
import { ITodoData } from "../types"

interface ITodoAdd {
    setTodoList: React.Dispatch<React.SetStateAction<ITodoData[] | undefined>>
}

export default function TodoAdd(props: ITodoAdd){
    const [name, setName] = useState("")

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(name == ""){
            alert("Can't insert empty name")
            return
        }
        props.setTodoList(prev => {
            const newValue = {
                name: name,
                isDone: false
            }
            if(prev){
                const temp = [
                    ...prev,
                    newValue
                ]
                temp.sort((a,b) => a.isDone ? b.isDone ? 0 : 1 : 0)
                return temp
            }
            return [newValue]
        })
        setName("")
    }

    return <form
        onSubmit={onSubmit}
        className={`flex flex-row justify-between h-12 shadow-md p-2`}
    >
        <div
            className={`w-1/12 flex justify-center items-center`}
        ></div>
        <div
            className={`w-9/12 flex items-center`}
        >
            <input
                autoComplete="off"
                className={`${CLASSLIST.textInput}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if(e.key === 'Enter')
                        setName((e.target as HTMLInputElement).value)
                }}
                type="text"
                name="name"
                maxLength={64}
            />
        </div>
        <div
            className={`w-2/12 flex justify-center items-center`}
        >
            <button
                type="submit"
                className={`${CLASSLIST.submit}`}
            >
                Add
            </button>
        </div>
    </form>
}