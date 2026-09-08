import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const Greeting = () => {
  const [fullName, setFullName] = useState('');

  const handleInputChange = (text: string) => {
    setFullName(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your full name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={handleInputChange}
      />
      <Text style={styles.greeting}>
        {fullName ? `Hello, ${fullName}!` : 'Please enter your name.'}
      </Text>
      <Button title="Submit" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  greeting: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default Greeting;