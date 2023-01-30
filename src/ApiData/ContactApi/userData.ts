import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { API_URL } from "@env";

const fetchUsers = () => {
    return axios.get(`${API_URL}/contact/all`);
};

const editUsers = ({userNo, name, phoneNumber, email}:any) => {
    return axios.put(`${API_URL}/contact/${userNo}`, {userNo, name, phoneNumber, email})
}

export const useUsers = ({ onSuccess, onError }:any) => {
    return useQuery("userList", fetchUsers, {
        staleTime: 300,
        onSuccess,
        onError
    });
};

export const useUserEdit = ({ onSuccess, onError }:any) => {
    return useQuery("userList", editUsers, {
        staleTime: 300,
        onSuccess,
        onError
    });
};

