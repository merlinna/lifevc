!function(){
    const Aurl='http://10.31.157.28/js1907/project/php/';
    !function(){
        $.ajax({
            type:'post',
            url:Aurl+'goodsdata.php',
            dataType:'json',
        }).done(function(data){
            let str='';
            $.each(data,function(index,value){
                // 渲染空盒子推荐商品效果
                if(index<20){
                    str+=`
                    <li>
                    <a href="javascript" class="proPic">
                        <img src="${value.url}" alt=""></a>
                     <p class="productPrice">  ￥${value.price} </p> 
                     <p class="productTitle"> <a href="">${value.title2}</a> </p>
                     <p class="comments"> 评论数：<a href="">351条</a> </p>
                    </li>
                    `
                    $('.productList').html(str);
                }
            })
        })
    }()
    function goodslist(id,count){
    $.ajax({
        type:'post',
        url:Aurl+'goodsdata.php',
        dataType:'json',
    }).done(function(data){
        $.each(data,function(index,value){
            // 渲染有商品盒子的商品列表
            if(id==value.sid){
                let clonebox=$('.goods_row:hidden').clone(true,true);//渲染元素有事件绑定，加上true
                clonebox.find('.orderproPic').find('img').attr('src',value.urls.split(',')[0]);
                clonebox.find('.orderproPic').find('img').attr('sid',value.sid);
                clonebox.find('.orderproTt').children('a').html(value.title2);
                clonebox.find('.ipt-num').val(count);
                clonebox.find('.salePrice').html(value.price);
                clonebox.find('.subTotal').html((value.price*count).toFixed(2));
                clonebox.css('display','block');
                $('.cart-body').prepend(clonebox);
                priceSum();
            }
        })
    })
    }
    // 获取cookie值传入函数
    var arrsid=[];
    var arrnum=[];
    function cookiearr(){
        if(getcookie('cookiesid')&&getcookie('cookienum')){
            arrsid=getcookie('cookiesid').split(',');
            arrnum=getcookie('cookienum').split(',');
        }
    }
    if(getcookie('cookiesid')&&getcookie('cookienum')){
        cookiearr();
        $.each(arrsid,function(i,v){
            goodslist(arrsid[i],arrnum[i]);//传入cookie里面对于的sid和数量
        })
    }
    // 判断显示盒子
      showbox();
    function showbox(){
        if(getcookie('cookiesid')&&getcookie('cookienum')){
            $('.cart-empty ').hide();
            $('.recom-list-title').hide();
            $('.buyTop').hide();
            $('.shoppingCartGrid').show();
            $('.cart-panel').show()
        }else{
            $('.cart-empty ').show();
            $('.recom-list-title').show();
            $('.buyTop').show();
            $('.shoppingCartGrid').hide();
            $('.cart-panel').hide()
        }
    }
    // 计算总和
    function priceSum(){
        let sum=0; //数量
        let count=0; //总价
        $('.goods_row:visible').each(function(index,element){
            if($(element).find('.cart-checkbox input').prop('checked')){
            sum+=parseInt($(element).find('.ipt-num').val());
            count+=parseFloat($(element).find('.subTotal').html());
            }
        })
        $('#CheckedCount').html(sum);
        $('#PreOrderAmount').html(count)
    }
    // 复选框操作
    // 全选
    $('.allsel').on('change',function(){
        $('.goods_row:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
        $('.allsel').prop('checked',$(this).prop('checked'));
        priceSum();
    })
    // 单选
    $('.cart-body').on('change',$('.goods_row:visible').find(':checkbox'),function(){
        if($('.goods_row:visible').find(':checkbox').length===$('.goods_row:visible').find('input:checked').length){
            $('.allsel').prop('checked',true)
        }else(
            $('.allsel').prop('checked',false)
        )
        priceSum()
    })
    // + -按钮事件
    //goods_row 克隆盒子最大的父元素，不能向上找，不然对应不了点击事件对应的元素
        function resetcookie(obj){
            let index=obj.parents('.goods_row').find('img').attr('sid');
            arrnum[$.inArray(index,arrsid)]=obj.parents('.goods_row').find('.ipt-num').val();
            addcookie('cookienum',arrnum,10);
        }
        // 单个商品重新计算总价格
        function countprice(obj){
            let num=parseInt(obj.parents('.goods_row').find('.ipt-num').val());
            let price=parseFloat(obj.parents('.goods_row').find('.salePrice').html()) ;
            return (num*price).toFixed(2);
        }
        $('.inc').on('click',function(){
            let num=$(this).parents('.goods_row').find('.ipt-num').val();  //当前点击元素和数量框的值关联上
                    num++;
                    if(num>99){
                        num=99
                    }
                    $(this).parents('.goods_row').find('.ipt-num').val(num);
                    $(this).parents('.goods_row').find('.subTotal').html(countprice($(this)))
                    priceSum();
                    resetcookie($(this));              
        })
        $('.dec').on('click',function(){
            let num=$(this).parents('.goods_row').find('.ipt-num').val();  
            num--;
            if(num<=1){
                num=1
            }
            $(this).parents('.goods_row').find('.ipt-num').val(num);
            $(this).parents('.goods_row').find('.subTotal').html(countprice($(this)))
            priceSum();
            resetcookie($(this)); 
        })
        //手动输入改变商品数量
        $('.ipt-num').on('input',function(){
            let reg=/^\d+$/g;
            let value=parseInt($(this).val());
            if(reg.test(value)){ //只能输入数字
                if(value>99){
                    $(this).val(99)
                }else if(value<=0){
                    $(this).val(1)
                }else(
                    $(this).val(value)
                )
            }else{
                $(this).val(1)
            }
            $(this).parents('.goods_row').find('.subTotal').html(countprice($(this)))
            priceSum();
            resetcookie($(this)); 
        })

        //删除操作
        //点击删除移除对应cookie
        function removecookie(sid,arrsid){
            let $index=-1;
            $.each(arrsid,function(index,value){
                if(sid===value){
                    $index=index
                }
            })
            arrsid.splice($index,1);//删除sid
            arrnum.splice($index,1);//删除数量
            addcookie('cookiesid',arrsid,10);
            addcookie('cookienum',arrnum,10);
        }
        //删除单个商品
        $('.Delete').on('click',function(){
               if(confirm('您确定删除吗？')){
                $(this).first().parents('.goods_row').remove();
               }
            removecookie($(this).first().parents('.goods_row').find('img').attr('sid'),arrsid);
            priceSum()
        })
        //删除选中的商品
        $('.del').on('click',function(){
            if(confirm('您确定删除选中的商品吗？')){
                $('.goods_row:visible').each(function(index,element){
                    if($(element).find('input:checkbox').is(':checked')){
                        $(element).remove();
                        removecookie($(element).find('img').attr('sid'),arrsid);
                    }
                })
            }
            priceSum() ;
            window.location.reload();
        })
}()