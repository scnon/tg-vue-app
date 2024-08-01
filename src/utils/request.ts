import axios from 'axios'

const request = axios.create({
    baseURL: 'https://test-server.huione.life/app-api',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    config.headers['tenant-id'] = '1'
    return config
})

request.interceptors.response.use(
    (response) => {
        const data = response.data
        return data['data']
    },
    (error) => {
        let msg = ''
        const code = error.response.status
        switch (code) {
            case 500:
                msg = '请求错误'
                break
        }
        console.log(msg)
        return Promise.reject(error)
    }
)

export default request
