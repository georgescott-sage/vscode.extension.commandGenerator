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
      let workspace = workspaces[0];
      return new Workspace(workspace.name, workspace.uri);
    }
  }
}