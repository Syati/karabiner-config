import {
    map,
    rule,
    ifApp,
} from 'karabiner.ts'
import apps from "./apps";

// if you want to customize more Chrome shortcuts, refer to the following link
// https://support.google.com/chrome/answer/157179?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Ctab-window-shortcuts

const chromeRules = [
    rule('[Chrome] Basic keys', ifApp(apps.chrome)).manipulators([
        map('f', '⌘').to(']', '⌘'), // forward page
        map('b', '⌘').to('[', '⌘'), // backward page
    ]),
]

export default chromeRules
