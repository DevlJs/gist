
function q(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
(function($) {



    var resultCss_Width = "39%",
        resultCss_Width_Max = "100%",

        resultCss_Left = "61%",
        resultCss_Left_Non = "0%",

        editr_Width = "60%",
        editr_Width_Non = "0%",
        editr_Width_Max = "100%";

    var my = function() {
        var k = new Kibo();
        k.down(['up', 'down'], function() {
          document.write('up or down arrow key pressed');
        }).up('tab', function() {
          document.write('TAB key released');
        });
    }

    my.prototype.init = function(){
        $.post('http://localhost:8080/php/proxy.gist.php', {
            id: q("id")
        }, function(result) {

            var jsArr = new Array(),
                cssArr = new Array(),
                htmlArr = new Array();

            for (var i in result.files) {
                if (i.indexOf('.html') > 0) {
                    htmlArr.push(i);
                } else if (i.indexOf('.js') > 0) {
                    jsArr.push(i);
                } else if (i.indexOf('.css') > 0) {
                    cssArr.push(i);
                }
            }
            $(".editr").attr("data-files-html", "$" + q("id") + "," + htmlArr.join(","));
            if (cssArr.join(",").length > 0) {
                $(".editr").attr("data-files-css", "$" + q("id") + "," + cssArr.join(","));
            }
            $(".editr").attr("data-files-js", "$" + q("id") + "," + jsArr.join(","));
            $('.editr').each(function() {
                var editr = new Editr({
                    el: this,
                    path: './',
                    view: 'vertical',
                    gistProxyURL: 'http://localhost:8080/php/proxy.gist.php',
                    callback: function(editr) {
                        $(".editr__editor").addClass("ace-spacegray");
                        $(".editr__editor").css("font-size", "16px");
                        //console.log(editr);
                    },
                    navCallback:function(type){
                        if(type == 'result'){
                            $(".editr__result").width(resultCss_Width_Max);
                            $(".editr__result").css("left",resultCss_Left_Non);
                            $(".editr__editor").width(editr_Width_Non);
                            $(".editr__editor.active").width("-1%");
                        }else{
                            $(".editr__editor").width(editr_Width);
                            $(".editr__result").width(resultCss_Width);
                            $(".editr__result").css("left",resultCss_Left);
                        }
                        console.log('navCallback',type);
                    }
                });

            })
        });
    }

    new my().init();
}($))
