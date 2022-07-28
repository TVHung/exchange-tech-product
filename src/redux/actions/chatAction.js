import axios from "axios";
import { apiGetMyConversation } from "../../constants";
import { MY_LIST_CHAT } from "./../case";
import { headers } from "./../../constants";

export const fetchConversations = () => async (dispatch) => {
  try {
    await axios
      .get(apiGetMyConversation, {
        headers: headers,
      })
      .then((res) => {
        const users = res.data.data;
        users.sort(function (a, b) {
          return (
            new Date(b?.lastMessage?.created_at) -
            new Date(a?.lastMessage?.created_at)
          );
        });
        dispatch({ type: MY_LIST_CHAT, payload: users });
      });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
