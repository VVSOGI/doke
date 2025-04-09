import prompts from 'prompts'

export type Environment = 'local' | 'docker'

export class SelectCommand {
  static chooseEnvironment = async (): Promise<Environment> => {
    const response = await prompts({
      type: 'select',
      name: 'environment',
      message: 'Which environment do you want to run your project?',
      choices: [
        { title: 'Generate local environment', value: 'local' },
        { title: 'Generate docker environment', value: 'docker' }
      ],
      initial: 0
    })

    if (response.environment === undefined) {
      process.exit(1)
    }

    return response.environment
  }
}
