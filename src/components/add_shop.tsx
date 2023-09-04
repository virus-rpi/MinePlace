import {Button} from "@mantine/core";

export function AddShopButton() {
  return (
    <Button
      radius="xl"
      size="md"
      uppercase
      variant={"gradient"}
      gradient={{ from: '#D60270', to: '#004dea', deg: 0 }}
    >+</Button>
  )
}