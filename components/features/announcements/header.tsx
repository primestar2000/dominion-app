// components/Header.tsx
import { useTheme } from '@/context/theme-context';
import { View, Text, StyleSheet } from 'react-native';


interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.headerText }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});


