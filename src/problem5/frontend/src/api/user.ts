import axios from "axios";

const domain = 'http://localhost:5000';

export const createUserApi = async (formData: any) => {
    const res = await axios({
        method: "post",
        url: `${domain}/api/users`,
        data: formData
    })

    return res;

}

export const getAllUserApi = async (age: string, salary: string) => {
    console.log(age, salary);
    const res = await axios({
        method: "get",
        url: `${domain}/api/users`,
        params: { age, salary }
    })

    return res.data;

}

export const getDetailUser = async (id: any) => {
    const res = await axios({
        method: "get",
        url: `${domain}/api/users/${id}`,
    })

    return res.data;
}

export const updateUserApi = async (id: any, user: any) => {
    const res = await axios({
        method: "put",
        url: `${domain}/api/users/${id}`,
        data: user
    })

    return res.data;
}

export const deleteUserApi = async (id: any) => {
    const res = await axios({
        method: "delete",
        url: `${domain}/api/users/${id}`,
    })

    return res.data;
}