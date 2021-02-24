import { window }  from 'vscode';
import { WorkspaceParser } from './WorkspaceParser';
import { Workspace } from './Workspace';
import { FileCreator } from './FileCreator';
export class CommandGenerator { //implements IDisposable {
  private readonly fileCreator: FileCreator;

  constructor() { 
    this.fileCreator = new FileCreator();
  }

  async execute(): Promise<void> { 
  	const parser = new WorkspaceParser();
    const workspaceDetail : Workspace | undefined = await parser.getProjectWorkspaceDetail();
		if(!workspaceDetail || workspaceDetail == undefined) {
			window.showInformationMessage(`Please open an SBC workspace at the route folder`);
      return;
    }
    
    let commandName : string | undefined = await this.showInputBox();

    if (!commandName) {
      window.showInformationMessage(`Please enter a name for the command`);
      return;
    }
    commandName = commandName.endsWith('Command') ? commandName : commandName += 'Command';

    await this.fileCreator.createFiles(commandName, workspaceDetail);
    window.showInformationMessage(`Command: '${commandName}' successfully created`);
  }

  async showInputBox(): Promise<string | undefined> {
    const result = await window.showInputBox({
      value: 'ExampleCommand',
      valueSelection: [0, 7],
      placeHolder: 'For example: GetUserCommand',
      validateInput: this.validate,
    });
    return result;
  }

  validate(commandName: string): string | null {
    if (!commandName) {
      return 'Command name is required';
    }
    if (commandName.includes(' ')) {
      return 'Spaces are not permitted';
    }
    return null;
  }
}