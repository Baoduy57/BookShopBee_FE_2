import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/OrderPage",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/ProductPage",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/Sign-In",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/Sign-Up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/Product-Details",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/Profile-User",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
