import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-home" : "ios-home", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-person-add" : "ios-person-add", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-add-circle" : "ios-add-circle-outline", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-search" : "ios-search", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "ncfrmi-app.HomeScreen",
                    title: "Start Here",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ],
                        rightButtons: [
                            {
                                icon: sources[4],
                                title: "key",
                                id: "logOut"
                            }
                        ]
                    }
                },
                {
                    screen: "ncfrmi-app.RegisterIdpScreen",
                    title: "Register IDPs",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ],
                        rightButtons: [
                            {
                                icon: sources[4],
                                title: "key",
                                id: "logOut"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange",
                tabBarBackgroundColor: '#00a79d',
                tabBarButtonColor: '#fff',
                tabBarLabelColor: '#fff'
            },
            drawer: {
                left: {
                    screen: "ncfrmi-app.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "#fff",
                tabBarBackgroundColor: '#00a79d',
                tabBarButtonColor: '#fff',
                tabBarLabelColor: '#fff',
                navBarBackgroundColor: '#00a79d',
                navBarTextColor: '#fff',
                navBarButtonColor: '#fff',
                navBarTitleTextCentered: true
            },
        });
    });
};

export default startTabs;
