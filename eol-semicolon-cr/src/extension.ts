import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.eol-semicolon-cr', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('Open a file to edit');
      return;
    }

    const line = editor.document.lineAt(editor.selection.active.line);

    if (line.text.length == 0 ) {
      vscode.window.showErrorMessage('Try with a non-empty line');
      return;
    }

    let position = new vscode.Position(line.lineNumber, line.text.length);

    editor.edit((editBuilder) => {
      if (position.character == 0 || line.text.charAt(position.character - 1) != ';') {
        editBuilder.insert(position, ';'); //Insert semicolon at EoL

        // Insert new line
        vscode.commands.executeCommand('editor.action.insertLineAfter');
      }
    });
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }