import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Card from './Card';
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array 
}

class List extends React.PureComponent {

  render() {
    const { navigation, title, content } = this.props
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <FlatList 
            data={content}
            renderItem={({item}) => <Card navigation={navigation} item={item} />}
            horizontal={true}
          /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
    padding: 10
  },
  list: {
    marginTop: 25
  }
})

List.propTypes = propTypes

export default List;