import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Items } from "./Data";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

const Navbar = ({ setData, cart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });

  const [user] = useAuthState(auth); // Отслеживаем состояние пользователя

  const filterByCategory = (category) => {
    const items = Items.filter((product) => product.category === category);
    setData(items);
  };

  const filterByPriceRange = () => {
    const items = Items.filter(
        (product) =>
            product.price >= priceRange.min && product.price <= priceRange.max
    );
    setData(items);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleLogout = () => {
    signOut(auth); // Выход из аккаунта
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
      <>
        <header className="sticky-top">
          <div className="nav-bar">
            <Link aria-label="logo" to="/" className="brand">
              <h1>Techno store</h1>
            </Link>
            <form onSubmit={handleSubmit} className="search-bar">
              <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Products..."
              />
            </form>

            <Link to="/cart" aria-label="cart" className="cart">
              <button type="button" className="btn btn-primary position-relative">
                <BsFillCartCheckFill size={"2rem"}/>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                  <span className="visually-hidden">unread messages</span>
              </span>
              </button>
            </Link>
            <div className="auth-section">
              {user ? (
                  <>
                    <span className="user-name">Добро пожаловать, {user.email}</span>
                    <button onClick={handleLogout} className="btn btn-secondary">
                      Выйти
                    </button>
                  </>
              ) : (
                  <button
                      onClick={() => navigate("/login")}
                      className="btn btn-primary"
                  >
                    Увійти
                  </button>
              )}
            </div>
          </div>

          {location.pathname === "/" && (
              <div className="nav-bar-wrapper">
                <div className="items">Фільтрувати за {"->"}</div>
                <div className="items" onClick={() => setData(Items)}>
                  Скинути філтри
                </div>
                <div className="items" onClick={() => filterByCategory("mobiles")}>
                  Телефони
                </div>
                <div className="items" onClick={() => filterByCategory("laptops")}>
                  Ноутбуки
                </div>
                <div className="items" onClick={() => filterByCategory("tablets")}>
                  Планшети
                </div>
                <div
                    className="items"
                    onClick={() => setShowPriceFilter((prev) => !prev)}
                >
                  Ціна
                </div>
              </div>
          )}

          {showPriceFilter && (
              <div className="price-filter">
                <label>
                  Мінімальна ціна:
                  <input
                      type="number"
                      name="min"
                      value={priceRange.min}
                      onChange={handlePriceChange}
                      min="0"
                  />
                </label>
                <label>
                  Максимальна ціна:
                  <input
                      type="number"
                      name="max"
                      value={priceRange.max}
                      onChange={handlePriceChange}
                      min="0"
                  />
                </label>
                <button onClick={filterByPriceRange}>Підтвердити</button>
              </div>
          )}
        </header>
      </>
  );
};

export default Navbar;
