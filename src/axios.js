import axios from "axios";

/**base url*/

const instance = axios.create({
  baseURL:"https://finance-backend-test.herokuapp.com",
  // baseURL:'http://localhost:9000/'
});

export default instance;