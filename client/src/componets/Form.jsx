import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from"react-router-dom"
import api from "../services/Api";


export default function PatientForm({isEdit}){
    const [formData,setFormData]=useState({
           dni: '',
           nombre: '',
          apellidos: '',
          direccion: '',
          localidad: '',
           telefono: ''
    });

const navigate =useNavigate()
const {dni} =useParams()

useEffect(()=>{
    if(isEdit){
        
        const loadPatient =async()=>{
    try{
        const data =await api.getBYDni(dni);
        setFormData(data)
    }catch(err){
        console.error("Error fetching patient data:",err)
    }
}

        loadPatient()
    }
},[dni,isEdit])



const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
        isEdit ? await api.update(dni,formData):await api.create(formData)
        navigate('/')

    }catch(err){
        console.error("Error fetching patient data:",err)

    }
}
const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

return(
   <form
  onSubmit={handleSubmit}
  className="max-w-xl mx-auto p-6 bg-white rounded-sm shadow-md space-y-6"
>
  <h1 className="text-3xl font-bold text-center shadow-2xl ">
    {isEdit ? "Edit" : "Create"} Patient
  </h1>

  <div className="space-y-4">
    {Object.keys(formData).map((key) => (
      <div key={key}>
        <label
          htmlFor={key}
          className="block text-sm font-medium text-gray-700 capitalize"
        >
          {key.replace("_", " ")}
        </label>
        <input
          id={key}
          type="text"
          name={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={formData[key]}
          onChange={handleChange}
          required
          disabled={isEdit && key === "dni"}
          className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isEdit && key === "dni"
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white"
          }`}
        />
      </div>
    ))}
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
  >
    Save
  </button>
</form>

)
}