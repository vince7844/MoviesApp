import React, { Fragment } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  state = {};
  render() {
    const {navigation, main} = this.props;
    return (
      <Fragment>
        <SafeAreaView>
          {main ? (
            <View style={styles.mainNav}>
              <Image
                style={styles.logo}
                source={require('../assets/images/movies.png')}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Icon name={'search'} size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.detailNav}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name={'chevron-back'} size={40} color={Colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mainNav: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  detailNav: {
    backgroundColor: '#000',
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
