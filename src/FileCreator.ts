import { workspace, WorkspaceEdit, Uri, Position } from 'vscode';
import * as path from 'path';
import { Workspace } from './Workspace';
import {ICommandTemplate} from './Templates/ICommandTemplate.ejs';
import {CommandTemplate} from './Templates/CommandTemplate.ejs';
import {CommandResponseTemplate} from './Templates/CommandResponseTemplate.ejs';
import {CommandRequestTemplate} from './Templates/CommandRequestTemplate.ejs';

const ejs = require('ejs');

export class FileCreator {
  constructor() { }
  private readonly extension = '.cs';

  async createFiles(workspaceDetail: Workspace, commandName: string, action: string, resource: string) {
    const workspaceEdit = new WorkspaceEdit();
    var templates = [
      {
        template: ICommandTemplate,
        commandName: `${commandName}`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      },
      {
        template: CommandTemplate,
        commandName: `${commandName}`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Logic/UseCases`
      },
      {
        template: CommandRequestTemplate,
        commandName: `${commandName}Request`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      },
      {
        template: CommandResponseTemplate,
        commandName: `${commandName}Response`,
        resource: `${resource}`,
        action: `${action}`,
        commandFolder: `/src/${workspace?.name}.Domain.Core/UseCases`
      }
    ];

    for (var templateParams of templates) {
      const filename = path.join(__dirname, templateParams.template);
      let fileContent = ejs.render(templateParams.template, templateParams);
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