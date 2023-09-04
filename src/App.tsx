import {Container, MantineProvider, Text} from '@mantine/core';
import { SiteHeader} from "./components/header";
import { ShopList } from "./components/shop_list";
import {useState} from "react";


const shops = [
  {
      name: "Virusrpi's Child Labor Shop",
      owner: "virusrpi",
      location: "DM only",
      rating: 5,
      items: ["Child Labor"]
  },
  {
    name: "Otaku's House Shop",
    owner: "Otaku05",
    location: "/pw Otaku's_house_shop",
    rating: 5,
    items: ["Child Labor", "Houses"]
  },
  {
    name: "MineMart",
    owner: "PrinxeJ",
    location: "/pw MineMart",
    rating: 4.5,
    items: ["Banners", "name_tag", "saddle", "Wool", "Enchanted Book", "Farming Starter Kits"]
  }
]

export enum tabs {
  SHOP = "Shop",
  DIAMONDS = "Your Diamonds",
  CREDITS = "Credits",
  WALL_STREET = "Wall Street"
}

export default function App() {
  const [tab, setTab] = useState(tabs.SHOP)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SiteHeader
        links={
        [
          {label: "Shops", link: tabs.SHOP},
          {label: "Your Diamonds", link: tabs.DIAMONDS},
          {label: "Credits", link: tabs.CREDITS},
          {label: "Wall Street", link: tabs.WALL_STREET}
        ]
        }
        tab={tab}
        setTab={setTab}
      />
      <Container size="90%" mt="lg" mb="lg">
        {tab === tabs.SHOP &&
          <ShopList data={shops} />
        }
        {tab === tabs.DIAMONDS &&
          <Text>Online Banking coming soon</Text>
        }
        {tab === tabs.CREDITS &&
          <Text>Credits coming soon (after online banking)</Text>
        }
        {tab === tabs.WALL_STREET &&
          <Text>Stock trading coming soon (after credits)</Text>
        }
      </Container>
    </MantineProvider>
  );
}