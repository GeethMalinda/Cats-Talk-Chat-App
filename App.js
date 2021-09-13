import React from 'react'

import 'react-native-gesture-handler'
import Provider from './Navigation/Provider'

const App = () => {
  return <Provider/>

  //
  // if (isFirstLaunch === null) {
  //   return null
  // } else if (isFirstLaunch === true) {
  //   return (
  //     <NavigationContainer>
  //       <StackNavigator.Navigator headerMode="none">
  //         <StackNavigator.Screen name="onBoardingScreen" component={OnBoardingScreen}/>
  //         <StackNavigator.Screen name="loggingScreen" component={LoginScreen}/>
  //       </StackNavigator.Navigator>
  //     </NavigationContainer>
  //   )
  // } else {
  //   return <LoginScreen/>
  // }

}

export default App
