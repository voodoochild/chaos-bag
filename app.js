const PLUS_ONE = '+1';
const ZERO = '0';
const MINUS_ONE = '-1';
const MINUS_TWO = '-2';
const MINUS_THREE = '-3';
const MINUS_FOUR = '-4';
const MINUS_FIVE = '-5';
const MINUS_SIX = '-6';
const MINUS_SEVEN = '-7';
const MINUS_EIGHT = '-8';
const SKULL = 'Skull';
const CULTIST = 'Cultist';
const TABLET = 'Tablet';
const ELDER_THING = 'Elder Thing';
const TENTACLE = 'Tentacle';
const ELDER_SIGN = 'Elder Sign';

const tokenPool = [
  PLUS_ONE,
  ZERO,
  MINUS_ONE,
  MINUS_TWO,
  MINUS_THREE,
  MINUS_FOUR,
  MINUS_FIVE,
  MINUS_SIX,
  MINUS_SEVEN,
  MINUS_EIGHT,
  SKULL,
  CULTIST,
  TABLET,
  ELDER_THING,
  TENTACLE,
  ELDER_SIGN
];

const tokenState = {
  [TENTACLE]: 1,
  [ELDER_SIGN]: 1
};

const drawHistory = [];

function drawToken() {
  const tokens = Object.keys(tokenState);
  const index = Math.floor(Math.random() * Math.floor(tokens.length));

  drawHistory.unshift(tokens[index]);
}

m.mount(document.getElementById('mount'), {
  oninit() {
    this.showSetup = true;
  },

  toggleSetup() {
    this.showSetup = !this.showSetup;
  },

  view() {
    return [
      m(
        'a.toggle-setup',
        {
          onclick: this.toggleSetup.bind(this)
        },
        this.showSetup ? 'Hide setup' : 'Show setup'
      ),

      this.showSetup &&
        m(
          'form.setup',
          tokenPool.map(token =>
            m(
              'label',
              m('span', token),
              m(
                'select',
                {
                  value: tokenState[token],
                  onchange(e) {
                    tokenState[token] = parseInt(e.target.value, 10);
                  }
                },
                m('option[value=0]', 0),
                m('option[value=1]', 1),
                m('option[value=2]', 2),
                m('option[value=3]', 3),
                m('option[value=4]', 4),
                m('option[value=5]', 5)
              )
            )
          )
        ),

      m(
        '.bag',
        tokenPool
          .reduce((acc, token) => {
            const count = tokenState[token];

            return count && count > 0
              ? acc.concat(new Array(count).fill(token))
              : acc;
          }, [])
          .join(', ')
      ),

      m('button[type=button].draw', { onclick: drawToken }, 'Draw a token'),

      drawHistory[0] && m('.last-token', drawHistory[0])
    ];
  }
});
