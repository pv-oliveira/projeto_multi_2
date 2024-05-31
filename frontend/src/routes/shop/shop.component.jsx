import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";

import { useDispatch } from "react-redux";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategoriesStart());
    //eslint-disable-next-line
  }, []);

  return (
    <Routes>
      {/* <Route index element={<CategoriesPreview />} /> */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
