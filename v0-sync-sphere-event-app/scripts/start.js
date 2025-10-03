const { spawn } = require('child_process')

const rawPort = process.env.PORT ?? process.env.port ?? '3000'
const port = Number(rawPort)

if (!Number.isFinite(port) || port <= 0) {
  console.error(`Invalid PORT value: ${rawPort}`)
  process.exit(1)
}

const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const args = ['next', 'start', '--hostname', '0.0.0.0', '--port', String(port)]

const child = spawn(npxCommand, args, {
  stdio: 'inherit',
})

child.on('close', (code) => {
  process.exit(code ?? 0)
})

child.on('error', (error) => {
  console.error('Failed to start Next.js:', error)
  process.exit(1)
})
