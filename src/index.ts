import {
    map,
    rule,
    writeToProfile,
    ifApp,
} from 'karabiner.ts'
import apps from "./apps";
import emacsRules from "./emacsRules";
import {symbolMode, capsToHyperRule, toggleImeRule} from "./common";


writeToProfile('personal', [
    symbolMode,
    capsToHyperRule,
    toggleImeRule,

    rule('[VNC] shortcuts', ifApp(apps.vnc).unless()).manipulators([
        map('spacebar', '⌃⇧').to('spacebar', '⌘⌥⌃⇧'), // For Alfred shortcuts  
        map('\\', '⌃').to('\\', '⌘⌥⌃⇧') // For OSX IME Keyboard shortcuts
    ]),

    rule('[Jetbrains] Basic keys', ifApp(apps.jetbrains)).manipulators([
        map('g', '⌃').to('⎋'),
    ]),

    rule('[Figma] Basic keys', ifApp(apps.figma)).manipulators([
        map('t', '⌃').to('/', '⌘'),
    ]),

    rule('[Notion] Basic keys', ifApp(apps.notion)).manipulators([
        map('t', '⌃').to('k', '⌘'),
    ]),

    ...emacsRules,
])
