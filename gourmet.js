// 検索結果を表示する関数
function print(data) {
  console.log("検索結果を表示します");

  const resultDiv = document.getElementById('result');
  
  // 以前の結果をクリア
  resultDiv.innerHTML = '';

  let count = 1;

  // データの各店舗について処理
  for (let i of data.results.shop) {
    let containerDiv = document.createElement('div');
    
    // 店名を表示
    let storeNameHeading = document.createElement('h3');
    storeNameHeading.innerHTML = `<em>検索結果${count}件目</em>`;
    let storeName = document.createElement('p');
    storeName.textContent = i.name;
    storeNameHeading.appendChild(storeName);
    containerDiv.appendChild(storeNameHeading);

    // テーブルを作成
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // テーブルのヘッダーとデータ
    let headers = ["ジャンル", "住所", "予算", "営業時間", "最寄駅"];
    let values = [i.genre.name, i.address, i.budget.name, i.open, i.station_name];

    // テーブルのヘッダーを作成
    let headerRow = document.createElement('tr');
    let headerTh1 = document.createElement('th');
    headerTh1.textContent = "項目";
    let headerTh2 = document.createElement('th');
    headerTh2.textContent = "詳細";
    headerRow.appendChild(headerTh1);
    headerRow.appendChild(headerTh2);
    thead.appendChild(headerRow);

    // テーブルのデータ行を作成
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
    containerDiv.appendChild(table);
    resultDiv.appendChild(containerDiv);

    count++;
  }
}

// 検索リクエストを送信する関数
function sendRequest(event) {
  event.preventDefault(); // フォームのデフォルト送信を防ぐ

  let s = document.querySelector('select#santaro');
  let genre = s.value;

  if (!genre) {
    console.log('ジャンルが選択されていません');
    return;
  }

  // 選択されたジャンルに基づいてURLを構築
  let url = `https://www.nishita-lab.org/web-contents/jsons/hotpepper/${genre}.json`;

  // Axiosでデータを取得
  axios.get(url)
    .then(showResult)
    .catch(showError)
    .then(finish);
}

// 通信成功時の処理
function showResult(resp) {
  let data = resp.data;

  // 文字列型ならオブジェクトに変換
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  print(data);
}

// 通信エラー時の処理
function showError(err) {
  console.log(err);
}

// 通信終了後に実行する処理
function finish() {
  console.log('Ajax 通信が終わりました');
}

// 検索ボタンにイベントリスナーを追加
document.getElementById('searchButton').addEventListener('click', sendRequest);
