import React, { useState } from "react";
import "./suspicious-claims-filter.scss";
import { Button } from "antd";
import DubioCard from "../DubioCard/DubioCard";
import DubioSearchInput from "../DubioSearchInput/DubioSearchInput";
import DubioSelectInput from "../DubioSelectInput/DubioSelectInput";

//REDUX
import { useDispatch } from "react-redux";
import { filterArticles } from "../../redux/Slices/ArticleSlice";

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
    region: "Worldwide",
    topic: "All Topics",
    language: "All Languages",
    OrderBy: "Magic",
  });
  const handleChange = (
    value: string,
    filterProperty: "region" | "topic" | "language" | "OrderBy"
  ) => {
    const newFilterState = filter;
    
    newFilterState[filterProperty] = value;
    console.log(newFilterState[filterProperty]);
    setFilter({ ...newFilterState });
  };

  const handleSubmit = () => {
    const searchObject = { searchValue, ...filter };
    dispatch(filterArticles(searchObject));
  };
  return (
    <DubioCard id="card-filter-claims">
      <div className="suspicious-claims-filter">
        <DubioSelectInput
          defaultValue="Worldwide"
          label="Filter by region"
          onChange={(value) => handleChange(value, "region")}
          options={regionOptions}
          value={filter.region}
        />
        <DubioSelectInput
          defaultValue="All Topics"
          label="Filter by topic"
          onChange={(value) => handleChange(value, "topic")}
          options={topicOptions}
          value={filter.topic}
        />
        <DubioSelectInput
          defaultValue="All Languages"
          label="Filter by language"
          onChange={(value) => handleChange(value, "language")}
          options={languageOptions}
          value={filter.language}
        />
        <DubioSelectInput
          defaultValue="Magic"
          label="Order by"
          onChange={(value) => handleChange(value, "OrderBy")}
          options={orderByOptions}
          value={filter.OrderBy}
        />
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
