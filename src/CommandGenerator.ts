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

    await this.createFiles(commandName, workspaceDetail);
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

  async createFiles(commandName: string, workspaceDetail : Workspace) {
    const workspaceEdit = new WorkspaceEdit();
    var templates = [
      {
        template: "Templates/ICommandTemplate.ejs",
        commandName: `I${commandName}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      }
    ]

    for (var templateParams of templates) {
      const filename = path.join(__dirname, templateParams.template);
      let fileContent = "";

      ejs.renderFile(filename, templateParams, {}, (err: any, str: any) => {
        if (err) {
          console.error(err);
        }
        fileContent = str;
      });
      const interfaceCommandFolderPath = templateParams.commandFolder;
      const commandPath = this.getPath(templateParams.commandName, workspaceDetail, interfaceCommandFolderPath);
      workspaceEdit.createFile(commandPath);
      workspaceEdit.insert(commandPath, new Position(0,0), fileContent);
    }

    workspace.applyEdit(workspaceEdit);
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