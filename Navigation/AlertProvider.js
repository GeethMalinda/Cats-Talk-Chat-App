// import React, { createContext, useState } from 'react'
// import { AuthContext } from './AuthProvider'
// import auth from '@react-native-firebase/auth'
//
// export const AlertContext = createContext()
//
// export const Alert = ({ children }) => {
//
//   const [visible, setVisible] = useState(false)
//
//
//
//   const hideDialog = () => setVisible(false);
//   return (
//
//
//     <AuthContext.Provider
//
//       value={{
//         async showDialog = () => setVisible(true),
//     >
//       <Provider>
//         <View>
//           <Button onPress={showDialog}>Show Dialog</Button>
//           <Portal>
//             <Dialog visible={visible} onDismiss={hideDialog}>
//               <Dialog.Title>Alert</Dialog.Title>
//               <Dialog.Content>
//                 <Paragraph>This is simple dialog</Paragraph>
//               </Dialog.Content>
//               <Dialog.Actions>
//                 <Button onPress={hideDialog}>Done</Button>
//               </Dialog.Actions>
//             </Dialog>
//           </Portal>
//         </View>
//       </Provider>
//       {children}
//     </AuthContext.Provider>
//
//   )
// }