//// 注意: 以下は編集しないこと!
let data = [
	{name:'札幌', lat:43.06417, lng:141.34694},
	{name:'仙台', lat:38.26889, lng:140.87194},
	{name:'新宿', lat:35.68944, lng:139.69167},
	{name:'名古屋', lat:35.18028, lng:136.90667},
	{name:'大阪', lat:34.68639, lng:135.52},
	{name:'広島', lat:34.39639, lng:132.45944},
	{name:'高知', lat:33.55972, lng:133.53111},
	{name:'福岡', lat:33.60639, lng:130.41806},
	{name:'鹿児島', lat:31.56028, lng:130.55806},
	{name:'沖縄', lat:26.2125, lng:127.68111}
];
//// 注意: 以上は編集しないこと!

// 練習4-2 メッセージ追加プログラム
let h2 = document.querySelector("h2#ex42");
let p = document.createElement('p'); 

p.textContent = '写真集と都市の緯度経度のページです';
h2.insertAdjacentElement('afterend', p); 
p.style.textEmphasis='sesame green'; 


// 練習4-3 写真表作成プログラム

div = document.querySelector('div#phototable');
let p1 = document.createElement('img');
p1.setAttribute('src','taro.png');
p.insertAdjacentElement('beforeend', p1);
div.insertAdjacentElement('beforeend', p);

let p10 = document.createElement('p'); 
let p11 = document.createElement('img');
p11.setAttribute('src','jiro.png');
p10.insertAdjacentElement('beforeend', p11);
div.insertAdjacentElement('beforeend', p10);

let p20 = document.createElement('p'); 
let p21 = document.createElement('img');
p21.setAttribute('src','hanako.png');
p20.insertAdjacentElement('beforeend', p21);
div.insertAdjacentElement('beforeend', p20);


// 練習4-4 箇条書き削除プログラム

let w = document.querySelectorAll('ul#location > li');
for (let n of w){
  n.remove();
} 

// 練習4-5 箇条書き追加プログラム

let w2 = document.querySelector('ul#location');
for(let n of data){
	let li = document.createElement("li");
	li.textContent = n.name+" ... 緯度:"+n.lat+", 経度:"+n.lng;
	w2.insertAdjacentElement('beforeend', li);
}


