## partybingo 

結婚式の二次会などで利用できるJavaScript製のビンゴです。

![partybingo](https://github.com/syumai/partybingo/raw/master/assets/screenshot.png)

### URL

https://syumai.github.io/partybingo/

### 使い方

Startボタンを押すとルーレットがスタートし、Stopボタンを押すとルーレットがストップします。  
ドラムロールは10秒ほど流れます。  
Start / Stopは、スペースキーを押しても動作します。  
なお、ルーレットの履歴はローカルストレージに保存しているため、
再読み込みをしても消えません。  
リセットボタンをクリックすることで履歴をクリアします。  

#### 表示する数字の最大数の変更

* デフォルトでは、最大75までの数字を表示するようになっていますが、URL末尾に `?max=最大数` を足すことで変更が可能です。
  - 例: https://syumai.github.io/partybingo/?max=100

### 動作環境

動作確認は、

* Chrome

でしか行っていません。IEおよびEdgeでは動作しません。
Safariでは、音声が再生されません。(oggを使用しているため）

### Authors

* Originally created by [sifue](https://github.com/sifue/partybingo)
* Updated by [syumai](https://github.com/syumai)

### License

MIT
