import * as vscode from "vscode";

import { getRandomExcuse } from "./excuses";

const excuseCommandId = "bizarreExcuses.getExcuse";

async function getExcuseCommand() {
  const excuseText = getRandomExcuse();

  const copyItem: vscode.MessageItem = { title: "Копировать" };

  const selectedItem = await vscode.window.showInformationMessage(
    excuseText,
    copyItem,
  );

  if (selectedItem === copyItem) {
    await vscode.env.clipboard.writeText(excuseText);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const excuseCommand = vscode.commands.registerCommand(
    excuseCommandId,
    getExcuseCommand,
  );
  context.subscriptions.push(excuseCommand);

  const excuseStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
  );
  context.subscriptions.push(excuseStatusBarItem);

  excuseStatusBarItem.command = excuseCommandId;
  excuseStatusBarItem.text = "$(star-full)";
  excuseStatusBarItem.tooltip = "Получить невероятную отмазку";
  excuseStatusBarItem.show();
}
