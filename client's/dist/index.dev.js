"use strict";

require("expo-router/entry");

var _reactNative = require("react-native");

_reactNative.LogBox.ignoreLogs(["In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."]); // Add global error handler


ErrorUtils.setGlobalHandler(function (error, isFatal) {
  console.error('Global error:', error); // You can add more detailed logging here
});
//# sourceMappingURL=index.dev.js.map
