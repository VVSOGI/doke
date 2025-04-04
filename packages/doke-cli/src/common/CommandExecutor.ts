import spawn from 'cross-spawn'

export class CommandExecutor {
  public runCommand = (command: string, args: string[], cwd: string, log: boolean = false): boolean => {
    const result = spawn.sync(command, args, { cwd: cwd, stdio: log ? 'inherit' : 'ignore' })
    return result.status === 0
  }
}
