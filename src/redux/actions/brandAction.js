import axios from "axios";
import { apiGetBrandByCategory } from "../../constants";
import { BRAND_CATEGORY } from "./../case";
import { headers } from "./../../constants";

export const fetchBrandByCategory = (id) => async (dispatch) => {
  try {
    await axios.get(`${apiGetBrandByCategory}/${id}`).then((res) => {
      const brands = res.data.data;
      dispatch({ type: BRAND_CATEGORY, payload: brands });
    });
  } catch (error) {
    dispatch({ type: BRAND_CATEGORY, payload: [] });
    return { statusCode: 500, body: error.toString() };
  }
};
