import React, { lazy, Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Items } from "./components/Data";
import LoginPage from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";

const Product = lazy(() => import("./components/Product"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const SearchItem = lazy(() => import("./components/SearchItem"));
const Cart = lazy(() => import("./components/Cart"));

const App = () => {
    const [data, setData] = useState([...Items]);
    const [cart, setCart] = useState([]);

    return (
        <Router>
            <Navbar cart={cart} setData={setData} />
            <Suspense fallback={<h3>Loading...</h3>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Product cart={cart} setCart={setCart} items={data} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <PrivateRoute>
                                <ProductDetails cart={cart} setCart={setCart} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/search/:term"
                        element={
                            <PrivateRoute>
                                <SearchItem cart={cart} setCart={setCart} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <Cart cart={cart} setCart={setCart} />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
