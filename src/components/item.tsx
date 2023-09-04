import React from "react";
import { Container, Image, Text, Tooltip } from "@mantine/core";
import { items } from "./items";
import {getUrl} from "../Api";

interface ItemProps {
  names: string[];
}

export function Item({ names }: ItemProps) {
  const textNames = names.filter((name) => !items.some((item) => item.name === name));
  const URL = getUrl();

  return (
    <Container style={{alignItems: 'center'}}>
      <Container style={{ display: 'flex' }}>
        {names.map((name) => {
          const item = items.find((item) => item.name === name);

          if (item) {
            return (
              <Tooltip key={name} label={item.displayName}>
                <Image
                  src={URL + `/texture/${name}`}
                  fit={"contain"}
                  width={25}
                  height={25}
                />
              </Tooltip>
            );
          } else {
            return null;
          }
        })}
      </Container>
      {textNames.length > 4 ? (
        <Text>
          {textNames.slice(0, 4).join(", ")} and {textNames.length - 4} more
        </Text>
      ) : (
        <Text>{textNames.join(", ")}</Text>
      )}
    </Container>
  );
}
