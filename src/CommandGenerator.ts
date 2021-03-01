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

    let resourceName : string | undefined = await this.showResourceInputBox();
    
    if (!resourceName) {
      window.showInformationMessage(`Please enter the name of the resource the command will act on`);
      return;
    }
    
    let actionName : string | undefined = await this.showInputBox();

    if (!actionName) {
      window.showInformationMessage(`Please enter a name for the action the command will perform on the resource`);
      return;
    }

    let commandName =  `${actionName}${resourceName}Command`;

    await this.fileCreator.createFiles(commandName, workspaceDetail);
    window.showInformationMessage(`Command: '${commandName}' successfully created`);
  }

  async showResourceInputBox(): Promise<string | undefined> {
    const result = await window.showInputBox({
      value: 'User',
      valueSelection: [0, 7],
      placeHolder: 'For example: User',
      validateInput: this.validate,
    });
    return result;
  }

  async showInputBox(): Promise<string | undefined> {
    const result = await window.showInputBox({
      value: 'Create',
      valueSelection: [0, 7],
      placeHolder: 'For example: Create',
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