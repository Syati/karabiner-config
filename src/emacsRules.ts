import {
    map,
    rule,
    ifVar, toSetVar, ifApp,
} from 'karabiner.ts'
import apps from "./apps";


const createMode = (key: string) => {
    return {
        enable: toSetVar(key, 1),
        disable: toSetVar(key, 0),
        //conditions
        isEnable: ifVar(key, 1),
        isDisable: ifVar(key, 0),
    }
}

const ctrlXMode = createMode('ctrl+x')
const searchMode = createMode('ctrl+s')
const markMode = createMode('ctrl+space')

const disableAllMode = [searchMode.disable, markMode.disable, ctrlXMode.disable]

const unlessApps = ifApp([
    apps.emacs,
    apps.jetbrains,
    apps.terminal,
    apps.vscode
]).unless()

const emacsRules = [
    rule('[Emacs] Basic keys', unlessApps).manipulators([
        map('g', '⌃').to(disableAllMode).to('⎋'),
        map('[', '⌃').to(disableAllMode).to('⎋'),
        map('d', '⌃').to('delete_forward'),
        map('h', '⌃').to('delete_or_backspace'),
        map('w', '⌃').to(markMode.disable).to('x', '⌘'),
        map('w', '⌥').to(markMode.disable).to('c', '⌘'),
        map('y', '⌃').to(markMode.disable).to('v', '⌘'),
        map('/', '⌃').to('z', '⌘'),
        map('k', '⌃').to('→', ['⌘', '⇧']).to('x', '⌘'),

        map('spacebar', '⌃').to(markMode.enable).condition(markMode.isDisable),
        map('spacebar', '⌃').to(markMode.disable).condition(markMode.isEnable),
    ]),

    rule('[Emacs] Move cursors', unlessApps).manipulators([
        // Move cursor
        map('p', '⌃').to('↑', '⇧').condition(markMode.isEnable),
        map('p', '⌃').to('↑'),
        map('n', '⌃').to('↓', '⇧').condition(markMode.isEnable),
        map('n', '⌃').to('↓'),
        map('b', '⌃').to('←', '⇧').condition(markMode.isEnable),
        map('b', '⌃').to('←'),
        map('f', '⌃').to('→', '⇧').condition(markMode.isEnable),
        map('f', '⌃').to('→'),
        map('a', '⌃', '⇧').to('←', ['⇧', '⌘']).condition(markMode.isEnable),
        map('a', '⌃', '⇧').to('←', '⌘'),
        map('e', '⌃', '⇧').to('→', ['⇧', '⌘']).condition(markMode.isEnable),
        map('e', '⌃', '⇧').to('→', '⌘'),
        map('v', '⌃', '⇧').to('page_down'),
        map('v', '⌥', '⇧').to('page_up'),
    ]),

    rule('[Emacs] Search keys', unlessApps).manipulators([
        map('s', '⌃',).to('g', '⌘').condition(searchMode.isEnable),
        map('r', '⌃',).to('g', ['⇧', '⌘']).condition(searchMode.isEnable),

        map('s', '⌃').to('f', '⌘').to(searchMode.enable).condition(ctrlXMode.isDisable)
    ]),

    rule('[Emacs] Ctrl-x + keys', unlessApps).manipulators([
        map('c', '⌃').to('q', '⌘').condition(ctrlXMode.isEnable),
        map('f', '⌃').to('o', '⌘').condition(ctrlXMode.isEnable),
        map('s', '⌃').to('s', '⌘').condition(ctrlXMode.isEnable),
        map('k', '⌃').to('w', '⌘').condition(ctrlXMode.isEnable),

        map('x', '⌃').to(ctrlXMode.enable).toDelayedAction(ctrlXMode.disable, ctrlXMode.disable)
    ]),
]

export default emacsRules
