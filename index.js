$(document).ready(function(){
    var bookInfos = [];
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        delay: 2000,
        autoplay:true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })
    // 切换价格信息
    $(".cmr-dzBook").click(function() {
        $(this).addClass('cmr-bookSp');
        $(".cmr-jzBook").removeClass('cmr-bookSp');
        $(".cmr-priceTxt").text("20");
    })
    $(".cmr-jzBook").click(function() {
        $(this).addClass('cmr-bookSp');
        $(".cmr-dzBook").removeClass('cmr-bookSp');
        $(".cmr-priceTxt").text("50");
    })
    // 展开图书简介
    $(".cmr-bookDesc-zk").click(function() {
        $(".cmr-bookDesc").removeClass("line-clamp5");
        $(".cmr-bookDesc-zk").css('display','none');
    })
    // 展开媒体推荐
    $(".cmr-mtDesc-zk").click(function() {
        $(".cmr-mtDesc").removeClass("line-clamp3");
        $(".cmr-mtDesc-zk").css('display','none');
    })
    // 点击加入书架
    $(".cmr-addBook").click(function() {
        $(".cmr-toast").css({
            display: 'block'
        });
        setTimeout(function() {
            $(".cmr-toast").css({
                display: 'none'
            });
        },5000)
    })
    //  点击加入购物车
    $('.cmr-addCar').click(function() {
        var num =  parseInt($('.cmr-carNum').text());
        $('.cmr-carNum').text(num+1);
        var activeIndex = mySwiper.activeIndex;
        bookInfos.push({'bookCover':'./img/cover0'+activeIndex+'.png','bookName':'时运变迁','bookPrice': '456','bookId':activeIndex});
        localStorage.setItem('bookInfos',bookInfos);
    })
    // 点击购物车
    $('.cmr-carNumBox').click(function() {
        var bookInfos = localStorage.getItem('bookInfos');
        bookInfos.map(function(item) {
            var html = "<li class='cmr-fcAddCar'><div class='cmr-fcImg'><img src='"+item.bookCover+"' /></div><div class='cmr-fcMg'><div class='cmr-fcTopBox'><h3>"+item.bookName+"</h3><i class='fa fa-close fa-lg cmr-close'></i></div><div class='r-fcAction'><div class='cmr-fcPrice'>¥<span>"+item.bookPrice+"</span></div><div class='cmr-fcDelete'>删除</div></div></div></li>";
            
        })
    })
})