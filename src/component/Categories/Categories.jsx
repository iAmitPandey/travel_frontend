import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../context";

import "./Categories.css";

export const Categories = () => {
  const [Categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setNumberOfCategoriesToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();

  const handelShowMoreRightClick = () => {
    setNumberOfCategoriesToShow((prev) => prev + 10);
  };
  const handelShowMoreLeftClick = () => {
    setNumberOfCategoriesToShow((prev) => prev - 10);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://travelbackend.cyclic.app/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoriesToShow + 10 > data.length
            ? data.length - 10
            : numberOfCategoriesToShow,
          numberOfCategoriesToShow > data.length
            ? data.length
            : numberOfCategoriesToShow + 10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoriesToShow]);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfCategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handelShowMoreLeftClick}
        >
          <span className="material-icons-outlined">chevron_left</span>
        </button>
      )}

      {Categories &&
        Categories.map(({ _id, category }) => (
          <span
            onClick={() => {
              handleCategoryClick(category);
            }}
            className={`${
              category === hotelCategory ? "category-color" : ""
            } item`}
            key={_id}
          >
            {category}
          </span>
        ))}
      {numberOfCategoriesToShow - 10 < Categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handelShowMoreRightClick}
        >
          <span className="material-icons-outlined">chevron_right</span>
        </button>
      )}
    </section>
  );
};
