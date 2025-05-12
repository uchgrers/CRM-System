import './App.css'
import {Route, Routes} from "react-router-dom"
import TodosPage from "./pages/TodosPage/TodosPage"

function App() {

    return (
        <Routes>
            <Route path='/'
                   element={<TodosPage/>}/>
            <Route path='/todos'
                   element={<TodosPage/>}/>
            <Route path='/*' element={<div>Not found</div>}/>
        </Routes>
    )
}

export default App
