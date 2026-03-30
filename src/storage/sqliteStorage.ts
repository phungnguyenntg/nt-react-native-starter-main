import { open } from 'react-native-quick-sqlite';
import { User } from '@/types/user';

const db = open({
  name: 'AppDB.db',
});

export const initDB = () => {
  try {
    db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT,
        email TEXT,
        age INTEGER,
        role TEXT,
        firstName TEXT,
        lastName TEXT,
        createdAt TEXT,
        updatedAt TEXT
      );
    `);

    console.log('DB initialized');
  } catch (err) {
    console.log('initDB error:', err);
  }
};

export const saveUser = (user: User) => {
  try {
    db.execute(
      `INSERT OR REPLACE INTO users
      (id, username, email, age, role, firstName, lastName, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.username,
        user.email,
        user.age,
        user.role,
        user.firstName,
        user.lastName,
        user.createdAt,
        user.updatedAt,
      ]
    );

    console.log('User saved');
  } catch (err) {
    console.log('saveUser error:', err);
  }
};

export const getUser = (): User | null => {
  try {
    const result = db.execute(`SELECT * FROM users LIMIT 1`);

    if (result && result.rows && result.rows.length > 0) {
      return result.rows.item(0) as User;
    }

    return null;
  } catch (err) {
    console.log('getUser error:', err);
    return null;
  }
};

export const deleteUser = () => {
  try {
    db.execute(`DELETE FROM users`);
    console.log('User deleted');
  } catch (err) {
    console.log('deleteUser error:', err);
  }
};

export const logCurrentUser = () => {
  try {
    const result = db.execute(`SELECT * FROM users LIMIT 1`);

    if (result && result.rows && result.rows.length > 0) {
      console.log('Current user from SQLite:', result.rows.item(0));
    } else {
      console.log('No user found');
    }
  } catch (err) {
    console.log('logCurrentUser error:', err);
  }
};