import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./search.scss";
import { useDispatch } from "react-redux";
import { searchPostByName } from "./../../../redux/actions/postActions";
import { getParam, insertParam, suggest } from "../../../utils/common";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiGetSuggest } from "../../../constants";

export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const formRef = useRef(null);
  const history = useHistory();
  const [suggestName, setSuggestName] = useState([]);
  const [suggestNames, setSuggestNames] = useState([]);

  const insertParams = (key, value) => {
    let params = insertParam(key, value);
    history.push({
      pathname: "/search",
      search: `?${params}`,
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    let link = `/search?search=${inputVal}`;
    insertParams("search", inputVal);
    if (window.location.pathname !== "/search") {
      window.location.href = link;
    }
    getPostSearch();
  };

  //get data search
  const dispatch = useDispatch();
  const getPostSearch = () => {
    dispatch(searchPostByName(`search=${inputVal}`));
  };

  const onChangeSearch = (e) => {
    const val = e.target.value;
    setInputVal(val);
    let matches = suggest(val, suggestNames);
    setSuggestName(matches);
  };

  useEffect(() => {
    setValueWhenReload();
    fetchSuggest();
    return () => {
      setSuggestName();
      setSuggestNames();
    };
  }, []);

  //get value param and set to ui
  const setValueWhenReload = () => {
    let searchVal = getParam("search");
    let pathName = window.location.pathname;
    if (searchVal && pathName === "/search") {
      setInputVal(searchVal);
    }
  };

  const fetchSuggest = async () => {
    try {
      var nameSuggest = JSON.parse(sessionStorage.suggestAll);
      setSuggestNames(nameSuggest?.name);
    } catch (error) {
      await axios
        .get(apiGetSuggest)
        .then((res) => {
          const data = res.data.data;
          setSuggestNames(data?.name);
          sessionStorage.setItem("suggestAll", JSON.stringify(data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const onClickSuggest = (value) => {
    setInputVal(value);
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
        onBlur={() =>
          setTimeout(() => {
            setSuggestName([]);
          }, 100)
        }
      />
      {suggestName?.length > 0 && (
        <div className="suggest-component">
          {suggestName?.map((name, index) => (
            <div key={index} onClick={() => onClickSuggest(name)}>
              <p>{name}</p>
            </div>
          ))}
        </div>
      )}
      <button
        type="submit"
        id="button"
        onClick={(e) => onSearch(e)}
        onSubmit={(e) => onSearch(e)}
      >
        <SearchIcon id="iconSearch" />
      </button>
    </form>
  );
}
