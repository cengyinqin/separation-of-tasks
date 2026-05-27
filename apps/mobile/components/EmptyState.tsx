import { View, Text, StyleSheet } from 'react-native';

interface Props {
  icon: string;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#6C6863',
    textAlign: 'center',
    lineHeight: 22,
  },
});
