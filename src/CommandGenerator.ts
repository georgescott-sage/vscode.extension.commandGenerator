import { window }  from 'vscode';
import { WorkspaceParser } from './WorkspaceParser';

export class CommandGenerator { //implements IDisposable {
  constructor() { }
  async execute(): Promise<void> { 
  	const parser = new WorkspaceParser();
    let workspace = parser.getProjectWorkspaceDetail();
		if(!workspace) {
			window.showInformationMessage(`Please open an SBC workspace at the route folder`);
    }
    
    let commandName : string | undefined = await this.showInputBox();

    if (!commandName) {
      return;
    }
    else {
      commandName = commandName.endsWith('Command') ? commandName : commandName += 'Command';
    }

    //TODO: create files from template
    //TODO: work out where to place the files in the current workspace
    //TODO: add files to workspace 

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