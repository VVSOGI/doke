import { Command } from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'

const program = new Command()

program.name('doke-cli').version('1.0.0', '-v, --version').description('Create relative doke just in time')

program
  .command('init')
  .description('프로젝트 초기화 및 Docker 환경 확인')
  .action(async () => {
    console.log(chalk.blue('프로젝트 초기화 중...'))
    console.log(chalk.blue('Docker 환경 확인 중...'))
    console.log(chalk.green('✅ 프로젝트 초기화가 완료되었습니다.'))
  })

program
  .command('create ui')
  .description('Create doke ui just-in-time')
  .action(async () => {
    console.log(chalk.blue('doke ui를 만드는 중 입니다.'))
    const environment = await selectEnvironment()

    if (environment === 'local') {
      console.log(chalk.blue('로컬 환경으로 설정됩니다.'))
    } else {
      console.log(chalk.blue('도커 환경으로 설정됩니다.'))
    }

    console.log(chalk.green('✅ doke ui가. /path/you/want 에 생성되었습니다.'))
  })

program.parse(process.argv)

export type Environment = 'local' | 'docker'

export async function selectEnvironment(): Promise<Environment> {
  const response = await prompts({
    type: 'select',
    name: 'environment',
    message: 'Which environment do you want to run your project?',
    choices: [
      { title: 'Create local environment', value: 'local' },
      { title: 'Create docker environment', value: 'docker' }
    ],
    initial: 0
  })

  if (response.environment === undefined) {
    process.exit(1)
  }

  return response.environment
}
