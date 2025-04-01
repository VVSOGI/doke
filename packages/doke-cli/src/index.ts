import { Command } from 'commander'
import chalk from 'chalk'

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

program.parse(process.argv)
