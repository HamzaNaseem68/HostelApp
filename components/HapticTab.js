import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';

export function HapticTab(props) {
  return (
    <Pressable
      {...props}
      onPressIn={(ev) => {
        if (Platform.OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
} 