import {
    map,
    rule,
    writeToProfile,
    ifApp,
} from 'karabiner.ts'
import apps from "./apps";
import emacsRules from "./emacsRules";
import {symbolMode, capsToHyperRule} from "./common";


writeToProfile('personal', [
    symbolMode,
    capsToHyperRule,
    ...emacsRules,

    rule('[Jetbrains] Basic keys', ifApp(apps.jetbrains)).manipulators([
        map('g', '⌃').to('⎋'),
    ]),

    rule('[Figma] Basic keys', ifApp(apps.figma)).manipulators([
        map('g', '⌃').to('⎋'),
        map('t', '⌃').to('/', '⌘'),
    ])
])
