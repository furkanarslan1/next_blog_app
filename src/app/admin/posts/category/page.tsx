"use client";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Category_admin() {
  const [category, setCategory] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/category/${id}`, { method: "DELETE" });
    setCategory((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleUpdate = async (id: number) => {
    await fetch(`/api/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setCategory((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
    );
    setEditCategoryId(null);
  };

  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // boşlukları tire yap
      .replace(/[^\w\-]+/g, "") // alfasayısal olmayanları çıkar
      .replace(/\-\-+/g, "-"); // çift tireleri teke indir
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    const slug = slugify(newCategoryName);

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName, slug }),
      });
      if (!res.ok) {
        throw new Error("unsuccesfull");
      }

      const createdCategory = await res.json();
      setCategory((prev) => [...prev, createdCategory]);
      setNewCategoryName("");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl underline">Add Category</h1>
          <div className="flex flex-col gap-6">
            <input
              className="bg-white text-black rounded-2xl py-2 px-4"
              type="text"
              value={newCategoryName}
              placeholder="Add a category name"
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              className="bg-white rounded-2xl text-black font-bold py-2 cursor-pointer hover:opacity-80 transition-all duration-300"
              onClick={handleAddCategory}
            >
              Send
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {category &&
            category.map((cat: Category) => (
              <li
                className="flex flex-col gap-6 border-1 rounded-2xl p-6 shadow-white shadow-md "
                key={cat.id}
              >
                {editCategoryId === cat.id ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={cat.name}
                    className="p-2 border-1 rounded-2xl"
                  />
                ) : (
                  <p className="font-bold text-center">{cat.name}</p>
                )}

                <div className="flex justify-between items-center gap-4 text-2xl px-8">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="hover:opacity-80 cursor-pointer transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                  {editCategoryId === cat.id ? (
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      className="hover:opacity-80 cursor-pointer transition-all duration-300"
                    >
                      <IoIosSave />
                    </button>
                  ) : (
                    <button
                      className="hover:opacity-80 cursor-pointer transition-all duration-300"
                      onClick={() => {
                        setEditCategoryId(cat.id);
                        setNewName(cat.name);
                      }}
                    >
                      {" "}
                      <MdEdit />
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
