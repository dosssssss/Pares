import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import "./CategoriesPage.css";

interface Category {
  id: number;
  name: string;
  displayOrder: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const [displayOrder, setDisplayOrder] =
    useState(1);

  async function loadCategories() {
    const response =
      await api.get("/categories");

    setCategories(
      response.data.data
    );
  }

  async function addCategory() {
    if (!name.trim()) {
      alert(
        "Category name is required"
      );
      return;
    }

    await api.post("/categories", {
      name,
      displayOrder,
    });

    setName("");
    setDisplayOrder(1);

    loadCategories();
  }

  async function deleteCategory(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Delete this category?"
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/categories/${id}`
      );

      loadCategories();
    } catch (error) {
      alert(
        "Unable to delete category. It may be in use."
      );
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">
        Category Management
      </h1>

      <div className="categories-form">
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(
              Number(e.target.value)
            )
          }
        />

        <button
          className="add-category-btn"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>

      
<div className="categories-list">
  {categories.map((category) => (
    <div
      key={category.id}
      className="category-card"
    >
      <div className="category-info">
        <div className="category-name">
          {category.name}
        </div>

        <div className="category-order">
          Display Order: {category.displayOrder}
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() =>
          deleteCategory(category.id)
        }
      >
        Delete
      </button>
    </div>
  ))}
</div>
    </div>
  );
}