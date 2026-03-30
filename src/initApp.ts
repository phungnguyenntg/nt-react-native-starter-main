import { initDB } from './storage/sqliteStorage';

export const initApp = async () => {
    try {
        initDB();
        // const user = await getUser();
        // if (user) {
        //   store.dispatch(setUser(user));
        // }
        return true;
    } catch (err) {
        console.error('App init failed', err);
        return false;
    }
};