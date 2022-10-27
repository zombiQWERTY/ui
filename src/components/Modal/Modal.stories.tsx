import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from ".";

export default {
  title: "Example/Modal",
  component: Modal,
  argTypes: {
    isShowing: {
      defaultValue: true,
    },
    title: {
      defaultValue: "Title",
    },
    content: {
      defaultValue: "Content",
    },
    bgColor: {
      defaultValue: "#fff",
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
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {};
