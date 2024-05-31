import {
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import SHOP_DATA from "../../shop-data";

export const fetchCategoriesStart = withMatcher(() =>
  createAction("category/FETCH_CATEGORIES_START")
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray) =>
    createAction(
      "category/FETCH_CATEGORIES_SUCCESS",
      SHOP_DATA
    )
);

export const fetchCategoriesFailed = withMatcher((error) =>
  createAction("category/FETCH_CATEGORIES_FAILED", error)
);
