import { Meta, Story } from "@storybook/vue3";
import Navbar from "../components/Navbar.vue";

export default {
  title: "Navbar",
  component: Navbar,
  argTypes: {
    authIsReady: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { Navbar },
  setup() {
    return {
      args,
    };
  },
  template: '<Navbar v-bind="args" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    displayName: "Jane Doe",
    photoURL:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};
