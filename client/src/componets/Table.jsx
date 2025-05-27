import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/Api.js"

export default function PatientTable() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setPatients(await api.getAll());
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDelete = async (dni) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(dni);
      fetchPatients();
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>

      <h1 className='text-3xl font-bold'>Patients</h1>
      <button onClick={() => navigate('/create')} className='bg-blue-600 text-white mb-3 mt-2 px-4 py-2 rounded hover:bg-blue-700 transition-colors'>New Patient</button>
      <table className='min-4-full bg-white border border-gray-200'>
        <thead className='bg-gray-100 text-gray-700 text-left'>
          <tr>
            <th className='px-4 py-2 border-b'>DNI</th>
            <th className='px-4 py-2 border-b'>NOMBRE</th>
            <th className='px-4 py-2 border-b'>APELLIDO</th>
            <th className='px-4 py-2 border-b'>DIRECCION</th>
            <th className='px-4 py-2 border-b'>LOCALIDAD</th>
            <th className='px-4 py-2 border-b'>TELEFONO</th>
            <th className='px-4 py-2 border-b'>Actions</th>
            </tr>
        </thead>
        <tbody>
          {patients.map(({ dni, nombre,apellidos ,direccion,localidad,telefono}) => (
            <tr key={dni} className='hover:bg-gray-50'>
              <td className='px-4 py-2 border-b'>{dni}</td>
              <td className='px-4 py-2 border-b'>{nombre}</td>
              <td className='px-4 py-2 border-b'>{apellidos}</td>
              <td className='px-4 py-2 border-b'>{direccion}</td>
              <td className='px-4 py-2 border-b'>{localidad}</td>
              <td className='px-4 py-2 border-b'>{telefono}</td>

              <td className='px-4 py-2 border-b space-x-2'>
                <button onClick={() => navigate(`/edit/${dni}`)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(dni)}className="bg-red-400 hover:bg-yellow-500 text-white px-3 py-1 rounded" >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
