import {Uri} from 'vscode';

export class Workspace {
  public name: string;
  public root: Uri;

  constructor(name: string, root: Uri) {
    this.name = name,
    this.root = root;
  }

}
