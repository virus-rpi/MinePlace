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

interface createShopProps {
  name: string,
  owner: string,
  location: string,
  items: string[]
}
export async function createShop({name, owner, location, items}: createShopProps) {
  const endpoint = "/shops/create/" + name + "/" + owner + "/" + location + "/" + items;
  const fullUrl = `${URL}${endpoint}`;

  const response = await axios.get(fullUrl);
  return response.data
}