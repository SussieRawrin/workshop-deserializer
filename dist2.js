Map(4) {
  'settings' => Map(4) {
    'main' => DictionaryLeaf {
      value: Map(1) {
        'Description' => '"Welcome to Blizard World Escape! 4 heroes have been trapped in Blizz World and must capture objectives and find the key to escape. Best of luck! (Made by CrimsonRend) [Version 1.2.0] Check out this game on workshop.codes for more info!"'
      }
    },
    'lobby' => DictionaryLeaf {
      value: Map(8) {
        'Allow Players Who Are In Queue' => 'Yes',
        'Data Center Preference' => 'Brazil',
        'Map Rotation' => 'After A Game',
        'Match Voice Chat' => 'Enabled',
        'Max Spectators' => 12,
        'Return To Lobby' => 'Never',
        'Team Balancing' => 'After A Mirror Match',
        'Use Experimental Update If Available' => 'Yes'
      }
    },
    'modes' => Map(5) {
      'disabled Assault' => DictionaryLeaf {
        value: Map(4) {
          'Competitive Rules' => 'On',
          'Game Mode Start' => 'Manual',
          'Health Pack Respawn Time Scalar' => '10%',
          'Respawn Time Scalar' => '0%'
        }
      },
      'Deathmatch' => VoidLeaf { value: false },
      'disabled Elimination' => DictionaryLeaf {
        value: Map(3) {
          'Game Mode Start' => 'Manual',
          'Health Pack Respawn Time Scalar' => '10%',
          'Respawn Time Scalar' => '0%'
        }
      },
      'General' => DictionaryLeaf { value: Map(1) { 'Hero Limit' => 'Off' } },
      'Skirmish' => Map(1) {
        'enabled maps' => SetLeaf { value: [ 'Blizzard World Winter' ] }
      }
    },
    'heroes' => Map(3) {
      'Team 1' => Map(2) {
        'Ashe' => DictionaryLeaf {
          value: Map(2) {
            'Coach Gun Knockback Scalar Enemy' => '75%',
            'Coach Gun Knockback Scalar Self' => '75%'
          }
        },
        'Mercy' => DictionaryLeaf {
          value: Map(1) { 'Resurrect Cooldown Time' => '200%' }
        }
      },
      'Team 2' => Map(3) {
        'Ana' => DictionaryLeaf {
          value: Map(9) {
            'Biotic Grenade Cooldown Time' => '80%',
            'Damage Dealt' => '30%',
            'Healing Dealt' => '200%',
            'Health' => '125%',
            'No Ammunition Requirement' => 'On',
            'Projectile Speed' => '275%',
            'Sleep Dart Cooldown Time' => '84%',
            'Ultimate Generation - Combat Nano Boost' => '200%',
            'Ultimate Generation - Passive Nano Boost' => '300%'
          }
        },
        'Winston' => DictionaryLeaf {
          value: Map(13) {
            'Barrier Projector Cooldown Time' => '131%',
            'Damage Dealt' => '134%',
            'Health' => '50%',
            'Jump Pack Acceleration Scalar' => '80%',
            'Jump Pack Cooldown Time' => '134%',
            'Jump Pack Knockback Scalar' => '50%',
            'Movement Speed' => '105%',
            'No Ammunition Requirement' => 'On',
            'Primal Rage Melee Knockback Scalar' => '50%',
            'Primary Fire' => 'Off',
            'Ultimate Duration' => '120%',
            'Ultimate Generation - Combat Primal Rage' => '200%',
            'Ultimate Generation - Passive Primal Rage' => '300%'
          }
        },
        'disabled heroes' => SetLeaf { value: [ 'Doomfist', 'Lúcio' ] }
      },
      'General' => Map(3) {
        'Echo' => DictionaryLeaf {
          value: Map(1) { 'Spawn With Ultimate Ready' => 'On' }
        },
        'Ultimate Generation: 150%' => VoidLeaf { value: false },
        'enabled heroes' => SetLeaf { value: [ 'Tracer', 'Doomfist', 'Winston' ] }
      }
    }
  },
  'variables' => VariablesLeaf {
    value: Map(2) {
      'global' => Map(11) {
        0 => 'Map_Progression',
        1 => 'GateUnlockProgression',
        2 => 'DifficultyLevelSwitch',
        3 => 'ExpertChallengeSwitch',
        26 => 'StarPoints',
        27 => 'CrucibleOfSouls',
        28 => 'IronHeartMode',
        29 => 'IronHeart',
        30 => 'CrucicbleOfSoulsMode',
        31 => 'CursedClock',
        32 => 'CursedClockMode'
      },
      'player' => Map(2) { 25 => 'Adrenaline', 26 => 'Corruption' }
    }
  },
  'rule("respawn (owner only)")' => Map(3) {
    'event' => CodeBlockLeaf {
      value: [ 'Ongoing - Each Player;', 'All;', 'All;' ]
    },
    'conditions' => CodeBlockLeaf {
      value: [
        'Compare(True, ==, True) == True;',
        'Is Button Held(Event Player, Ultimate) == True;',
        'Hero Of(Event Player) != Hero(Zarya);'
      ]
    },
    'actions' => CodeBlockLeaf { value: [ 'Resurrect(Event Player);' ] }
  },
  'rule("Rule 6")' => Map(3) {
    'event' => CodeBlockLeaf {
      value: [ 'Ongoing - Each Player;', 'All;', 'Zarya;' ]
    },
    'conditions' => CodeBlockLeaf {
      value: [ 'Is Button Held(Event Player, Ultimate) == True;' ]
    },
    'actions' => CodeBlockLeaf {
      value: [
        'Set Ultimate Charge(Event Player, 100);',
        'Wait(0.001, Ignore Condition);',
        'Abort If Condition Is False;',
        'Set Status(Event Player, Null, Knocked Down, 0.001);',
        'disabled Wait(0.016, Ignore Condition);',
        'Press Button(Event Player, Ultimate);',
        'Stop Holding Button(Event Player, Ultimate);',
        'disabled Wait(0.016, Ignore Condition);',
        'Loop If Condition Is True;'
      ]
    }
  }
}