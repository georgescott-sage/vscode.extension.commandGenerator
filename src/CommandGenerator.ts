import { window, workspace, WorkspaceEdit }  from 'vscode';
import * as vscode from 'vscode';
import * as path from 'path';
import { WorkspaceParser } from './WorkspaceParser';
import { Workspace } from './Workspace';

export class CommandGenerator { //implements IDisposable {
  private readonly extension = '.cs';
  constructor() { }
  async execute(): Promise<void> { 
  	const parser = new WorkspaceParser();
    let workspaceDetail : Workspace | undefined = await parser.getProjectWorkspaceDetail();
		if(!workspaceDetail || workspaceDetail == undefined) {
			window.showInformationMessage(`Please open an SBC workspace at the route folder`);
    }
    
    let commandName : string | undefined = await this.showInputBox();

    if (!commandName) {
      return;
    }
    else {
      commandName = commandName.endsWith('Command') ? commandName : commandName += 'Command';
    }

    const filename = `${commandName}${this.extension}`;
    const commandFolderPath = `/src/${workspaceDetail?.name}.Domain.Core/UseCases`
    const folderPath = path.join(workspaceDetail?.root.fsPath ?? '/', commandFolderPath);
    const fullpath = path.join(folderPath, filename);
    let workspaceEdit = new WorkspaceEdit();
    workspaceEdit.createFile(vscode.Uri.file(fullpath));
    vscode.workspace.applyEdit(workspaceEdit);

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