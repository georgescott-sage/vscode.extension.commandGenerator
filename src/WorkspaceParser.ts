import * as vscode from 'vscode';
import { Workspace } from './Workspace';

export class WorkspaceParser {

  constructor() { }
  async getProjectWorkspaceDetail(): Promise<Workspace | undefined> { 
    let workspaces = vscode.workspace.workspaceFolders;
    if(!workspaces || workspaces.length == 0 || !workspaces[0].name.startsWith('sbc.')) {
      return undefined;
    }
    else {
      var workspace = workspaces[0];
      var name = workspace.name;
      var uri = workspace.uri;
      vscode.window.showInformationMessage(`SBC name: ${name} SBC root: ${uri}`);
      return new Workspace(workspace.name, workspace.uri);
    }
  }
}