import {store} from '../store/index';
import {rootReducer} from '../store/root-reducer';

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;