const SRVisualizer = window['sr-visualizer'];

const size = 120;

const cases = `U R U' R'
U' F' U F
F' U' F
R U R'
U' R U R' U2 R U' R'
U F' U' F U2 F' U F
U' R U2 R' U2 R U' R'
U F' U2 F U2 F' U F
U' R U' R' U F' U' F
U' R U R' U R U R'
U' R U2' R' U F' U' F
R U' R' U R U' R' U2 R U' R'
U F' U F U' F' U' F
U' R U' R' U R U R'
M U L F' L' U' M'
R U' R' U2 F' U' F
R U2 R' U' R U R'
R U R' U' R U R' U' F R' F' R
U R U2 R2 F R F'
U' F' U2 F2 R' F' R
R U' R' U2 R U R'
F' L' U2 L F
U2 R2 U2 R' U' R U' R2
U F' L' U L F R U R'
R' U' R' U' R' U R U R
U R U' R' U' F' U F
R U' R' U R U' R'
R U R' U' F R' F' R
R' F R F' R' F R F'
R U R' U' R U R'
R U' R' U F' U F
R U R' U' R U R' U' R U R'
U' R U' R' U2 R U' R'
U F' U F U2 F' U F
U2 R U' R' U' F' U' F
d R' U' R d' R U R'
U U'
R' F R F' R U' R' U R U' R' U2 R U' R'
R U' R' U' R U R' U2 R U' R'
R U' R' U R U2 R' U R U' R'
R F U R U' R' F' U' R'
R U R' U' R U' R' U2 F' U' F`.split('\n');

function counter(move) {
  if (move.length > 1) {
    if (move[1] === "'") return move[0];
    return move;
  }    
  return move + "'";
}

function inverse(moves) {
  const result = moves.split(' ').reverse().map(mv => mv ? counter(mv) : "").join(' ');
  return result;
}

function render() {

  const root = document.getElementById('root');
  root.innerHTML = "";

  const sch = schemeSelect.value;
  const premoves = premovesSelect.value;

  cases.forEach((c, idx) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('case');
    const title = document.createElement('h3');
    const cube = document.createElement('div');
    const alg = document.createElement('p');
    const setup = document.createElement('p');
    
    [title, cube, setup, alg].map(el => wrapper.appendChild(el));

    const alg_ = `${c} ${premoves}`;
    const setup_ = inverse(alg_);

    title.innerText = `F2L ${idx+1}`;
    SRVisualizer.cubePNG(cube, `visualcube.php?fmt=svg&stage=f2l&sch=${sch}&size=${size}&case=${alg_}`);

    alg.innerHTML = `<strong>Solution:</strong> ${alg_}`;
    setup.innerHTML = `<strong>Setup:</strong> ${setup_}`;
    
    root.appendChild(wrapper);
  });

}

const premovesSelect = document.getElementById('premoves');
premoves.onchange = render;

const schemeSelect = document.getElementById('color-scheme');
schemeSelect.onchange = render;

render();