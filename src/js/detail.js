!function(){
    // 数据渲染
    const Aurl='http://10.31.157.28/js1907/project/php/';
    var goodsid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: Aurl+'detail.php',
		data: {
			sid: goodsid
		},
		dataType: 'json'
    }).done(function(data){    
            $('#smallpic').attr('sid', data.sid);
            $('.iteminfo').find('h1').html(data.title2);
            $('.price-panel').find('em').html(data.price);
            let arr = data.urls.split(',');
            let zoom=data.zoom.split(',');  
            $('#bpic').attr('src',zoom[0]);  
            $('#smallpic').attr('src',zoom[0]);
            $.each(arr,function(index,value){
               $('.dt-thumb .list').find('img').eq(index).attr('src',value)
            })
            $.each(zoom,function(index,value){
                $('.dt-thumb .list').find('img').eq(index).attr('zoom',value)
             })
        })    
    // 放大镜效果
    !function(){
        $('#sf').width($('#spic').width()*$('#bf').width()/$('#bpic').width());
        $('#sf').height($('#spic').height()*$('#bf').height()/$('#bpic').height());
        let bili=$('#bpic').width()/$('#spic').width();
        $('#spic').hover(function(){
            $('#sf').show();
            $('#bf').show();
            $(document).mousemove(function(e){
                let l=e.pageX-$('#spic').offset().left-$('#sf').width()/2;
                let t=e.pageY-$('#spic').offset().top-$('#sf').height()/2;
                if(l<=0){
                    l=0
                }else if(l>=$('#spic').width()-$('#sf').width()){
                    l=$('#spic').width()-$('#sf').width()
                }
                if(t<=0){
                    t=0
                }else if(t>=$('#spic').height()-$('#sf').height()){
                    t=$('#spic').height()-$('#sf').height()
                }
                 $('#sf').css({
                     left:l,
                     top:t,
                 })
                 $('#bpic').css({
                     left:-l*bili,
                     top:-t*bili,
                 })
              });
        },function(){
            $('#sf').hide();
            $('#bf').hide();
        })

        tabswitch()
    }()
     
    function tabswitch(){
        $('.dt-thumb .list li').on('click',function(){
            let index=$(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            $('#smallpic').attr('src',$(this).find('img').attr('zoom'));
            $('#bpic').attr('src',$(this).find('img').attr('zoom'));
            $('#smallpic').stop().animate({//100ms消失
                opacity:0
            },100,function(){
                $('#smallpic').stop().animate({//1000ms出现
                    opacity:1
                },800)
            })
            
        })
    }
  
    // 购买事件
    !function(){
        // buynum   
        $('.buy_total .i-detail').on('click',function(){
            let num=parseInt($('.input').children('input').val());
                if($(this).index()===0){
                    num--;
                    if(num<=1){
                        num=1;
                    }
                    $('.input').children('input').val(num)
                }
                if($(this).index()===2){
                    num++;
                    $('.input').children('input').val(num)
                } 
        })
        
        // 存cookie
        var arrsid=[];
        var arrnum=[];
        function cookiearr(){
            if(getcookie('cookiesid')&&getcookie('cookienum')){
                arrsid=getcookie('cookiesid').split(',');
                arrnum=getcookie('cookienum').split(',');
            }
        }
        
        $('.selBuyNum').keyup(function(){
            var c=$(this);  
            if(/[^\d]/.test(c.val())){//替换非数字字符  
             var temp_amount=c.val().replace(/[^\d]/g,'');  
             $(this).val(temp_amount);  
            }  
        })

        // 添加购物车
        $('.btn-cart').click(function(){
             let num=$('.input').children('input').val();
             let sum=parseInt(num)+parseInt($('.dt-total-quantity').html());
             let reg=/^\d+$/g;
             if(!reg.test(parseInt(num))){
                num.replace(/^\d+$/,'');
             }else{
                $('.input').children('input').val(num)
             }
             
             $('.dt-settle').show();
             $('.dt-total-amount').show();
             $('.dt-total-quantity').html(sum);
             if(sum>=10){
                $('.dt-total-quantity').html('9+');
             }
             $('.dt-total-amount').html('￥'+sum*$('.price-wrap').find('em').html())
            //  存cookie
             //获取当前的按钮对应的商品的sid
             let sid=$(this).parents('.shoppingBox').find('#smallpic').attr('sid');
             cookiearr();
             if($.inArray(sid,arrsid)!==-1){//!==-1表示商品存在,返回的是当前sid对应的索引
                let total=parseInt(arrnum[$.inArray(sid,arrsid)])+parseInt(num)
                arrnum[$.inArray(sid,arrsid)]=total;
                addcookie('cookienum',arrnum,10);
             }else{
                 arrsid.push(sid);
                 addcookie('cookiesid',arrsid,10);
                 arrnum.push($('.dt-total-quantity').html());
                 addcookie('cookienum',arrnum,10);
             }  
        })
       
        // 将Cookie的商品数量放入购物车
        if(getcookie('cookiesid')&&getcookie('cookienum')){
            cookiearr();
            $.each(arrsid,function(i,v){
                if(goodsid==v){
                    let result=parseInt(arrnum[i]) ;
                    if(result>=10){
                        $('.dt-total-quantity').html('9+');
                     }else{
                        $('.dt-total-quantity').html(result);
                     }
                }
            })   
        }
       
    }()

}()