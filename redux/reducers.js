import { combineReducers } from 'redux';

import auth from './features/auth-slice';

const reducers = combineReducers({
    auth,
})

export default reducers;