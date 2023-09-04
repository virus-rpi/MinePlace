import axios from "axios"

const URL = "http://localhost:80"

export function getUrl() {
  return URL
}

export async function getShops() {
  const endpoint = "/shops/get_all";
  const fullUrl = `${URL}${endpoint}`;

  const response = await axios.get(fullUrl);
  return response.data["shops"];
}