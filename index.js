$(document).ready(function(){
    var activeIndex = 0;
    var bookInfos = JSON.parse(localStorage.getItem('bookInfos')) || [];
    // 购物车数量
    $('.cmr-carNum').text(bookInfos.length);
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
        var mockData = {'bookCover':'http://cdn.cmread.com/coverFile/400630471/5527c1c8a393e08405538b49991eb905862f39252ee0/cover180240.jpg','bookName':'时运变迁'+activeIndex,'bookPrice': '456','bookId':activeIndex};
        bookInfos.push(mockData);
        localStorage.setItem('bookInfos',JSON.stringify(bookInfos));
        // 更新购物车的数量
        $('.cmr-carNum').text(bookInfos.length);
        activeIndex++;
        // 更新购物车列表
        renderLi(mockData);
    })
    // 点击购物车
    $('.cmr-carNumBox').click(function() {
        // 清除ul中的子元素
        $('.cmr-carInfos').html('');
        var books = JSON.parse(localStorage.getItem('bookInfos'));
        for(var i in books) {
            if(books[i]) {
                renderLi(books[i])
            }
        }
        // 切换购物车列表的显示影藏
        if(books && books.length>0) {
            $('.cmr-carInfos').toggle();
        }
    })
    // 点击删除
    $('.cmr-carInfos').on('click','li',function(e) {
        var item = $(this);
        console.log($(this),1);
        // 获取自定义属性
        var bookId = $(this).data('bookid');
        // 获取localstorage的值
        var books = JSON.parse(localStorage.getItem('bookInfos'));
        var matchIndex = 0;
        // $('.cmr-carInfos').remove(item);
        // 寻找匹配的元素
        for(var i in books) {
            if(books[i].bookId == bookId) {
                matchIndex = i;
                break;
            }
        }
        // 删除匹配到的元素
        books.splice(matchIndex,1);
        $('.cmr-carInfos').html('');
        if(books.length>0) {
            for(var i in books) {
                if(books[i]) {
                    renderLi(books[i])
                }
            }
        } else {
            $('.cmr-carInfos').css('display','none');
        }
        // 更新购物车数量
        $('.cmr-carNum').text(books.length);
        // 更新localstorage的值
        localStorage.setItem('bookInfos',JSON.stringify(books));
    })
})
function renderLi(item) {
    var html = "<li class='cmr-fcAddCar' data-bookid='"+item.bookId+"'><div class='cmr-fcImg'><img src='"+item.bookCover+"' /></div><div class='cmr-fcMg'><div class='cmr-fcTopBox'><h3>"+item.bookName+"</h3><i class='fa fa-close fa-lg cmr-close'></i></div><div class='cmr-fcAction'><div class='cmr-fcPrice'>¥<span>"+item.bookPrice+"</span></div><div class='cmr-fcDelete'>删除</div></div></div></li>";
    $('.cmr-carInfos').append(html);
}
