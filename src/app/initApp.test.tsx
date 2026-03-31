import { initApp } from './initApp';
import { initDB } from '../storage/sqliteStorage';

// Mock initDB
jest.mock('../storage/sqliteStorage', () => ({
  initDB: jest.fn(),
}));

describe('initApp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls initDB and returns true on success', async () => {
    (initDB as jest.Mock).mockImplementation(() => {});

    const result = await initApp();

    expect(initDB).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('returns false when initDB throws error', async () => {
    (initDB as jest.Mock).mockImplementation(() => {
      throw new Error('DB failed');
    });

    const result = await initApp();

    expect(initDB).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  it('logs error when init fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    (initDB as jest.Mock).mockImplementation(() => {
      throw new Error('DB failed');
    });

    await initApp();

    expect(consoleSpy).toHaveBeenCalledWith(
      'App init failed',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});