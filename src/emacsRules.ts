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
    apps.ghostty,
    apps.vscode,
    apps.vnc
]).unless()


// The keybindings are customized based on the following Emacs keybindings
// https://www.gnu.org/software/emacs/refcards/pdf/refcard.pdf
const emacsRules = [
    rule('[Emacs] For all app').manipulators([
        map('c', '⌃').to('q', '⌘').condition(ctrlXMode.isEnable),
    ]),

    rule('[Emacs] Ctrl-x + keys', unlessApps).manipulators([
        map('f', '⌃').to('o', '⌘').condition(ctrlXMode.isEnable),
        map('s', '⌃').to('s', '⌘').condition(ctrlXMode.isEnable),
        map('k', '⌃').to('w', '⌘').condition(ctrlXMode.isEnable),
        map('k', '⌃').to('w', '⌘').condition(ctrlXMode.isEnable),

        map('←',null,'⌃').to('tab', ['⇧', '⌃']).condition(ctrlXMode.isEnable),  // backward tab
        map('→',null,'⌃').to('tab', ['⌃']).condition(ctrlXMode.isEnable),       // forward tab
        map('[').to('[', '⌘').condition(ctrlXMode.isEnable),                    // backward page
        map(']').to(']', '⌘').condition(ctrlXMode.isEnable),                    // forward page

        map('x', '⌃').to(ctrlXMode.enable).toDelayedAction(ctrlXMode.disable, ctrlXMode.disable)
    ]),

    rule('[Emacs] Search keys', unlessApps).manipulators([
        map('s', '⌃').to('g', '⌘').condition(searchMode.isEnable),
        map('r', '⌃').to('g', ['⇧', '⌘']).condition(searchMode.isEnable),

        map('s', '⌃').to('f', '⌘').to(searchMode.enable).condition(ctrlXMode.isDisable)
    ]),

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
        map('p', '⌃').to('↑', '⇧').condition(markMode.isEnable),
        map('p', '⌃').to('↑'),
        map('n', '⌃').to('↓', '⇧').condition(markMode.isEnable),
        map('n', '⌃').to('↓'),
        map('b', '⌃').to('←', '⇧').condition(markMode.isEnable),
        map('b', '⌃').to('←'),
        map('b', '⌥').to('←', '⌥'),
        map('f', '⌃').to('→', '⇧').condition(markMode.isEnable),
        map('f', '⌃').to('→'),
        map('f', '⌥').to('→', '⌥'),
        map(',', ['⌥', '⇧']).to('↑', '⌘'), // beginning of page
        map('.', ['⌥', '⇧']).to('↓', '⌘'), // end of page
        map('a', '⌃', '⇧').to('←', ['⇧', '⌘']).condition(markMode.isEnable),
        map('a', '⌃', '⇧').to('←', '⌘'),

        map('e', '⌃', '⇧').to('→', ['⇧', '⌘']).condition(markMode.isEnable),
        map('e', '⌃', '⇧').to('→', '⌘'),
        map('v', '⌃', '⇧').to('page_down'),
        map('v', '⌥', '⇧').to('page_up'),
    ]),
]

export default emacsRules
