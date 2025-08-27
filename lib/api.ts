
import axios from 'axios'

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 1000,
})


export const getInsects = () => {
  return api.get("/insects").then((response) => {
        return response.data
  })
}

export const getDevAnimals = () => {
  return api.get("/dev_animals").then((response) => {
        return response.data
  })
}
  
