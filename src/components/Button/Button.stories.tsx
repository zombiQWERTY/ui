import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Text",
      options: {
        default: ["Text"],
        withChildDiv: [<div key="1">With child Div</div>],
      },
      control: {
        type: "select",
      },
      table: {
        type: {
          summary: "React.ReactNode",
        },
      },
    },
    bgColor: {
      defaultValue: "green",
      options: [
        "green",
        "blue",
        "black",
        "#fc03f8",
        "#fc03f8",
        "orange",
        "cyan",
      ],
      control: {
        type: "select",
      },
    },
    element: {
      table: {
        disable: true,
      },
    },
    disabled: {
      defaultValue: false,
    },
    href: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};
