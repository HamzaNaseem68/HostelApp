import { useColorScheme } from '@/hooks/useColorScheme';
import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ParallaxScrollView({
  headerBackgroundColor,
  headerImage,
  children,
  ...props
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const headerHeight = 300;
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-headerHeight, 0, headerHeight],
    outputRange: [headerHeight / 2, 0, -headerHeight / 2],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: headerBackgroundColor[isDark ? 'dark' : 'light'],
          },
        ]}>
        <Animated.View
          style={[
            styles.headerImage,
            {
              transform: [{ translateY: imageTranslateY }],
            },
          ]}>
          {headerImage}
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        {...props}>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 300,
    padding: 16,
  },
}); 