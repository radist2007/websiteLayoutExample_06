document.addEventListener("DOMContentLoaded", function(event) { 
    var data = locals; // locals from data.js
    var language = "ua";

    var langLink = document.querySelectorAll('.main a');
    var navInfo = document.querySelector('#navInfo');
    var imgLang = document.querySelector('#imgLang');
    var mainInfo = document.querySelector('#mainInfo');
    var toYourGuess = document.querySelector('#toYourGuess');
    var toMyGuess = document.querySelector('#toMyGuess');
    var linkToBook = document.querySelector('#linkToBook')

    imgLang.addEventListener('click', changeLang, false);

    function changeLang() {
        if (language === "ua") {
            language = "uk";

            changeLangLink();

            navInfo.innerHTML = data.index.header.navInfo[1];
            document.querySelector('#imgLang').src = data.index.header.flagSrc[0];
            mainInfo.innerHTML = data.index.main.Info[1];
            toYourGuess.innerHTML = data.index.main.toYourGuess[1];
            toMyGuess.innerHTML = data.index.main.toMyGuess[1];
            linkToBook.innerHTML = data.common.footer.linkToBook[1];

        }else{

            language = "ua";

            changeLangLink();

            navInfo.innerHTML = data.index.header.navInfo[0];
            document.querySelector('#imgLang').src = data.index.header.flagSrc[1];
            mainInfo.innerHTML = data.index.main.Info[0];
            toYourGuess.innerHTML = data.index.main.toYourGuess[0];
            toMyGuess.innerHTML = data.index.main.toMyGuess[0];
            linkToBook.innerHTML = data.common.footer.linkToBook[0];
        }
    }
    function changeLangLink() {
        for (let i = 0; i < langLink.length; i++) {
            var link =langLink[i].getAttribute("href");
            var test = /\\?lang=/.test(link);
            if (test) {
                var r = new RegExp("\\?lang=");
                var search = link.search(r);
                var sublink = link.substring(0, search);
                langLink[i].setAttribute("href", sublink);
            }else{
                link = link + "?lang=" + language;
                langLink[i].setAttribute("href", link)
            }
        }
    }
})