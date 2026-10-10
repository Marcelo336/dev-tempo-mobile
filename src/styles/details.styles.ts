import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './colors';

export const detailsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },

  container: {
    flex: 1
  }, 

  backButton: {
    padding: spacing.md,
    marginTop: spacing.md
  },

  backButtonText: {
    ...typography.body,
    color: colors.primary
  },

  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md
  },

  title:{
    ...typography.title,
    color: colors.text,
    textAlign: 'center'
  },

  subtitle: {
    ...typography.subtitle,    
    textAlign: 'center',
    marginTop: spacing.xs,
    color: colors.textSecondary
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2
  },

  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
     marginTop: spacing.md
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md
  },
  errorText: {
    ...typography.body,
    color: colors.error, // Cor de erro (vermelho, por exemplo)
    textAlign: 'center',
    marginBottom: spacing.md
  },
  retryButton: {
    backgroundColor: colors.primary, // Cor de fundo do botão de tentar novamente
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm
  },
  retryButtonText: {
    ...typography.button, // Estilo de texto para botão
    color: colors.buttonText, // Cor do texto do botão
    fontWeight: 'bold'
  }
})
