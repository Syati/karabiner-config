import {
  layer,
  map,
  NumberKeyValue,
  rule,
  withMapper,
  writeToProfile,
  ifVar, toSetVar, ifApp,
} from 'karabiner.ts'


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


const unlessApps = ifApp([
  /^org\.gnu\.Emacs$/,
  /^com\.jetbrains\..*/,
  /^com\.apple\.Terminal$/,
  /^com\.microsoft\.VSCode$/,
]).unless()

writeToProfile('personal', [
  // It is not required, but recommended to put symbol alias to layers,
  // (If you type fast, use simlayer instead, see https://evan-liu.github.io/karabiner.ts/rules/simlayer)
  // to make it easier to write '←' instead of 'left_arrow'.
  // Supported alias: https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts
  layer('/', 'symbol-mode').manipulators([
    //        /  + [ 1    2    3    4    5 ] =>
    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
      map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪', '⎋'])((k) =>
      map(k).toPaste(k),
    ),
  ]),

  rule('[Emacs] Basic keys', unlessApps).manipulators([
    map('g', '⌃').to([searchMode.disable, markMode.disable]).to('⎋'),
    map('[', '⌃').to([searchMode.disable, markMode.disable]).to('⎋'),
    map('d', '⌃').to('delete_forward'),
    map('h', '⌃').to('delete_or_backspace'),
    map('w', '⌃').to(markMode.disable).to('x', '⌘'),
    map('w', '⌥').to(markMode.disable).to('c', '⌘'),
    map('y', '⌃').to('v', '⌘'),
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
    map('e', '⌃', '⇧').to('→', ['⇧','⌘']).condition(markMode.isEnable),
    map('e', '⌃', '⇧').to('→', '⌘'),
    map('v', '⌃', '⇧').to('page_down'),
    map('v', '⌥', '⇧').to('page_up'),
  ]),

  rule('[Emacs] Search keys', unlessApps).manipulators([
    map('s', '⌃',).to('g', '⌘').condition(searchMode.isEnable),
    map('r', '⌃',).to('g', ['⇧', '⌘']).condition(searchMode.isEnable),

    map('s', '⌃').to(searchMode.enable).to('f', '⌘'),
  ]),

  rule('[Emacs] Ctrl-x + keys', unlessApps).manipulators([
      map('c', '⌃').to('q', '⌘').condition(ctrlXMode.isEnable),
      map('f', '⌃').to('o', '⌘').condition(ctrlXMode.isEnable),
      map('s', '⌃').to('s', '⌘').condition(ctrlXMode.isEnable),
      map('k', '⌃').to('w', '⌘').condition(ctrlXMode.isEnable),

      map('x', '⌃').to(ctrlXMode.enable).toDelayedAction(ctrlXMode.disable,ctrlXMode.disable)
  ]),
])
