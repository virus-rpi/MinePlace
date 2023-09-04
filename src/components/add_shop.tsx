import {Button} from "@mantine/core";

export function AddShopButton() {
  return (
    <Button
      radius="xl"
      size="md"
      uppercase
      variant={"gradient"}
      gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
    >+</Button>
  )
}