import axios from "axios";
import { apiConfig } from "./apiConfig";

export const refreshInstance = axios.create({
  ...apiConfig,
});
