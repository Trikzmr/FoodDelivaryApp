import React from 'react';
import { Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from './Config/colorpallete';

export default function NotFound() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486742.png' }}
          style={styles.image}
        />

        <Text style={styles.title}>🚧 Under Construction</Text>

        <Text style={styles.subtitle}>
          We're working hard to bring this feature to you soon.  
          Stay tuned for something amazing!
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:trikzmr@gmail.com')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Contact Developer</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Want a similar app for your business?  
          Let's make it happen!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.infoAlt,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.infoAlt,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: colors.infoAlt,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
});
