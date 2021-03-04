import { workspace, WorkspaceEdit, Uri, Position } from 'vscode';
import * as path from 'path';
import { Workspace } from './Workspace';
const ejs = require('ejs');

export class FileCreator {
  constructor() { }
  private readonly extension = '.cs';

  async createFiles(workspaceDetail: Workspace, commandName: string, action: string, resource: string) {
    const workspaceEdit = new WorkspaceEdit();
    var templates = [
      {
        template: "Templates/ICommandTemplate.ejs",
        commandName: `I${commandName}`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      },
      {
        template: "Templates/CommandTemplate.ejs",
        commandName: `${commandName}`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Logic/UseCases`
      },
      {
        template: "Templates/CommandRequestTemplate.ejs",
        commandName: `${commandName}Request`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      },
      {
        template: "Templates/CommandResponseTemplate.ejs",
        commandName: `${commandName}Response`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      }
    ];

    for (var templateParams of templates) {
      const filename = path.join(__dirname, templateParams.template);
      let fileContent = "";

      ejs.renderFile(filename, templateParams, {}, (err: any, str: any) => {
        if (err) {
          console.error(err);
        }
        fileContent = str;
      });
      const commandPath = this.getPath(templateParams.commandName, workspaceDetail, templateParams.commandFolder);
      workspaceEdit.createFile(commandPath);
      workspaceEdit.insert(commandPath, new Position(0, 0), fileContent);
    }

    workspace.applyEdit(workspaceEdit);
  }

  getPath(commandName: string, workspace: Workspace | undefined, commandFolderPath: string): Uri {
    const filename = `${commandName}${this.extension}`;
    const folderPath = path.join(workspace?.root.fsPath ?? '/', commandFolderPath);
    return Uri.file(path.join(folderPath, filename));
  }
}