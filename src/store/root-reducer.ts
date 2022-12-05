import {combineReducers} from '@reduxjs/toolkit';
import { chipProcess } from './chips-process/chips-process';

export const rootReducer = combineReducers({
    'chips': chipProcess.reducer,
});
