import { useEffect, useState } from "react";
import api from "../services/api";
import "./PosPage.css";

interface Category {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: string;
  categoryId: number;
  isAvailable: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function PosPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [cashReceived, setCashReceived] =
    useState("");

  async function loadData() {
    try {
      const categoriesResponse =
        await api.get("/categories");

      const menuItemsResponse =
        await api.get("/menu-items");

      setCategories(
        categoriesResponse.data.data
      );

      setMenuItems(
        menuItemsResponse.data.data
      );

      if (
        categoriesResponse.data.data.length > 0
      ) {
        setSelectedCategory(
          categoriesResponse.data.data[0].id
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addToCart(item: MenuItem) {
    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: 1,
        },
      ]);
    }
  }

  function decreaseQuantity(
    itemId: number
  ) {
    setCart(
      cart
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  async function checkout() {
    try {
      const orderResponse =
        await api.post("/orders", {
          totalAmount: total,
          cashReceived:
            Number(cashReceived),
          changeAmount: change,
        });

      const orderId =
        orderResponse.data.data.id;

      for (const item of cart) {
        await api.post(
          `/orders/${orderId}/items`,
          {
            menuItemId: item.id,
            quantity: item.quantity,
          }
        );
      }

      alert(
        `Order #${orderResponse.data.data.orderNumber} saved successfully`
      );

      setCart([]);
      setCashReceived("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save order"
      );
    }
  }

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const change =
    Number(cashReceived || 0) -
    total;

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="pos-container">
      <div className="menu-section">
        <h1>POS</h1>

        <h2>Categories</h2>

        <div className="categories-container">
          {categories.map(
            (category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory ===
                  category.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    category.id
                  )
                }
              >
                {category.name}
              </button>
            )
          )}
        </div>

        <h2>Menu Items</h2>

        <div className="menu-items-container">
          {menuItems
            .filter(
              (item) =>
                item.categoryId ===
                  selectedCategory &&
                item.isAvailable
            )
            .map((item) => (
              <button
                key={item.id}
                className="menu-item-btn"
                onClick={() =>
                  addToCart(item)
                }
              >
                {item.name}
                <br />
                ₱{item.price}
              </button>
            ))}
        </div>
      </div>

      <div className="order-section">
        <h2>Current Order</h2>

        {cart.length === 0 && (
          <p>No items selected</p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
          >
            <button
              onClick={() =>
                decreaseQuantity(
                  item.id
                )
              }
            >
              -
            </button>

            <span>
              {item.name} x
              {item.quantity}
            </span>

            <button
              onClick={() => {
                const menuItem =
                  menuItems.find(
                    (
                      menuItem
                    ) =>
                      menuItem.id ===
                      item.id
                  );

                if (menuItem) {
                  addToCart(
                    menuItem
                  );
                }
              }}
            >
              +
            </button>

            <span>
              ₱
              {item.price *
                item.quantity}
            </span>
          </div>
        ))}

        <hr />

        <h2>Total: ₱{total}</h2>

        <div className="payment-section">
          <label>
            Cash Received:
          </label>

          <input
            type="number"
            value={cashReceived}
            onChange={(e) =>
              setCashReceived(
                e.target.value
              )
            }
            placeholder="Enter cash amount"
          />

          <h3>
            Change: ₱
            {change > 0
              ? change
              : 0}
          </h3>
        </div>

        <button
          className="pay-btn"
          onClick={checkout}
          disabled={
            cart.length === 0 ||
            Number(cashReceived) <
              total
          }
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}