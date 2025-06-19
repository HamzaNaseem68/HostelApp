import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, Modal, PanResponder, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

const DUMMY_MESSAGES = [
  { id: '1', text: 'Hello! Is this hostel available?', sender: 'student' },
  { id: '2', text: 'Yes, it is available. How can I help you?', sender: 'owner' },
  { id: '3', text: 'I want to know about the facilities.', sender: 'student' },
  { id: '4', text: 'We have WiFi, laundry, and meals included.', sender: 'owner' },
  { id: '5', text: 'That sounds great! What is the monthly rent?', sender: 'student' },
  { id: '6', text: 'It is 5000 PKR per month.', sender: 'owner' },
];

const ChatPreview = () => {
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [input, setInput] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const router = useRouter();
  const pan = useRef(new Animated.ValueXY()).current;
  const { colors, isDarkMode } = useTheme();
  const flatListRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Respond to downward drag anywhere in the chat area
        return gestureState.dy > 20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 60) {
          setShowCallModal(true);
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        { dy: pan.y },
      ], { useNativeDriver: false }),
    })
  ).current;

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'student' }]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'student'
        ? { ...styles.studentBubble, backgroundColor: isDarkMode ? '#176a3a' : '#dcf8c6' }
        : { ...styles.ownerBubble, backgroundColor: isDarkMode ? colors.surface : '#fff' },
    ]}>
      <Text style={[styles.messageText, { color: colors.text }]}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      <View style={[styles.header, { backgroundColor: colors.primary, borderBottomColor: colors.border }] }>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: colors.text }]}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Chat with Owner</Text>
      </View>
      <Animated.View
        style={{ flex: 1, transform: [{ translateY: pan.y }] }}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragIndicatorContainer}>
          <Text style={[styles.dragIndicatorText, { color: colors.textSecondary }]}>↓ Drag down to start call</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current && flatListRef.current.scrollToEnd({ animated: false })}
        />
      </Animated.View>
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }] }>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? colors.background : '#f0f0f0', color: colors.text }]}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.secondary }]} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showCallModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCallModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }] }>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Start Call</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>This would start a call (dummy action).</Text>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: colors.secondary }]} onPress={() => setShowCallModal(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  backText: {
    fontSize: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  studentBubble: {
    alignSelf: 'flex-end',
  },
  ownerBubble: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  dragIndicatorText: {
    fontSize: 13,
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    minWidth: 250,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatPreview; 