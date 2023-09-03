import {Container, MantineProvider} from '@mantine/core';
import { SiteHeader} from "./components/header";
import { ShopList } from "./components/shop_list";


const shops = [
  {
      name: "Virusrpi's Cild Labor Shop",
      owner: "virusrpi",
      location: "DM only",
      rating: 5,
      items: ["Cild Labor"]
  },
  {
    name: "Otaku's House Shop",
    owner: "Otaku05",
    location: "/pw Otaku's_house_shop",
    rating: 5,
    items: ["Cild Labor", "Houses"]
  },
  {
    name: "MineMart",
    owner: "PrinxeJ",
    location: "/pw MineMart",
    rating: 4.5,
    items: ["Banner", "Name Tag", "Saddle", "Wool", "Enchanted Book", "Farming Starter Kits"]
  }
]

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SiteHeader
        links={
        [
          {label: "Shops", link: ""},
          {label: "Your Diamonds", link: ""},
          {label: "Credits", link: ""},
          {label: "Wall Street", link: ""}
        ]
      }
      />
      <Container size="90%" mt="lg" mb="lg">
        <ShopList data={shops} />
      </Container>
    </MantineProvider>
  );
}