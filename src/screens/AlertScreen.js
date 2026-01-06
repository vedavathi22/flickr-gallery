// src/screens/AlertScreen.js
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AlertScreen() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const openAlert = msg => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>

      <Pressable
        style={styles.button}
        onPress={() => openAlert('This is a simple alert.')}
      >
        <Text style={styles.buttonText}>SHOW SIMPLE ALERT</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => openAlert('Are you sure you want to delete this task?')}
      >
        <Text style={styles.buttonText}>SHOW CONFIRM ALERT</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => openAlert('Daily summary will be sent at 9:00 PM.')}
      >
        <Text style={styles.buttonText}>SHOW INFO ALERT</Text>
      </Pressable>

      {/* Custom alert modal (works on web + mobile) */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Alert</Text>
            <Text style={styles.modalMessage}>{message}</Text>

            <Pressable
              style={[styles.button, { marginTop: 16 }]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 24 },
  button: {
    backgroundColor: '#4f46e5',       // changed from blue bar
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
buttonText: { color: '#f5f3ff', fontWeight: '600' },
  modalBackdrop: {
    flex: 1,
   backgroundColor: 'rgba(99,102,241,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  modalMessage: { fontSize: 14, marginBottom: 4 },
});
