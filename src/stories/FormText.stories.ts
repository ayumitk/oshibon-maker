import { Meta, Story } from "@storybook/vue3";
import FormText from "../components/FormText.vue";

export default {
  title: "FormText",
  component: FormText,
  argTypes: {
    icon: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    readonly: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { FormText },
  setup() {
    return {
      args,
    };
  },
  template: `
		<FormText v-bind="args" />
	`,
});

export const Default = Template.bind({});
Default.args = {};
export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: true,
};
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readonly: true,
};
