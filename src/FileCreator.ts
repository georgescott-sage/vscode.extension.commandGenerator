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
    var params = {
      commandName: commandName,
      resource: resource,
      action: action
    }

    for (var template of [ ICommandTemplate, CommandRequestTemplate, CommandResponseTemplate, CommandTemplate ]) {
      let fileContent = ejs.render(template.template, params);
      const commandPath = this.getPath(template.getName(params.commandName), workspaceDetail, template.getFolder(workspace.name));
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