import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text>KenangaMobile</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
