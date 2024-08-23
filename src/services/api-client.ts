import axios from "axios"; // handles http addresses

export default axios.create({ // export the axios instance
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '9840c53cf4834feca33b755cecacc3ed' // this key will be in the query stream of every http request we send to backend
    }
})