import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: ['com.anonymous.igniteshoesapp://','igninateshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens:{
      details:{
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}
export function Routes() {
  const { colors } = useTheme();
  const [notifcation, setNotification] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();
      console.log(response.title)
      setNotification(response);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      
      {
        notifcation?.title &&
        <Notification data={notifcation} onClose={() => setNotification(undefined)} />
      }
    </NavigationContainer>
  );
}