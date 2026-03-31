import { initDB } from '../storage/sqliteStorage';

export const initApp = async () => {
    try {
        await initDB();
        return true;
    } catch (err) {
        console.error('App init failed', err);
        return false;
    }
};