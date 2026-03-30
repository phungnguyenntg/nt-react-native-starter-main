export type TabType = 'signin' | 'signup';

export const TABS = [
    { key: 'signin', label: 'Login' },
    { key: 'signup', label: 'Sign Up' },
] as const;