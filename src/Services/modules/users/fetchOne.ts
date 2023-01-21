import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
    build.query<User, string>({
        query: id => `/users/all`,
    })

export type User = {
    phonenumber: string
    name: string
    email: string
}