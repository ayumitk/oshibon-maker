import { Meta, Story } from "@storybook/vue3";
import Button from "../components/Button.vue";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "secondary", "twitter"],
      },
      defaultValue: "primary",
    },
    variant: {
      control: {
        type: "select",
        options: ["contained", "outlined"],
      },
      defaultValue: "contained",
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
      defaultValue: "medium",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { Button },
  setup() {
    return {
      args,
    };
  },
  template: `
		<Button v-bind="args" />
	`,
});

export const ContainedPrimary = Template.bind({});
ContainedPrimary.args = {};
export const ContainedSecondary = Template.bind({});
ContainedSecondary.args = {
  color: "secondary",
};
export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  variant: "outlined",
};
export const OutlinedSecondary = Template.bind({});
OutlinedSecondary.args = {
  variant: "outlined",
  color: "secondary",
};
