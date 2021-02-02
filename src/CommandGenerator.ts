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

    //TODO: create files from template
    //TODO: parse the servoce name from the workspace?
    //TODO: work out where to place the files in the current workspace
    //TODO: add files to workspace 

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