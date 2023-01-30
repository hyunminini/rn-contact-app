import axios from 'axios';
import React from 'react';
// import UsersApi from '@api/BooksApi';
import Types from '../../ActionConstant';

const UsersAction = {
    getUserList: () => async dispatch => {
        dispatch({ type: Types.GET_USERS });

        try {
            const result = await axios.get(
                'http://172.30.1.92:8080/contact/all',
            );

            console.log(result);

            dispatch({
                type: Types.GET_USERS_SUCCESS,
                payload: result.data,
            });
        } catch (error) {
            dispatch({
                type: Types.GET_USERS_FAILURE,
                payload: error.message,
            });
        }
    },
};

export default UsersAction;
