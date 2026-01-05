import {
    map,
    rule,
    writeToProfile,
    ifApp,
    ifDevice,
    ifKeyboardType
} from 'karabiner.ts'
import apps from "./apps";
import emacsRules from "./emacsRules";
import chromeRules from './chromeRule';
import { symbolMode, capsToHyperRule } from "./common";


writeToProfile('personal', [
    //symbolMode,
    capsToHyperRule,    

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
    ...chromeRules
])
