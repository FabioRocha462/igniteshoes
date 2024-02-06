import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Routes } from './src/routes';
import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import OneSignal from "react-native-onesignal";
import { tagsUserInfoCreate } from './src/notifications/notificationsTags';
import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';


OneSignal.setAppId("40bb79bc-b42d-4bfd-8ea2-55d1f6cfff98");
OneSignal.setEmail("fabiorocha@gmail.com");

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
});
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  // tagUserEmailCreate("rochafabio462@gmail.com");
  tagsUserInfoCreate();

  useEffect(() => {
    const unisubscribe = OneSignal.setNotificationOpenedHandler(() => {
        console.log("notificação aberta!");
    });

    return () => unisubscribe;
  }, []);
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

    </NativeBaseProvider>
  );
}