import {Container, MantineProvider, Text} from '@mantine/core';
import { SiteHeader} from "./components/header";
import {RowData, ShopList} from "./components/shop_list";
import React, {useEffect, useState} from "react";
import {getShops} from "./Api";
import {AddShopButton} from "./components/add_shop";
import { Notifications } from '@mantine/notifications';

export enum tabs {
  SHOP = "Shop",
  DIAMONDS = "Your Diamonds",
  CREDITS = "Credits",
  WALL_STREET = "Wall Street"
}

export default function App() {
  const [tab, setTab] = useState(tabs.SHOP)
  const [data, setData] = useState<RowData[]>([])

  useEffect(
    () => {
    getShops().then((shops) => setData(shops))
    }, []
  )


  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
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
            data.length > 0 &&
            <>
              <ShopList data={data} />
              <AddShopButton />
            </>
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