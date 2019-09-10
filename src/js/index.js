!function ($) {
    //  加载登录注册页面
    $('.reg .load').load('reg.html #insert');
    // header 我的账户
    !function(){
        $('.quick-menu>li').each(function (index, element) {
            $(element).hover(function () {
                $(this).children('a').css({
                    color: '#83b842',
                    textDecoration: 'underline',
                    zIndex: 1000
                });
                $(this).find('.mn-cont').show();
                // $(this).find('.mn-cont').find('li').eq(0).append($ca1)
    
            }, function () {
                $(this).children('a').css({
                    color: '#ccc',
                    textDecoration: 'none',
                })
                $(this).find('.mn-cont').hide()
            })
        })
        $('.mn-cont').children('li').hover(function () {
            $(this).children('a').css({
                color: '#83b842',
                textDecoration: 'underline',
            });
        }, function () {
            $(this).children('a').css({
                color: '#666',
                textDecoration: 'none',
            })
        })    
    }()
    // 登录注册页面事件
    !function(){
        const $usereg = $('.usereg');
        const $userlg = $('.userlg');
        const $regbg = $('.regbg');
        const $regbox = $('.load');
        const $close = $('.close');
        const $regnav = $('.regnav');
        let telflag = true;
        let passflag = true;

    //    登录注册单击事件
    $userlg.on('click', function () {
        let index = $(this).index();
        $regbg.show();
        $regbox.show();
        $('.regnav').find('li').eq(index).addClass('selected_state').siblings().removeClass('selected_state');
        $('.regnav').find('li').eq(index).children('span').addClass('global_bg');
        $('.regnav').find('li').eq(index).siblings().children('span').removeClass('global_bg');
        $('.user').eq(index).addClass('visible').siblings().removeClass('visible');
        $regbg.height($(window).height());
        $regbox.css({
            left: ($(window).width() - $regbox.width()) / 2,
            top: ($(window).height() - $regbox.height()) / 2,
        });
        // 下面的事件需要在登录注册单击事件后，执行的操作，都写在登录注册事件里面，写在外面会出现按钮失效的情况
        // 窗口自适应事件
       $(window).on('resize', function () {
        $regbox.css({
            left: ($(window).width() - $regbox.width()) / 2,
            top: ($(window).height() - $regbox.height()) / 2,
        })
        //    if($(window).width()<1300){
        //        $('#sideBarContainer').hide()
        //    }else{
        //     $('#sideBarContainer').show()
        //    }
      });
        // 登录注册切换

    $('.regnav').find('li').on('click', function () {
        let index = $(this).index();
        $('.regnav').find('li').eq(index).addClass('selected_state').siblings().removeClass('selected_state');
        $('.regnav').find('li').eq(index).children('span').addClass('global_bg');
        $('.regnav').find('li').eq(index).siblings().children('span').removeClass('global_bg');
        $('.user').eq(index).addClass('visible').siblings().removeClass('visible');
    })
    $('.close').on('click', function () {
        $regbox.hide();
        $regbg.hide();
        // 清理表单数据
        $('.register_form li').not('.regsubmit').children('input').val('');
        $('.register_form li i').html('')
        $('.direct_form').find('input:text').val('');
        $('.direct_form').find('input:password').val('');
    });
    
    checkinput();

    })
       
    }()
    const Aurl='http://10.31.157.28/js1907/project/php/';
    //  表单验证
    function checkinput() {
        // 表单数据用户验证
        const $ai = $('.register_form li i');
        const username = $('.register_form #inpMobile');
        const $btn = $('.reglogin input');
        const luser = $('.direct_form #inpAcct');
        const lpwd = $('.direct_form #inpPwds');
        const $lt = $('.direct_form .reglogin i')
        // 手机号验证
        $('#inpMobile').focus(function () {
            if ($(this).val() === '') {
                $ai.eq(0).html('请输入手机号码');
                $ai.eq(0).css('color', '#999');
                telflag = false;
            }
        })
        $('#inpMobile').blur(function () {
            if ($(this).val() !== '') {
                let tel = /^1[34578]\d{9}$/;
                if (tel.test(this.value)) {
                    $.ajax({
                        type: 'post',
                        url: Aurl+'reg.php',
                        data: {//给后端
                            checkname: username.val(),
                        },
                    }).done(function (d) {
                        console.log(d)
                        if (!d) {
                            $ai.eq(0).html('✔')
                            $ai.eq(0).css('color', 'green');
                            telflag = true;
                        } else {
                            $ai.eq(0).html('用户已注册');
                            $ai.eq(0).css('color', 'red');
                            telflag = false;
                        }
                    })
                } else {
                    $ai.eq(0).html('手机号码有误');
                    $ai.eq(0).css('color', 'red');
                    telflag = false;
                }
            } else {
                $ai.eq(0).html('手机号码不能为空');
                $ai.eq(0).css('color', 'red');
                telflag = false;
            }
        })
        // 密码验证
        $('#inpPwd').on('focus',function () {
            if ($(this).val() === '') {
                $ai.eq(1).html('请输入密码');
                $ai.eq(1).css('color', '#999');
                telflag = false;
            }
        })
        $('#inpPwd').on('input',function () {//表单内容变化处罚事件
            let num = 0; //记录字符串中字符的种类
            let numreg = /\d+/;
            let uppercase = /[A-Z]+/;
            let lowercase = /[a-z]+/;
            let othercase = /[\W\_]+/;
            if (numreg.test($(this).val())) {
                num++;
            }
            if (uppercase.test($(this).val())) {
                num++;
            }
            if (lowercase.test($(this).val())) {
                num++;
            }
            if (othercase.test($(this).val())) {
                num++;
            }
            switch (num) {
                case 1:
                case 2:
                    $ai.eq(1).html('弱');
                    $ai.eq(1).css('color', 'red');
                    passflag = false;
                    break;
                case 3:
                    $ai.eq(1).html('中');
                    $ai.eq(1).css('color', 'orange');
                    passflag = true;
                    break;
                case 4:
                    $ai.eq(1).html('强');
                    $ai.eq(1).css('color', 'green');
                    passflag = true;
                    break;
            }
        })

        $('#inpPwd').blur(function () {
            if ($(this).val() !== '') {
                if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                    if (passflag) {
                        $ai.eq(1).html('√');
                        $ai.eq(1).css('color', 'green');
                        passflag = true;
                    } else {
                        $ai.eq(1).html('密码安全不够');
                        $ai.eq(1).css('color', 'red');
                        passflag = false;
                    }
                } else {
                    $ai.eq(1).html('密码长度不够');
                    $ai.eq(1).css('color', 'red')
                    // passflag = false;
                }
            } else {
                $ai.eq(1).html('密码不能为空');
                $ai.eq(1).css('color', 'red')
                // passflag = false;
            }
        })
       
        // 表单提交验证 这里图形验证码和手机验证码没有做
        $('.newuser form').submit(function () {
            if ($('#inpMobile').val() === '') {
                $ai.eq(0).html('手机号码不能为空');
                $ai.eq(0).css('color', 'red');
                telflag = false;
            }
            if ($('#inpPwd').val() === '') {
                $ai.eq(1).html('密码不能为空');
                $ai.eq(1).css('color', 'red')
                passflag = false;
            }
            if (!telflag || !passflag || !ruleflag) {
                return false;
            }
        })
        //同意用户协议才能提交
        let ruleflag=true;
        $('.register-rule').find('input').on('click',function(){
            if($('.register-rule').find('input:checkbox').is(':checked')){
                ruleflag=true;
            }else{
                ruleflag=false;
            }
            if(!ruleflag){
                //把type类型button
                $('.regsubmit').find('input').attr('type','button');
            }else{
                $('.regsubmit').find('input').attr('type','submit');
            }
       })
        //用户登录后台获取用户数据
        $btn.on('click', function () {
            $.ajax({
                type: 'post',
                url: Aurl+'login.php',
                data: {
                    user: luser.val(),
                    password: lpwd.val(),
                },
                success: function (d) {
                    if (!d) {
                        alert('用户名和密码错误');
                    } else {
                        //location.href = 'http://10.31.157.28/js1907/project/src/index.html';
                        $('.regbg').hide();
                        $('.load').hide();
                        $('.mycount').text(luser.val());
                    }
                }
            })
        })
    }
    // 轮播图
    !function(){
        $.ajax({
            type: 'post',
            url: Aurl+'bannerdata.php',
            dataType: 'json',
        }).done(function (bpic) {
            $.each(bpic, function (index, value) {
                $('.imgList').find('img').eq(index).attr('src', value.burl);
                $('.BtnimgList').find('img').eq(index).attr('src', value.surl);
            })
        })
        class Banner {
            constructor() {
                this.focusimg = $('.focusImg');
                this.imglist = $('.imgList');
                this.blis = $('.imgList li');
                this.btnlist = $('.btnList');
                this.btnimglist = $('.BtnimgList');
                this.slis = $('.BtnimgList a');
                this.btnumlist = $('.BtnNumList');
                this.btnnumwrap = $('.BtnNumWrap');
                this.numas = $('.BtnNumWrap a');
                this.left = $('.prev');
                this.right = $('.next');
                this.index = 0;
                this.timer = null;
            }
            init() {
                let _this = this;
                this.liwidth = this.blis.eq(0).width();
                // 给ul赋值宽度
                this.imglist.css({
                    width: this.imglist.children().length * this.liwidth,
                })
                // focusimg事件
                this.focusimg.hover(function () {
                    _this.btnimglist.animate({
                        bottom: -405,
                    })
                }, function () {
                    _this.btnimglist.animate({
                        bottom: -625,
                    })
                })
                // 给btnnum添加事件,这里用hover会有事件冒泡，用mouseenter
                this.numas.mouseenter(function () {
                    clearInterval(_this.timer)
                    _this.index = $(this).index();
                    _this.tabswitch(_this.index);
                })
                this.numas.mouseleave(function () {
                    _this.timer = setInterval(function () {
                        _this.right.click()
                    }, 3000)
                })
                // 给sli添加事件
                this.slis.mouseenter(function () {
                    _this.index = $(this).index();
                    _this.tabswitch(_this.index);
                    clearInterval(_this.timer);
                })
                this.slis.mouseleave(function () {
                    _this.timer = setInterval(function () {
                        _this.right.click()
                    }, 3000)
                })
                // 右事件
                this.right.hover(function () {
                    clearInterval(_this.timer)
                }, function () {
                    _this.timer = setInterval(function () {
                        _this.right.click()
                    }, 3000)
                })
                this.right.click(function () {
                    _this.index++;
                    if (_this.index > _this.numas.length - 1) {
                        _this.imglist.css({
                            left: 0
                        })
                        _this.index = 0
                    }
                    _this.tabswitch(_this.index);
                })
                // 左事件
                this.left.hover(function () {
                    clearInterval(_this.timer)
                }, function () {
                    _this.timer = setInterval(function () {
                        _this.right.click()
                    }, 3000)
                })
                this.left.click(function () {
                    _this.index--;
                    if (_this.index < 0) {
                        _this.imglist.css({
                            left: -_this.liwidth * 6 //索引小于0时切换第7张图片，left值为-前6张图片的长度
                        })
                        _this.index = 6
                    }
                    _this.tabswitch(_this.index);
                })
                //定时器
                this.timer = setInterval(function () {
                    _this.right.click()
                }, 3000)
            }
            tabswitch(index) {
                let _this = this;
                this.numas.eq(index).addClass('cur').siblings().removeClass('cur');
                //给当前添加类
                this.slis.find('img').eq(index).addClass('cur');
                //给其他去掉类，这里需要注意添加img标签不在一个级别需要找父元素
                this.slis.eq(index).siblings().children('img').removeClass('cur');
                this.imglist.stop(true, true).animate({
                    left: -this.liwidth * (index)
                })
            }
        }
        new Banner().init()
    }()
   
    //渲染combination数据
    !function(){
        $.ajax({
            type: 'post',
            url: Aurl+'combination.php',
            dataType: 'json',
        }).done(function (data) {
            $('.sect-item').each(function (index, element) {
                $(element).find('img').attr({
                    src: data[index].url,
                    width: data[index].width,
                    height: data[index].height,
                })
            })
    
        })
    }()
   
    //渲染商品列表
    !function(){
        $.ajax({
            url: Aurl+'goodsdata.php',
            dataType: 'json'
        }).done(function (goods) {
            let $strhtml = '';
            $.each(goods, function (index, value) {
                $strhtml = `
                <a href="detail.html?sid=${value.sid}" title="${value.title1}" target="_blank" class="item-img">
                <img src="${value.url}">
                </a>
                <h3>${value.title1}</h3>
                <p class="price">
                ￥<b class="countPrice">${value.price}</b>
                </p>
                <p>
                <a title="${value.title2}" target="_blank" href="#">${value.title2}</a>
                </p>
                <p>
                <span class="recentSale">累计评价：${value.count}</span>
                <a href="#" class="linkCat" target="_blank">${value.classfy}<span class="catIcon"></span></a>
                </p>
                `
                $('.HmColumnShelfGroupCont').find('li').eq(index).html($strhtml)
            })
        })
    }()
   
    // 滚动条事件和楼梯效果
    $(document).ready(function(){
    var $louceng = $('.subcatSection');
    var $louti = $('.nav-wrap .nav-main a');
    $(window).on('scroll', function () {
        var $top = $(this).scrollTop();
        if ($top > 688 && $top < 16223) {
            $('#sideBarContainer').show();
            $('.side-tool').show();
            $('#sideBarContainer').css({
                top: 0
            })
        }
        if ($top < 688) {
            $('#sideBarContainer').hide();
            $('.side-tool').hide();
        }
        if ($top >= 16223) {//一定要加stop()
            $('#sideBarContainer').stop().animate({
                top: -300
            })
        }
        //楼梯显示隐藏
        if ($top > 10514 && $top < 15689) {
            $('.shelfnav-Wrap').addClass('fixed')
        } else if ($top < 10818) {
            $('.shelfnav-Wrap').removeClass('fixed')
        } else if ($top >= 15689) {
            $('.shelfnav-Wrap').removeClass('fixed')
        }
        //到一定高度，显示相应的楼梯导航
        $louceng.each(function (index, element) {
            $lctop = $(element).offset().top + $(element).height() / 2;
            if ($lctop > $top) {
                $louti.eq(index).addClass('active').siblings().removeClass('active');
                $louti.eq(index).find('.mn-txt').children().addClass('slct-mark');
                $louti.eq(index).siblings().find('.mn-txt').children().removeClass('slct-mark');
                return false;
            }
        })
    })
    // 回到顶部
    $('.s-tool-totop').on('click', function () {
        $('html,body').scrollTop(0)
    })
    // 楼梯hover
    $louti.hover(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).find('.mn-txt').children().addClass('slct-mark');
        $(this).siblings().find('.mn-txt').children().removeClass('slct-mark');
    })
    //楼梯单击
    $louti.on('click', function () {
        let $lcv = $louceng.eq($(this).index()).offset().top - 55;
        $('html,body').animate({
            scrollTop: $lcv,
        })
    })
    })
    // 首页购物数量
    !function(){
        var arrsid=[];
        var arrnum=[];
        let result=null;
            if(getcookie('cookiesid')&&getcookie('cookienum')){
                arrsid=getcookie('cookiesid').split(',');
                arrnum=getcookie('cookienum').split(',');
            }
        arrnum.forEach(function(value){
            result+=parseInt(value) 
        })
        $('.sc-count').html(result);
        $('.top-cart').html(result); 
        $('.pubCartNote').html(result); 
         
    }()
   
}(jQuery)