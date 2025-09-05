// 文字数カウント
function countText() {
	var result = document.getElementById("countTextarea").innerText.replace(/\s+/g,'').length;
	result = Math.round(result/100)*100; // 100文字単位で丸める
	document.getElementById("countResult").innerText = '約' + result + '文字';
}

// コピペ時ふりがなON/OFF
function rubyToggle(){
	var rubyToggle = document.querySelector('input#toggle');
	if(rubyToggle.checked === true) {
		rubyOn();
	}else{
		rubyOff();
	}
}

function rubyOff(){
	var c = document.body.className;
	if( c.match(/\s*rubyoff/) ){ return }
	document.body.className = c ? c+" rubyoff" : "rubyoff" ;
	setTimeout( function(){ document.body.className = c }, 100 );
}

function rubyOn(kakkoFlg=true){
	const kakkoBefore = "("; // 前括弧
	const kakkoAfter  = ")"; // 後括弧

	var c = document.body.className;
	if( c.match(/\s*rubyon/) ){ return }
	var rubyOnHTML=new Array();
	var rubyOnText=new Array();
	var ruby = document.getElementsByTagName('ruby');
	// var rp = document.getElementsByTagName('rp');

	// 元の値を保持
	for(var i = 0; i < ruby.length; i++) {
		rubyOnHTML[i] = ruby[i].innerHTML;
		rubyOnText[i] = ruby[i].innerText;
	  }

	// ルビ情報を取得・整形
	for(var i = 0; i < ruby.length; i++) {
		if (kakkoFlg == false) {
			// 括弧が不要な場合
			kakkoBefore = "";
			kakkoAfter  = "";
		}
		ruby[i].innerHTML = ruby[i].innerHTML.replace("<rt>", kakkoBefore) + kakkoAfter;
		ruby[i].innerText = ruby[i].innerHTML.replace(/<r[a-z]*>|<\/r[a-z]*>/g, "");
	  }

	setTimeout( function(){ 
		// 元の値に戻す
		document.body.className = c
		for(var i = 0; i < ruby.length; i++) {
		ruby[i].innerText = rubyOnText[i];
		ruby[i].innerHTML = rubyOnHTML[i];
	  }
	}, 100 );
}


// 単語置換
function changeWord() {
	var arrDefWord=new Array();
	var arrWord=new Array();

	// 置換対象の単語数（決定・リセットボタン分を数から引くため-2する）	
	var wordCount = document.change.getElementsByTagName('input').length - 2;

    for(var i = 0; i < wordCount; i++) {
		var inputItem = document.change.getElementsByTagName('input').item(i);
		arrDefWord[i] = inputItem.placeholder;// 置換前
		arrWord[i] = inputItem.value;// 置換後
	}

	// 置換処理
	for(var i = 0; i < wordCount; i++) {
		if (arrWord[i]) {
		document.body.innerHTML = document.body.innerHTML.split(arrDefWord[i]).join(arrWord[i]);
	}
	document.change.getElementsByTagName('input').item(i).setAttribute('placeholder',arrWord[i]?arrWord[i]:arrDefWord[i]);
	document.change.getElementsByTagName('input').item(i).setAttribute('value',arrWord[i]);
  }
}

// ページ更新
function pageReload(){
	window.location.reload();
}


function clickCopyText() {
    var copyTarget,copyTargets,num,txt,range;
    copyTargets = document.querySelectorAll('.copy');

	var ClickCopy = function() {
		copyTarget = this.textContent;
	
		txt = document.createElement("textarea");
		txt.value = copyTarget;
	
		document.body.appendChild(txt);
		txt.select();
		document.execCommand('copy');
		txt.parentElement.removeChild(txt);
	}

	for(i=0,num=copyTargets.length;i<num;i++) {
        copyTarget = copyTargets[i];
        copyTarget.addEventListener('click',ClickCopy);
    }

};


// アコーディオン
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("li > a").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const nextEl = anchor.nextElementSibling;
      if (nextEl && nextEl.classList.contains("accordion")) {
        if (nextEl.classList.contains("open")) {
          // すでに開いている → 閉じる時だけ preventDefault
          e.preventDefault();
          nextEl.classList.remove("open");
        } else {
          // 開いていない → 通常リンク動作の後に開く
          nextEl.classList.add("open");
        }
      }
    });
  });
});

