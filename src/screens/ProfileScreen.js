import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // null = not logged in

  const handleLogin = () => {
    // simple validation: fields must not be empty
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    // accept ANY credentials
    setError('');
    setUser({ email }); // mark as logged in with this email
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      {!user ? (
        // LOGIN FORM
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            Enter any email and password to log in.
          </Text>
        </View>
      ) : (
        // LOGGED-IN VIEW
        <View style={styles.card}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.label}>Logged in as:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <TouchableOpacity
            style={[styles.button, styles.logout]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  logout: {
    backgroundColor: '#ef4444',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#b91c1c', marginBottom: 8 },
  hint: { fontSize: 12, color: '#6b7280', marginTop: 8 },
  label: { marginTop: 4, color: '#6b7280' },
  value: { fontSize: 16, fontWeight: '600', marginTop: 2 },
});
