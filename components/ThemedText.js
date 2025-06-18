import { useColorScheme } from '@/hooks/useColorScheme';
import { Text } from 'react-native';

export function ThemedText({ style, type = 'default', ...props }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textStyles = {
    default: {
      color: isDark ? '#fff' : '#000',
    },
    defaultSemiBold: {
      color: isDark ? '#fff' : '#000',
      fontWeight: '600',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    link: {
      color: '#2e78b7',
    },
  };

  return <Text style={[textStyles[type], style]} {...props} />;
} 