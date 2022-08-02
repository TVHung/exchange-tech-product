import axios from "axios";
import { apiGetMyConversation } from "../../constants";
import { MY_LIST_CHAT, NUM_CHAT } from "./../case";
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
        dispatch(getNumChat(users));
      });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

const getNumChat = (userConversations) => (dispatch) => {
  let totalChat = 0;
  for (let i = 0; i < userConversations.length; i++) {
    if (
      userConversations[i]?.lastMessage?.is_read == 0 &&
      parseInt(userConversations[i]?.lastMessage?.user_id) !=
        parseInt(JSON.parse(localStorage.getItem("user"))?.id)
    )
      totalChat++;
  }
  localStorage.setItem("numChat", totalChat);
  dispatch({ type: NUM_CHAT, payload: totalChat });
};
