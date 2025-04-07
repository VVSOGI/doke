import path from 'path'
import fs from 'fs'

const filePath = path.join(__dirname, './', 'dist', 'index.js')
const content = fs.readFileSync(filePath, 'utf8')

if (!content.startsWith('#!/usr/bin/env node')) {
  fs.writeFileSync(filePath, '#!/usr/bin/env node\n' + content)
  console.log('Shebang added to dist/index.js')
}
