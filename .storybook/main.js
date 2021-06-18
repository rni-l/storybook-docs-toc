module.exports = {
  stories: [
    "../src/stories/Introduction.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
