import {Button, createStyles, MultiSelect, Portal, rem, Group, Text, Modal, TextInput} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import React, {forwardRef, useEffect, useState} from "react";
import {items} from "./items";
import {createShop, getUrl} from "../Api";
import {notifications} from "@mantine/notifications";

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: "#818181",
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

export function AddShopButton() {
  const URL = getUrl();

  const [opened, { open, close }] = useDisclosure(false);

  const [name, setName] = useState<string>('')
  const [nameIsFocused, setNameIsFocused] = useState<boolean>(false)
  const { classes: nameClasses } = useStyles({ floating: name.trim().length !== 0 || nameIsFocused });

  const [owner, setOwner] = useState<string>('')
  const [ownerIsFocused, setOwnerIsFocused] = useState<boolean>(false)
  const { classes: ownerClasses } = useStyles({ floating: owner.trim().length !== 0 || ownerIsFocused });

  const [location, setLocation] = useState<string>('')
  const [locationIsFocused, setLocationIsFocused] = useState<boolean>(false)
  const { classes: locationClasses } = useStyles({ floating: location.trim().length !== 0 || locationIsFocused });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemsIsFocused, setItemsIsFocused] = useState<boolean>(false)
  const { classes: itemsClasses } = useStyles({floating: itemsIsFocused || selectedItems.length > 0 });

  const [itemOptions, setItemOptions] = useState(
  items.map((item) => ({
    label: item.displayName,
    value: item.name,
    image: URL + `/texture/${item.name}`
  }))
  );


  useEffect(()=>{console.log(selectedItems)}, [selectedItems])

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    value: string;
    image: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, value, image, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text>{label}</Text>
            {label !== value &&
              <Text size="xs" color="dimmed">
                {value}
              </Text>
            }
          </div>
        </Group>
      </div>
    )
  );


  function post() {
    if (name !== '' && owner !== '' && location !== '' && selectedItems.length > 0) {
      createShop({name, owner, location, items: selectedItems}).then(
        () => {
          setName('');
          setOwner('');
          setLocation('');
          setSelectedItems([])
          close()
          notifications.show({
            title: 'Shop created!',
            message: 'Refresh the page to see it.',
            autoClose: 2000,
            color: 'green'
          });
        }
      )
    } else {
      notifications.show({
        message: 'Fill out all fields!',
        autoClose: 1500,
        color: 'red'
      });
    }
  }


  return (
    <>
      <Button
        radius="xl"
        size="md"
        uppercase
        variant={"gradient"}
        gradient={{ from: '#D60270', to: '#004dea', deg: 0 }}
        style={{position:"fixed",right:"1.75rem",bottom:"1.75rem"}}
        onClick={open}
      >+</Button>
      <Portal>
        <Modal
          transitionProps={{ transition: 'rotate-left' }}
          opened={opened}
          onClose={close}
          title="New Shop"
          overlayProps={{
            opacity: 0.55,
            blur: 3,
            gradient: "linear-gradient(150deg, rgba(214,2,112,0.5) 0%, rgba(155,79,150,0.5) 50%, rgba(0,56,168,0.5) 100%)"
          }}
        >
          <TextInput
            label="Name"
            placeholder="e.g.: virusrpi's deepslate shop"
            required
            value={name}
            classNames={nameClasses}
            onChange={(event) => setName(event.currentTarget.value)}
            onFocus={() => setNameIsFocused(true)}
            onBlur={() => setNameIsFocused(false)}
            mt="md"
            autoComplete="nope"
          />
          <br/>
          <TextInput
            label="Owner"
            placeholder="e.g.: virusrpi"
            required
            value={owner}
            classNames={ownerClasses}
            onChange={(event) => setOwner(event.currentTarget.value)}
            onFocus={() => setOwnerIsFocused(true)}
            onBlur={() => setOwnerIsFocused(false)}
            mt="md"
            autoComplete="nope"
          />
          <br/>
          <TextInput
            label="Location"
            placeholder="e.g.: -200, 500 or /pw virusrpi's shop or discord DMs ..."
            required
            value={location}
            classNames={locationClasses}
            onChange={(event) => setLocation(event.currentTarget.value)}
            onFocus={() => setLocationIsFocused(true)}
            onBlur={() => setLocationIsFocused(false)}
            mt="md"
            autoComplete="nope"
          />
          <br/>
          <MultiSelect
            data={itemOptions}
            label="Items"
            required
            classNames={itemsClasses}
            onFocus={() => setItemsIsFocused(true)}
            onBlur={() => setItemsIsFocused(false)}
            mt="md"
            nothingFound="Nothing found"
            dropdownPosition="top"
            withAsterisk
            value={selectedItems}
            onChange={setSelectedItems}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query, image: "" };
              setItemOptions((current) => [...current, item]);
              return item;
            }}
            clearable
            maxDropdownHeight={160}
            itemComponent={SelectItem}
          />
          <br/>
          <Button onClick={() => {post()}}>Post</Button>
        </Modal>
      </Portal>
    </>
  )
}