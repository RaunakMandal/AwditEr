import React, { JSX, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, Provider } from 'react-native-paper';
import { ROUTE_TO_ICON_MAP, ROUTES } from '../../utils/constants/routes';
import { convertToTitleCase } from '../../utils/functions';
import { isUserAllowedForRoute } from '../../utils/functions/user';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Audit } from './components/Audit';
import { T_User } from '../../types/user';
import Icon from 'react-native-vector-icons/AntDesign';

export type T_Route = {
  key: (typeof ROUTES)[number];
  title: string;
  icon: JSX.Element | string;
};

export const HomePage = ({ user }: { user: T_User }) => {
  const [index, setIndex] = useState(0);

  const routes: T_Route[] = useMemo(() => {
    const availableRoutes: T_Route[] = ROUTES.filter(route =>
      isUserAllowedForRoute(route, user),
    ).map(route => ({
      key: route,
      title: convertToTitleCase(route),
      icon: <Icon name={ROUTE_TO_ICON_MAP[route]} size={24} />,
    }));

    return availableRoutes;
  }, [user]);

  const renderScene = ({ route }: { route: T_Route }) => {
    switch (route.key) {
      case 'audit':
        return <Audit />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return user && routes ? (
    <Provider>
      {renderScene({ route: routes[index] })}
      <BottomNavigation.Bar
        navigationState={{ index, routes }}
        onTabPress={({ route }) => {
          const newIndex = routes.findIndex(r => r.key === route.key);
          if (newIndex !== -1) {
            setIndex(newIndex);
          }
        }}
        renderIcon={({ route }) => route.icon}
        getLabelText={({ route }) => route.title}
      />
    </Provider>
  ) : (
    <View style={styles.container}>
      <Text>Please log in to access the home page.</Text>
    </View>
  );
};

// Styles for the HomePage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
