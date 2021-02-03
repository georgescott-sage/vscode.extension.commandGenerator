import * as vscode from 'vscode';

export class WorkspaceParser {

  constructor() { }
  async getProjectName(): Promise<void> { 
    let workspaces = vscode.workspace.workspaceFolders;
    if(!workspaces || workspaces.length == 0 || !workspaces[0].name.startsWith('sbc.')) {
      vscode.window.showInformationMessage(`Please open an SBC workspace at the route folder`);
      return;
    }
    else {
      var workspace = workspaces[0];
      var name = workspace.name;
      var uri = workspace.uri;
      vscode.window.showInformationMessage(`SBC name: ${name} SBC root: ${uri}`);
      return;
    }
  }
}