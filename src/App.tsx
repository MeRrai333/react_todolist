import './App.css'
import TodoList from './compoenets/TodoList'
import { COLORS } from './constant'

function App() {
  return (
    <main
      className={`${COLORS.bg.primary} h-screen w-screen flex justify-center items-center`}
    >
      <TodoList />
    </main>
  )
}

export default App
