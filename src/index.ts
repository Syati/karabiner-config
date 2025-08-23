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


    rule('[VNC] shortcuts a', ifApp([apps.vnc, apps.universalcontrol])).manipulators([
        // 内蔵キーボードからの入力は無視（親PCには送らない）
        map('spacebar', '⌃⇧')
            .to('vk_none')
            .condition(ifDevice({ is_built_in_keyboard: true })),

        // 内蔵キーボード以外（Universal Control 由来）はそのまま通す
        map('spacebar', '⌃⇧')
            .to('spacebar', '⌃⇧')
            .condition(ifDevice({ is_built_in_keyboard: false }))
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
    ...chromeRules
])
