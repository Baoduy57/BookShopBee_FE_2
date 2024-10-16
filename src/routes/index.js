import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

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
    path: "/PaymentPage",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/OrderSuccess",
    page: OrderSuccess,
    isShowHeader: true,
  },
  {
    path: "/MyOrderPage",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/Details-Order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
  {
    path: "/ProductPage",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/product/:type",
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
    path: "/Product-Details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/Profile-User",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/System/Admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
