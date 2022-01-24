const newForm = document.forms.pairMaker;
const container = document.querySelector('.cryptoContainer');

// const wsGraph = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@kline');

// wsGraph.onmessage = (e) => {
//   const temp = JSON.parse(e.data);
//   console.log(temp);
// };

newForm.addEventListener('submit', async (e) => {
  console.log(e.target);
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(newForm));

  const response = await fetch('/new', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data);
  pair(`${data.user}-${data.id}`, `${data.firstVal}`, `${data.secondVal}`);
});

container.addEventListener('click', async (e) => {
  console.log(e.target.closest('div'));
  const rawId = e.target.closest('div').id;
  console.log('====RAW==================================>', rawId);
  const id = rawId.match(/[\d]+$/g);
  console.log('======================================>', id);
  const response = await fetch(`/delete/${id[0]}`, {
    method: 'DELETE',
  });
  console.log(response);
  if (response.ok) {
    e.target.closest('div').remove();
  }
});

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

    domElement.innerHTML = `<div>${first}/${second} NOW IS ${currentPrice}</div>
    <button name="deleteBtn">delete</delete>`;
  };
}

async function getAllUserPairs() {
  const response = await fetch('/getall');
  const pairs = await response.json();
  pairs.forEach((e) => pair(`${e.name}-${e.id}`, `${e.firstVal}`, `${e.secondVal}`));
}
getAllUserPairs();
