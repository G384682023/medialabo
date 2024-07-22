function print(data) {
  console.log("検索結果を表示します");

  const r = document.getElementById('result');
  
  while (r.firstChild) {
    r.removeChild(r.firstChild);
  }

  let c = 1;

  for (let i of data.results.shop) {
    let h = document.createElement('h3');
    let e = document.createElement('em');
    e.textContent = `検索結果${c}件目`;
    h.appendChild(e);

    let p = document.createElement('p');
    p.textContent = i.name;

    let d = document.createElement('div');
    d.appendChild(h);
    d.appendChild(p);

    let t = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let thRow = document.createElement('tr'); // テーブルヘッダー行用
    let th1 = document.createElement('th');
    th1.textContent = "項目";
    let th2 = document.createElement('th');
    th2.textContent = "詳細";
    thRow.appendChild(th1);
    thRow.appendChild(th2);
    thead.appendChild(thRow);

    let headers = ["ジャンル", "アクセス", "住所", "予算", "キャッチコピー", "営業時間", "最寄駅", "サブジャンル"];
    let values = [i.genre.name, i.access, i.address, i.budget.name, i.catch, i.open, i.station_name, i.sub_genre.name];

    for (let j = 0; j < headers.length; j++) {
      let row = document.createElement('tr');
      let th = document.createElement('th');
      th.textContent = headers[j];
      let td = document.createElement('td');
      td.textContent = values[j];
      row.appendChild(th);
      row.appendChild(td);
      tbody.appendChild(row);
    }

    t.appendChild(thead);
    t.appendChild(tbody);
    d.appendChild(t);
    r.appendChild(d);

    c++;
  }
}


// 検索リクエストを送信する関数
function sendRequest(event) {
  event.preventDefault(); // フォームのデフォルト送信を防ぐ

  let s = document.querySelector('select#santaro');
  let g = s.value;

  if (!g) {
    console.log('ジャンルが選択されていません');
    return;
  }

  // 選択されたジャンルに基づいてURLを構築
  let url = `https://www.nishita-lab.org/web-contents/jsons/hotpepper/${g}.json`;

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

