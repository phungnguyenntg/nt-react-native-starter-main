// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/features': './src/features',
          '@/hooks': './src/hooks',
          '@/services': './src/services',
          '@/store': './src/store',
          '@/utils': './src/utils',
          '@/types': './src/types',
          '@/icons': './src/assets',
        },
      },
    ],
  ],
};