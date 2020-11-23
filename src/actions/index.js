import * as types from './actionTypes';

export const _createAccount = (data) => {
    return {
        type: types._CREATEACCOUNT,
        info: data
    }
}

export const _loggedin = (data) => {
    return {
        type: types._LOGGEDIN,
        info : data
    }
}

export const _createProject = (data) => {
    return {
        type: types._CREATEPROJECT,
        info : data
    }
}