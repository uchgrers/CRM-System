import './App.css'
import {Route, Routes} from "react-router-dom"
import TodosPage from "./pages/TodosPage/TodosPage"

// assets - иконки, картинки и тд
// заменить перечисления на enum
// имена типам давать в соответствии с докумнентацией
// сделать мини ui либу (ui kit)

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
