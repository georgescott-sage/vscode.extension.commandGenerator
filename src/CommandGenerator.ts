import * as vscode from 'vscode';

export class CommandGenerator { //implements IDisposable {
  private readonly extension = '.cs';

  private readonly defaultPath = 'src/state/ducks';
  private readonly title = 'Create Command';

  constructor() { }
  async execute(): Promise<void> { 
    let commandName : string | undefined = await this.showInputBox();

    if (!commandName) {
      return;
    }
    else {
      commandName = commandName.endsWith('Command') ? commandName : commandName += 'Command';
    }

    vscode.window.showInformationMessage(`Command: '${commandName}' successfully created`);
  }

  async showInputBox(): Promise<string | undefined> {
    const result = await vscode.window.showInputBox({
      value: 'ExampleCommand',
      valueSelection: [0, 7],
      placeHolder: 'For example: GetUserCommand',
      validateInput: text => {
        vscode.window.showInformationMessage(`Validating: ${text}`);
        return text === '123' ? 'Not 123!' : null;
      }
    });
    return result;
  }
}