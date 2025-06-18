import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

export function ThemedView({ style, ...props }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        {
          backgroundColor: isDark ? '#000' : '#fff',
        },
        style,
      ]}
      {...props}
    />
  );
} 