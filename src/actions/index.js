import * as types from './actionTypes';

export const _create = (data) => {
    return {
        type: types._CREATE,
        info: data
    }
}