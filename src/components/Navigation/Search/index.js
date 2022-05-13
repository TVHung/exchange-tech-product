import React, { useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./search.scss";
import { useDispatch } from "react-redux";
import { searchPostByName } from "./../../../redux/actions/postActions";
import { insertParam } from "../../../utils/common";
import { useHistory } from "react-router-dom";

export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const formRef = useRef(null);
  const history = useHistory();

  const insertParams = (key, value) => {
    let params = insertParam(key, value);
    history.push({
      pathname: "/search",
      search: `?${params}`,
    });
  };

  const onSearch = () => {
    let link = `/search?name=${inputVal}`;
    insertParams("name", inputVal);
    if (window.location.pathname != "/search") {
      window.location.href = link;
    }
    getPostSearch();
  };

  //get data search
  const dispatch = useDispatch();
  const getPostSearch = () => {
    dispatch(searchPostByName(`name=${inputVal}`));
  };

  const onChangeSearch = (e) => {
    const val = e.target.value;
    setInputVal(val);
  };

  return (
    <div id="boxSearch" ref={formRef}>
      <input
        type="text"
        id="header-search"
        placeholder="Tìm kiếm sản phẩm"
        name="search"
        value={inputVal}
        onChange={(e) => onChangeSearch(e)}
      />
      <button type="submit" id="button" onClick={() => onSearch()}>
        <SearchIcon id="iconSearch" />
      </button>
    </div>
  );
}
