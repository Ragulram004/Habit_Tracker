// theme.js
import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: true,
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _light: '#F9FAFB', _dark: '#1F1F1F' } },
        },
        fg: {
          DEFAULT: { value: { _light: '#1E1E2F', _dark: '#F9FAFB' } }, // light gray in dark mode
        },
        card: {
          DEFAULT: { value: { _light: '#F9FAFB', _dark: '#1F1F1F' } },
        },
        border: {
          DEFAULT: { value: { _light: '#BFBFBF', _dark: '#4D5156' } },
        },
      },
    },
    styles: {
      global: {
        body: {
          bg: 'bg',
          color: 'fg', // ✅ Apply semantic foreground token globally
        },
      },
    },
  },
})

const extendedConfig = mergeConfigs(defaultConfig, customConfig)
const system = createSystem(undefined, extendedConfig)

export default system
