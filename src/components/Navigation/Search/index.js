import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./search.scss";
import { useDispatch } from "react-redux";
import { searchPostByName } from "./../../../redux/actions/postActions";
import { getParam, insertParam } from "../../../utils/common";
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

  useEffect(() => {
    setValueWhenReload();
    return () => {};
  }, []);

  //get value param and set to ui
  const setValueWhenReload = () => {
    let searchVal = getParam("search");
    let pathName = window.location.pathname;
    if (searchVal && pathName === "/search") {
      setInputVal(searchVal);
    }
  };

  return (
    <form id="boxSearch" ref={formRef}>
      <input
        onChange={(e) => onChangeSearch(e)}
        type="text"
        id="header-search"
        placeholder="Tìm kiếm sản phẩm"
        name="search"
        value={inputVal || ""}
      />
      <button
        type="submit"
        id="button"
        onClick={() => onSearch()}
        onSubmit={() => onSearch()}
      >
        <SearchIcon id="iconSearch" />
      </button>
    </form>
  );
}
