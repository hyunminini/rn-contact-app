import Types from '../../ActionConstant';

const initialState = {
    isLoading: false,
    contactInfo: [],
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.GET_USERS:
            return {
                ...state,
                isLoading: true,
            };

        case Types.GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contactInfo: [...payload],
            };

        case Types.GET_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                contactInfo: {
                    error: payload,
                },
            };

        default:
            return { ...state };
    }
};

export default reducer;
