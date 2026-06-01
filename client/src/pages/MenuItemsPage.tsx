import { useEffect, useState } from "react";
import api from "../services/api";
import "./MenuItemsPage.css";

interface Category {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: string;
  isAvailable: boolean;
  categoryId?: number;

  category: {
    name: string;
  };
}

export default function MenuItemsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [categoryId, setCategoryId] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingItem, setEditingItem] =
  useState<MenuItem | null>(null);

const [editName, setEditName] =
  useState("");

const [editPrice, setEditPrice] =
  useState("");

const [editCategoryId, setEditCategoryId] =
  useState(1);

  async function loadData() {
    const categoriesResponse =
      await api.get("/categories");

    setCategories(categoriesResponse.data.data);

    const menuItemsResponse =
      await api.get("/menu-items");

    setMenuItems(menuItemsResponse.data.data);
  }

  async function addMenuItem() {
    await api.post("/menu-items", {
      categoryId,
      name,
      price: Number(price),
    });

    setName("");
    setPrice("");

    loadData();
  }

  async function deleteMenuItem(
    id: number
  ) {
    const confirmed = window.confirm(
      "Delete this menu item?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/menu-items/${id}`
      );

      loadData();
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete item. It may already exist in sales history."
      );
    }
  }

  async function toggleAvailability(
    id: number
  ) {
    try {
      await api.patch(
        `/menu-items/${id}/toggle`
      );

      loadData();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update availability"
      );
    }
  }


  useEffect(() => {
    loadData();
  }, []);

  function openEditModal(
  item: MenuItem
) {
  setEditingItem(item);

  setEditName(item.name);

  setEditPrice(
    item.price.toString()
  );

  setEditCategoryId(
    item.categoryId || 1
  );
}

async function updateMenuItem() {
  if (!editingItem) return;

  try {
    await api.put(
      `/menu-items/${editingItem.id}`,
      {
        categoryId:
          editCategoryId,

        name: editName,

        price:
          Number(editPrice),
      }
    );

    setEditingItem(null);

    loadData();
  } catch (error) {
    console.error(error);

    alert(
      "Failed to update item"
    );
  }
}
  return (
    <div className="page-container">
      <h1 className="page-title">
        Menu Items
      </h1>

      <div className="form-card">
        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              Number(e.target.value)
            )
          }
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={addMenuItem}
        >
          Add Menu Item
        </button>
      </div>

      <div className="items-grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="item-card"
          >
            <div className="item-name">
              {item.name}
            </div>

            <div className="item-price">
              ₱{item.price}
            </div>

            <div className="item-category">
              {item.category.name}
            </div>

            <div
              className={`status-badge ${
                item.isAvailable
                  ? "available"
                  : "unavailable"
              }`}
            >
              {item.isAvailable
                ? "🟢 Available"
                : "🔴 Disabled"}
            </div>

            <div className="item-actions">
  <button
    className="edit-btn"
    onClick={() =>
      openEditModal(item)
    }
  >
    Edit
  </button>

  <button
    className="toggle-btn"
    onClick={() =>
      toggleAvailability(
        item.id
      )
    }
  >
    {item.isAvailable
      ? "Disable"
      : "Enable"}
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deleteMenuItem(item.id)
    }
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>
      {editingItem && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h2>Edit Menu Item</h2>

      <select
        value={editCategoryId}
        onChange={(e) =>
          setEditCategoryId(
            Number(
              e.target.value
            )
          )
        }
      >
        {categories.map(
          (category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          )
        )}
      </select>

      <input
        value={editName}
        onChange={(e) =>
          setEditName(
            e.target.value
          )
        }
      />

      <input
        value={editPrice}
        onChange={(e) =>
          setEditPrice(
            e.target.value
          )
        }
      />

      <div className="modal-actions">
        <button
          className="save-btn"
          onClick={
            updateMenuItem
          }
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setEditingItem(
              null
            )
          }
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}