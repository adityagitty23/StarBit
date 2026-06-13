import { useState, useRef } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CategoryPills from "../components/CategoryPills";
import FoodCard from "../components/FoodCard";
import FloatingCart from "../components/FloatingCart";
import CartDrawer from "../components/CartDrawer";
import BackgroundGlow from "../components/BackgroundGlow";

import menuData from "../data/menuData";

export default function Home() {
const [selectedCategory, setSelectedCategory] =
  useState("All");

const [searchTerm, setSearchTerm] =
  useState("");

const editingOrder =
  localStorage.getItem(
    "editingOrder"
  );

const reviewMessage =
  localStorage.getItem(
    "reviewMessage"
  );

  const categoryRef = useRef(null);

const filteredItems = menuData.filter(
  (item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    return (
      matchesCategory &&
      matchesSearch
    );
  }
);

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center">
      <div
        className="
          w-full
          max-w-[1280px]
          min-h-screen
          px-4
          py-4
          relative
        "
      >
        <BackgroundGlow />

        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {editingOrder && (

  <div
    className="
      mb-4

      bg-yellow-50/70
      backdrop-blur-xl

      border
      border-yellow-200

      rounded-[28px]

      p-5
    "
  >

    <h2
      className="
        font-bold
        text-yellow-700
      "
    >
      Restaurant Update
    </h2>

    <p className="mt-2 text-gray-700">
      {reviewMessage}
    </p>

  </div>

)}

        {/* Hero Banner */}
        <HeroBanner
          onExploreClick={() =>
            categoryRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        />

        {/* Categories */}
        <div
          ref={categoryRef}
          className="mt-4"
        >
          <CategoryPills
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Section Header */}
        <div className="mt-8 mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Our Menu
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Choose your favourite
          </p>
        </div>

        {/* Food Grid */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            pb-32
          "
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="text-5xl mb-3">
                🍽️
              </div>

              <h3 className="font-semibold text-lg">
                No items found
              </h3>

              <p className="text-gray-500 mt-2">
                Try another category
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />

        {/* Cart Components */}
        <FloatingCart />
        <CartDrawer />
      </div>
    </div>
  );
}