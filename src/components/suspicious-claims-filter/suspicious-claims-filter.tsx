import React, { useState } from "react";
import "./suspicious-claims-filter.scss";
import { Button } from "antd";
import DubioCard from "../DubioCard/DubioCard";
import DubioSearchInput from "../DubioSearchInput/DubioSearchInput";
import DubioSelectInput from "../DubioSelectInput/DubioSelectInput";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/Slices/article-slice.utils";
import { filterAndSortOptionsSelector } from "../../redux/Slices/ArticleSlice";
// import { filterArticles } from "../../redux/Slices/ArticleSlice";

interface IOption {
  label: string;
  value: string;
}

const regionOptions: IOption[] = [
  { label: "Worldwide", value: "Worldwide" },
  { label: "Europe", value: "Europe" },
  { label: "Asia", value: "Asia" },
  { label: "Africa", value: "Africa" },
  { label: "Australia", value: "Australia" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
];
const topicOptions: IOption[] = [
  { label: "All Topics", value: "All Topics" },
  { label: "Weather", value: "Weather" },
  { label: "Crime", value: "Crime" },
  { label: "Community", value: "Community" },
  { label: "Sports", value: "Sports" },
  { label: "Health", value: "Health" },
  { label: "Politics", value: "Politics" },
  { label: "Local governments", value: "Local governments" },
  { label: "Science/Technology", value: "Science/Technology" },
  { label: "Business/Finance", value: "Business/Finance" },
];

const languageOptions: IOption[] = [
  { label: "All Languages", value: "All Languages" },
  { label: "Arabic", value: "Arabic" },
  { label: "Chinese", value: "Chinese" },
  { label: "English", value: "English" },
  { label: "German", value: "German" },
  { label: "Italian", value: "Italian" },
  { label: "Russian", value: "Russian" },
  { label: "Spanish", value: "Spanish" },
];
const orderByOptions: IOption[] = [
  { label: "Magic", value: "Magic" },
  { label: "Newest", value: "Newest" },
  { label: "Most Ranked", value: "Most Ranked" },
  { label: "Most", value: "Saved" },
];

export default function SuspiciousClaimsFilter() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({
    region: "",
    topic: "",
    language: "",
    // OrderBy: "Magic",
  });


  const filterAndSortOptions = useSelector(filterAndSortOptionsSelector);
  const handleChange = (
    value: string,
    filterProperty: "region" | "topic" | "language" 
  ) => {


    setFilter({ ...filter,[filterProperty]: value});
  };

  const handleSubmit = () => {
    dispatch(getArticles(filter, searchValue));
  };
  return (
    <DubioCard id="card-filter-claims">
      <div className="suspicious-claims-filter">
        <DubioSelectInput
          label="Filter by region"
          onChange={(value) => handleChange(value, "region")}
          options={filterAndSortOptions.filterOptions.region}
          value={filter.region}
        />
        <DubioSelectInput
          label="Filter by topic"
          onChange={(value) => handleChange(value, "topic")}
          options={filterAndSortOptions.filterOptions.topic}
          value={filter.topic}
        />
        <DubioSelectInput
          label="Filter by language"
          onChange={(value) => handleChange(value, "language")}
          options={filterAndSortOptions.filterOptions.language}
          value={filter.language}
        />
        {/* <DubioSelectInput
          defaultValue="Magic"
          label="Order by"
          // onChange={(value) => handleChange(value, "OrderBy")}
          options={filterAndSortOptions.sortOptions}
          value={filter.OrderBy}
        /> */}
        <DubioSearchInput
          onChange={(ev) => setSearchValue(ev.target.value)}
          value={searchValue}
          label="Search"
        />
        <Button
          size="large"
          className="filter-claims-button"
          type="primary"
          onClick={handleSubmit}
        >
          Filter Articles
        </Button>
      </div>
    </DubioCard>
  );
}
