import React, { useState } from "react";
import "./suspicious-claims-filter.scss";
import { Button } from "antd";
import DubioCard from "../DubioCard/DubioCard";
import DubioSearchInput from "../DubioSearchInput/DubioSearchInput";
import DubioSelectInput from "../DubioSelectInput/DubioSelectInput";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { filterAndSortOptionsSelector, articlesLoadingSelector, setFiltersInStore, getArticles } from "../../redux/Slices/ArticleSlice";
// import { filterArticles } from "../../redux/Slices/ArticleSlice";


export default function SuspiciousClaimsFilter() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState({
    region: "",
    topic: "",
    language: "",
  });
  const [sortBy, setSortBy] = useState("Magic");


  const filterAndSortOptions = useSelector(filterAndSortOptionsSelector);
  const isArticlesLoading = useSelector(articlesLoadingSelector);
  const handleChange = (
    value: string,
    filterProperty: "region" | "topic" | "language" 
  ) => {
    setFilter({ ...filter,[filterProperty]: value});
  };

  const handleSubmit = () => {
    dispatch(setFiltersInStore({filterObject: filter , sortBy, searchValue}))

    dispatch(getArticles());
  };

  const {regions, topics, languages} = filterAndSortOptions.filterOptions;
  return (
    <DubioCard id="card-filter-claims">
      <div className="suspicious-claims-filter">
        <DubioSelectInput
          label="Filter by region"
          onChange={(value) => handleChange(value, "region")}
          options={regions}
          value={filter.region}
          placeholder="Select Region"
          disabled={!regions.length}
        />
        <DubioSelectInput
          label="Filter by topic"
          onChange={(value) => handleChange(value, "topic")}
          options={topics}
          value={filter.topic}
          placeholder="Select Topic"
          disabled={!topics.length}
        />
        <DubioSelectInput
          label="Filter by language"
          onChange={(value) => handleChange(value, "language")}
          options={languages}
          value={filter.language}
          placeholder="Select Language"
          disabled={!languages.length}
        />
        <DubioSelectInput
          defaultValue="Magic"
          label="Order by"
          onChange={(value) => setSortBy(value)}
          options={filterAndSortOptions.sortOptions}
          value={sortBy}
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
          disabled={isArticlesLoading}
        >
          Filter Articles
        </Button>
      </div>
    </DubioCard>
  );
}
