import httpClient from "../libs/api.js";

const BASE_USER_API = '/api/users';
const userService = {
    async getProfile() {
        const {data} = await httpClient.get(BASE_USER_API + '/me', {
        });
        return data;
    },
}



export default userService;