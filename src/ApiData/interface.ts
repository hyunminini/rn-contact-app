interface ContactData {
    userNo: number;
    phoneNumber: string;
    name: string;
    email: string;
    status: string;
    deleteTime: string;
    deleteUser: string;
}

interface EditData {
    userNo: number;
    phoneNumber: string;
    name: string;
    email: string;
    status: string;
    deleteTime: string;
    deleteUser: string;
}

interface DetailData {
    detailNo: number;
    userNo: number;
    title: string;
    content: string;
    detailStatus: string;
    detailCreateTime: string;
    detailDeleteTime: string;
    detailDeleteUser: string;
    classification: string;
}

interface DeleteData {
    userNo: number;
    phoneNumber: string;
    name: string;
    email: string;
    status: string;
    deleteTime: string;
    deleteUser: string;
}

export type{
    ContactData,
    EditData,
    DetailData,
    DeleteData
}