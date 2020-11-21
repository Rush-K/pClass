import * as types from './actionTypes';

export const _createAccount = (data) => {
    return {
        type: types._CREATEACCOUNT,
        info: data
    }
}