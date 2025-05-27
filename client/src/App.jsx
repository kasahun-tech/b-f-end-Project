import { Route, Routes } from "react-router-dom"
import PatientTable from "./componets/Table.jsx"
import PatientForm from "./componets/Form.jsx"

function App(){
  return(
     <Routes>
      <Route path="/" element={<PatientTable/>}/>
      <Route path="/create" element={<PatientForm isEdit={false}/>}/>
      <Route path="/edit/:dni" element={<PatientForm isEdit={true}/>}/>
     </Routes>
  )
}
export default App