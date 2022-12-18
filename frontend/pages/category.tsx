import type { NextPage } from "next";

import Template from "../containers/Template";
import Category from "../containers/Category";

const CategoryPage: NextPage = () => {
  return (
    <div className="category-container">
      <Template
        clasActive="category"
        content={<Category />}
        title="Category"
      />
    </div>
  );
};

export default CategoryPage;
