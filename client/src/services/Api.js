import axios from "axios"
const API_URL ='http://localhost:5000/patients';
const api = {
    getAll : async ()=> (await axios.get(API_URL)).data,
    getBYDni: async(dni)=>(await axios.get(`${API_URL}/${dni}`)).data,
    create:async(patient)=>(await axios.post(API_URL,   patient)).data,
    update :async(dni,patient)=>(await axios.put(`${API_URL}/${dni}`,patient)).data,
    delete :async(dni)=>(await axios.delete(`${API_URL}/${dni}`)).data
}

export default api