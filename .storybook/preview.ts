import type { Preview } from '@storybook/react'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

// const theme = require('../path/to/your/theme')
// export const parameters = {
//   chakra: {
//     theme,
//   },
// }

export default preview
