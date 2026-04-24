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
import { symbolMode, f13ToHyperRule, f14ToCtrlAltShiftRule, cmdTab } from "./common";


writeToProfile('personal', [
    //symbolMode,
    f13ToHyperRule,
    f14ToCtrlAltShiftRule,
    cmdTab

    rule('[Jetbrains] Basic keys', ifApp(apps.jetbrains)).manipulators([
        map('g', '⌃').to('⎋'),
    ]),

    rule('[Ghostty] Basic keys', ifApp(apps.ghostty)).manipulators([
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
