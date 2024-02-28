import React from "react";

type TagProps = {
  categories: string[];
  response: string;
};

const Tag: React.FC<TagProps> = ({ categories, response }) => {
  return (
    <div className="flex flex-wrap">
      {categories.map((category, index) => (
        <span
          key={index}
          className={`m-1 px-2 py-1 rounded border border-black ${
            response.includes(category)
              ? "bg-gray-400 shadow-md text-gray-100"
              : "bg-transparent text-black"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default Tag;
