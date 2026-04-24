import {
    ifInputSource,
    layer,
    map, NumberKeyValue,
    rule, withMapper,
    ifApp
} from 'karabiner.ts'
import apps from "./apps";

// It is not required, but recommended to put symbol alias to layers,
// (If you type fast, use simlayer instead, see https://evan-liu.github.io/karabiner.ts/rules/simlayer)
// to make it easier to write '←' instead of 'left_arrow'.
// Supported alias: https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts
export const symbolMode = layer('/', 'symbol-mode').manipulators([
    //        /  + [ 1    2    3    4    5 ] =>
    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
        map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪', '⎋'])((k) =>
        map(k).toPaste(k),
    ),
])


export const f13ToHyperRule = rule('F13 → Hyper').manipulators([
    map('f13').toHyper()
])

export const f14ToCtrlAltShiftRule = rule('F14 → Cmd+Alt+Ctrl').manipulators([
    map('f14').to('right_command', ['⌥', '⌃'])
])

export const cmdTab = rule('⌘+tab → none').manipulators([
    map('tab', ['⌘']).toNone()
])


// IME中にtoggle するとバグるので一旦利用しない
// export const toggleImeRule = rule('IME binding Ctrl+\\', ifApp([apps.universalcontrol, apps.vnc]).unless()).manipulators([
//     map('\\', '⌃').toInputSource({
//         language: '^ja$',
//     }).condition(ifInputSource({
//         language: '^en$',
//     })),
//     map('\\', '⌃').toInputSource({
//         language: '^en$',
//     }).condition(ifInputSource({
//         language: '^ja$',
//     })),
// ])

