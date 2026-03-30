export type RootStackParamList = {
  LogIn: undefined;
  MainTab: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  WishListTab: undefined;
  OrderTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: number };
    Cart: undefined;
}

export type WishListStackParamList = {
    WishList: undefined;
    ProductDetail: { productId: number };
}

export type ProfileStackParamList = {
    Profile: undefined;
    Setting: undefined;
}