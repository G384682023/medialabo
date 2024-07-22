
function print(data) {
  console.log("検索結果を表示します");

  const resultDiv = document.getElementById('result');
  
  // 前回の検索結果をクリア
  while (resultDiv.firstChild) {
      resultDiv.removeChild(resultDiv.firstChild);
  }

  for (let i of data.results.shop) {
      let table = document.createElement('table');
      let thead = document.createElement('thead');
      let tbody = document.createElement('tbody');

      let headers = ["ジャンル", "アクセス", "住所", "予算", "キャッチコピー", "営業時間", "最寄駅", "サブジャンル"];
      let values = [i.genre.name, i.access, i.address, i.budget.name, i.catch, i.open, i.station_name, i.sub_genre.name];

      for (let j = 0; j < headers.length; j++) {
          let row = document.createElement('tr');
          let th = document.createElement('th');
          let td = document.createElement('td');

          th.textContent = headers[j];
          td.textContent = values[j];

          row.appendChild(th);
          row.appendChild(td);
          tbody.appendChild(row);
      }

      table.appendChild(thead);
      table.appendChild(tbody);
      resultDiv.appendChild(table);
  }
}

let b = document.querySelector('button#searchButton');
b.addEventListener('click', sendRequest);

function sendRequest(event) {
  event.preventDefault(); 

  let s = document.querySelector('select#santaro');
  let idx = s.selectedIndex; 

  let os = s.querySelectorAll('option'); 
  let o = os.item(idx); 

  console.log('選択された ' + idx + ' 番目の option の情報:');
  console.log('  value=' + o.getAttribute('value')); 
  console.log('  textContent=' + o.textContent);

  let genre = o.getAttribute('value');
  if (!genre) {
      console.log('ジャンルが選択されていません');
      return;
  }

  // URL を設定
  let url = 'https://www.nishita-lab.org/web-contents/jsons/hotpepper/' + genre + '.json';

  // 通信開始
  axios.get(url)
      .then(showResult)
      .catch(showError)
      .then(finish);
}

// 通信が成功した時の処理
function showResult(resp) {
  // サーバから送られてきたデータを出力
  let data = resp.data;

  // data が文字列型なら、オブジェクトに変換する
  if (typeof data === 'string') {
      data = JSON.parse(data);
  }
  print(data);
}

// 通信エラーが発生した時の処理
function showError(err) {
  console.log(err);
}

// 通信の最後にいつも実行する処理
function finish() {
  console.log('Ajax 通信が終わりました');
}

