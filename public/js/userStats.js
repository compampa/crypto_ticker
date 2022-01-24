const container = document.querySelector('.cryptoContainer');

function pair(domelem, first, second) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.setAttribute('id', `${domelem}`);
  container.append(box);

  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${first}${second}@trade`);
  const domElement = document.getElementById(`${domelem}`);
  let price = null;

  // eslint-disable-next-line no-return-assign
  return ws.onmessage = (event) => {
    const stock = JSON.parse(event.data);
    const currentPrice = parseFloat(stock.p).toFixed(2);
    console.log(stock.p);
    const temp = currentPrice;
    if (price < currentPrice) {
      domElement.style.color = 'green';
    } else if (price > currentPrice) {
      domElement.style.color = 'red';
    } else domElement.style.color = 'black';
    price = temp;

    domElement.innerHTML = `<div>${first}/${second} NOW IS ${currentPrice}</div>`;
  };
}

const rawId = window.location.pathname;
const id = rawId.match(/[\d]+$/g);
console.log(id);
async function getAllUserPairs() {
  const rawId = window.location.origin;
  const id = rawId.match(/[\d]+$/g);
  const response = await fetch(`/user/${id[0]}`);
  const pairs = await response.json();
  pairs.forEach((e) => pair(`${e.name}-${e.id}`, `${e.firstVal}`, `${e.secondVal}`));
}
getAllUserPairs();
