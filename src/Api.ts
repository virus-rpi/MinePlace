import axios from "axios"

const URL = "http://" + (process.env.REACT_APP_ENV === "prod" ? process.env.REACT_APP_PROD_BACKEND_IP : process.env.REACT_APP_DEV_BACKEND_IP) + ":" + process.env.REACT_APP_BACKEND_PORT;

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
  const endpoint = "/shops/create";
  const fullUrl = `${URL}${endpoint}`;

  const shopData = {
    name: name,
    owner: owner,
    location: location,
    items: items
  };

  const response = await axios.post(fullUrl, shopData);
  return response.data;
}