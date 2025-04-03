import spawn from 'cross-spawn'

export class CommandExecutor {
  public runCommand = (command: string, args: string[], cwd: string): boolean => {
    const result = spawn.sync(command, args, { cwd: cwd, stdio: 'ignore' })
    return result.status === 0
  }
}
