"use strict";!function(){var s=location.search.substring(1).split("=")[1];$.ajax({url:"http://10.31.157.28/js1907/project/php/detail.php",data:{sid:s},dataType:"json"}).done(function(t){$("#smallpic").attr("sid",t.sid),$(".iteminfo").find("h1").html(t.title2),$(".price-panel").find("em").html(t.price);var i=t.urls.split(","),e=t.zoom.split(",");$("#bpic").attr("src",e[0]),$("#smallpic").attr("src",e[0]),$.each(i,function(t,i){$(".dt-thumb .list").find("img").eq(t).attr("src",i)}),$.each(e,function(t,i){$(".dt-thumb .list").find("img").eq(t).attr("zoom",i)})}),function(){$("#sf").width($("#spic").width()*$("#bf").width()/$("#bpic").width()),$("#sf").height($("#spic").height()*$("#bf").height()/$("#bpic").height());var s=$("#bpic").width()/$("#spic").width();$("#spic").hover(function(){$("#sf").show(),$("#bf").show(),$(document).mousemove(function(t){var i=t.pageX-$("#spic").offset().left-$("#sf").width()/2,e=t.pageY-$("#spic").offset().top-$("#sf").height()/2;i<=0?i=0:i>=$("#spic").width()-$("#sf").width()&&(i=$("#spic").width()-$("#sf").width()),e<=0?e=0:e>=$("#spic").height()-$("#sf").height()&&(e=$("#spic").height()-$("#sf").height()),$("#sf").css({left:i,top:e}),$("#bpic").css({left:-i*s,top:-e*s})})},function(){$("#sf").hide(),$("#bf").hide()}),$(".dt-thumb .list li").on("click",function(){$(this).index(),$(this).addClass("selected").siblings().removeClass("selected"),$("#smallpic").attr("src",$(this).find("img").attr("zoom")),$("#bpic").attr("src",$(this).find("img").attr("zoom")),$("#smallpic").stop().animate({opacity:0},100,function(){$("#smallpic").stop().animate({opacity:1},800)})})}(),function(){$(".buy_total .i-detail").on("click",function(){var t=parseInt($(".input").children("input").val());0===$(this).index()&&(--t<=1&&(t=1),$(".input").children("input").val(t)),2===$(this).index()&&(t++,$(".input").children("input").val(t))});var o=[],a=[];function n(){getcookie("cookiesid")&&getcookie("cookienum")&&(o=getcookie("cookiesid").split(","),a=getcookie("cookienum").split(","))}$(".selBuyNum").keyup(function(){var t=$(this);if(/[^\d]/.test(t.val())){var i=t.val().replace(/[^\d]/g,"");$(this).val(i)}}),$(".btn-cart").click(function(){var t=$(".input").children("input").val(),i=parseInt(t)+parseInt($(".dt-total-quantity").html());/^\d+$/g.test(parseInt(t))?$(".input").children("input").val(t):t.replace(/^\d+$/,""),$(".dt-settle").show(),$(".dt-total-amount").show(),$(".dt-total-quantity").html(i),10<=i&&$(".dt-total-quantity").html("9+"),$(".dt-total-amount").html("￥"+i*$(".price-wrap").find("em").html());var e=$(this).parents(".shoppingBox").find("#smallpic").attr("sid");if(n(),-1!==$.inArray(e,o)){var s=parseInt(a[$.inArray(e,o)])+parseInt(t);a[$.inArray(e,o)]=s,addcookie("cookienum",a,10)}else o.push(e),addcookie("cookiesid",o,10),a.push($(".dt-total-quantity").html()),addcookie("cookienum",a,10)}),getcookie("cookiesid")&&getcookie("cookienum")&&(n(),$.each(o,function(t,i){if(s==i){var e=parseInt(a[t]);10<=e?$(".dt-total-quantity").html("9+"):$(".dt-total-quantity").html(e)}}))}()}();