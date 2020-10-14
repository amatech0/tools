概要
togglで記録している時間データを工数入力システムにひっぱてくるブックマークレットです。
togglのプロジェクトと工数入力システムのプロジェクトを対応させて値を入力します。

準備
1.togglの情報を入力する。
　ブックマークレットの下記変数にtogglの情報を入力する。
　var toggl_api = "togglのapiトークン";
  var toggl_email = "togglに登録しているemailアドレス";
  var workspace_id = "togglのワークスペースid";
　※apiトークンの取得方法
　　①ブラウザ版togglを開く。
　　②[profile setting]を開く。
　　③画面下部[API token]に記載の文字列

  ※ワークスペースidの取得方法
  　①ブラウザ版togglを開く
  　②[team]タブを開く。
  　③urlの[team/]以下の数字がワークスペースid。

2.入力先の工数入力プロジェクトを工数入力画面でお気に入りに登録する。

3.togglプロジェクトと入力先の工数入力プロジェクトを設定する。
　ブックマークレットの下記変数に工数入力プロジェクトの名称を設定する。
  var UserInquiry = "togglプロジェクト「UserInquiry」の連携先工数入力プロジェクト名";
  var UserSupport = "togglプロジェクト「UserSupport」の連携先工数入力プロジェクト名";
  var BugDevelopment = "togglプロジェクト「BugDevelopment」の連携先工数入力プロジェクト名";
  var BugEvalution = "togglプロジェクト「BugEvalution」の連携先工数入力プロジェクト名";
  var FunctionDevelopment = "togglプロジェクト「FunctionDevelopment」の連携先工数入力プロジェクト名";
  var FunctionEvalution = "togglプロジェクト「FunctionEvalution」の連携先工数入力プロジェクト名";
  var MTG = "togglプロジェクト「MTG」タグ無し連携先工数入力プロジェクト名";
  var MTG_Review = "togglプロジェクト「MTG」タグ「Review」の連携先工数入力プロジェクト名";
  var Others = "togglプロジェクト「Others」タグなしの連携先工数入力プロジェクト名";
  var Others_ForProduct = "togglプロジェクト「Others」タグ「ForProduct」の連携先工数入力プロジェクト名";
  var Others_ForShipment = "togglプロジェクト「Others」タグ「ForShipment」の連携先工数入力プロジェクト名";
  var Others_ForManagement = "togglプロジェクト「Others」タグ「ForManagemnet」の連携先工数入力プロジェクト名";

  入力例）
  var UserInquiry = "A";
　var UserSupport = "B";
　var BugDevelopment = "B";
　var BugEvalution = "";

　「UserInquiry」のデータは「A」欄に入力される。
　「UserSupport」と「BugDevelopment」のデータは合算されて「B」欄に入力される。
　「BugEvalution」のデータは連携先工数入力プロジェクトがないため連携されない。
　
　※お気に入り登録後の工数入力画面の「プロジェクト実績」欄の列をそのままコピペしてください。

4.コードをコンパイルする。
 Closure Compilerでコードをコンパイルする。
　https://closure-compiler.appspot.com/home

 [Closure Compilerの使い方]
 https://developers.google.com/closure/compiler/docs/gettingstarted_ui

5.ブックマークとして登録する。
　ブラウザのブックマークにurlを下記内容で登録する。(chrome/FireFoxで動作確認済み)

　「javascript:コンパイル後コード」

使い方
1.工数入力画面を開く。
2.ブックマークに登録したブックマークレットを実行する。

　※連携togglプロジェクト,タグの追加方法
　　1.連携プロジェクト定義用の変数の追加
　　　準備の手順3で設定したように、任意の変数と連携先工数入力プロジェクトを定義する。
　　-プロジェクト追加の場合
　 ２．checkData関数内の「targetPrj」に対するswitch文に
　　　　追加したいtogglプロジェクトのcaseを追加する。
　 -タグ追加の場合
　　2.checkData関数内の「MTG」を参考に
　　　タグを読む分岐を追加する。
　　　
