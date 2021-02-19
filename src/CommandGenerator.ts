import { window, workspace, WorkspaceEdit, Uri, Position }  from 'vscode';
import * as path from 'path';
import { WorkspaceParser } from './WorkspaceParser';
import { Workspace } from './Workspace';
let ejs = require('ejs');
export class CommandGenerator { //implements IDisposable {
  private readonly extension = '.cs';
  constructor() { }
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

    const filename = path.join(__dirname, "Templates/ICommandTemplate.ejs");
    let fileContent = commandName;
    ejs.renderFile(filename, {commandName}, {}, (err: any, str: any) => {
        if (err) {
          console.error(err);
        }

        fileContent = str;
      })
    const interfaceCommandFolderPath = `/src/${workspace?.name}.Domain.Core/UseCases`
    const interfaceCommandPath = this.getPath(`I${commandName}`, workspaceDetail, interfaceCommandFolderPath);
    const commandFolderPath = `/src/${workspace?.name}.Domain.Logic/UseCases`
    const commandPath = this.getPath(commandName, workspaceDetail, commandFolderPath);
    const workspaceEdit = new WorkspaceEdit();
    workspaceEdit.createFile(interfaceCommandPath);
    workspaceEdit.createFile(commandPath);
    workspaceEdit.insert(interfaceCommandPath, new Position(0,0), fileContent)
    workspace.applyEdit(workspaceEdit);

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

  getPath(commandName: string, workspace: Workspace | undefined, commandFolderPath: string): Uri {
    const filename = `${commandName}${this.extension}`;
    const folderPath = path.join(workspace?.root.fsPath ?? '/', commandFolderPath);
    return Uri.file(path.join(folderPath, filename));
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