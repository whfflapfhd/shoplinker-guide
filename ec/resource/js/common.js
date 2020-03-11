var EcUi = EcUi || {};
var pannelIdx = null; // pannel index check
$(function(){    
    // Menu Event
    $(".ec-menu").leftMenu();
    // Tool Tip
    $('.tooltip').find("a").tooltip({track:true});
    // close btn event
    if($(".btn-close").length) $(".btn-close").closeBox();
    
    $(document.body).on("click",".ec-toggle-help",function(){
        $(".ec-help-content").toggle();
        $('.ui-scroll-table').tableResize();
        return false;
    }).on("click",".ui-btn-toggle",function(){
        var idx = $(".ui-btn-toggle").index(this);
        $(this).toggleClass("active");
        $(".toggle-content").eq(idx).toggleClass("active");
        $('.ui-scroll-table').tableResize();
        return false;
    }).on("click",".select-only-one .ui-check input",function(event){
        var parentObj = $(this).parents("table");
        parentObj.find(".ui-check input").not(this).prop("checked",false);
        event.stopPropagation();
    }).on("click",".ui-check input",function(event){
        event.stopPropagation();
    }).on("click","table td a",function(event){
        event.stopPropagation();
    }).on("click",".check-all",function(){
        var group  = $(this).data('checkGroup');
        var el = $('input:checkbox[data-check-name='+group+']');            
        ($(this).hasClass('all')) ? el.prop('checked',false) : el.prop('checked',true);
        $(this).toggleClass('all');
        return false
        return false
    }).on("click",".ui-scroll-table-header span",function(e){
        EcUi.sortTable(e.target);
    }).on("click",".delete-mall",function(){ //삭제버튼 액션
        EcUi.msgPop("test","msg",null,"tsetstsetset");
        return false;
    }).on("click",".close-pannel",function(){ //주문정보 패널 컨트롤
        EcUi.toggleWrap();
        return false;
    }).on("click",".toggle-lnb,.show-menu",function(){
        /* event : toggle Menu Wrap */
        EcUi.toggleWrap();
        return false
    }).on("click",".btn-pannel",function(){
        var idx = $(".btn-pannel").index(this);
        $(".tr-selected").removeAttr("class");
        if(pannelIdx != idx){
            $(this).parents("tr").toggleClass("tr-selected");
            pannelIdx = idx;
            EcUi.openPannel();
        }else{
            EcUi.closePannel();
        };
        return false;        
    }).on("click",".pannel-tab a",function(){
        $(this).parents(".pannel-tab").find("a").removeClass("active");
        $(this).addClass("active");
        return false;        
    }).on("change",".search-type input",function(){
        $(this).parents('.search-type').toggleClass('active');
    }).on("change",".ui-file input[type='file']",function(){
        var fileVal = this.files,
        valInput = $(this).parent().next();
        if(fileVal.length > 0){
            valInput.val(fileVal[0].name)
        }else{
            valInput.val("")
        };
        return false;        
    }).addKey("186",function(){EcUi.toggleWrap()},{ctrl:true}).hotkeyOn();/* Add Hot Key*/

    // 테이블 th sort 버튼 액션
    EcUi.sortTable =function(e){
        $(e).closest('ul').find('span').not(e).removeAttr('class');
        $(e).addClass('srot-on').toggleClass('sort-type1');
    };

    /* function : toggle Menu Wrap*/
    EcUi.tblResize = function(){
        $(".ui-scroll-table-header ul").removeAttr("style");
        setTimeout(function(){
            $('.ui-scroll-table').tableResize()
        },250);
    };
    EcUi.toggleWrap = function(){
        $(".ec-wrap").toggleClass("wrap-expend");
        if($(".ec-wrap").hasClass("wrap-pannel")) $(".ec-wrap").removeClass("wrap-pannel");        
        $(".tr-selected").removeAttr("class");
        pannelIdx = null;
        EcUi.tblResize();
    };

    /* function : toggle pannel Wrap*/
    EcUi.openPannel = function(){
        $(".ec-wrap").addClass("wrap-expend wrap-pannel");        
        EcUi.tblResize();
        $(".pannel-wrap").html("");
        //EcUi.loadContent(".pannel-wrap","/ec/page/order/pannel/pannel_order.html","load");
    };

     /* function : toggle pannel Wrap*/
    EcUi.closePannel = function(){
        pannelIdx = null;
        $(".ec-wrap").removeClass("wrap-expend wrap-pannel");        
        $(".tr-selected").removeAttr("class");
        $(".pannel-wrap").html("");
        EcUi.tblResize();        
    };

    /* #ajax load content */
    EcUi.loadContent = function(tg,uri,loadType){
        $.ajax({
            url:uri,
            success:function(data){
                if(loadType == "append"){
                    $(tg).append(data);
                }else{
                    $(tg).html(data);
                }                
            }
        })  
    };

    /* Dialog - create element*/    
    EcUi.msgPop = function(title,dialogType,opt,msg){        
        var dialogElement = "<div id='ecDialogPop'></div>",
        attrId = "#ecDialogPop",
        diaOpt= {
            title : title,
            buttons : {
                "close" : function(){
                    $(this).dialog("close");
                }
            }
        };
        console.log(diaOpt.title);
        if(opt) diaOpt = $.extend({},diaOpt, opt);
        dialogElement = $(dialogElement);
        if(dialogType === "msg"){
            dialogElement.html(msg)
            $("body").append(dialogElement);
            $("#ecDialogPop").dialog(diaOpt);
        }else{
            dialogElement.load(dialogType,function(){
                $("body").append(dialogElement);
                $("#ecDialogPop").dialog(diaOpt);
            });
        }
    };

    /*datepicker*/
    if($(".datepicker").size()) $(".datepicker").datepicker();
   
    
});
function setDatePicker(num,obj){
    var inputDate = $(obj).parent().prevAll();
    $(inputDate[0]).find(".datepicker").datepicker("setDate",auto_date_select());
    $(inputDate[1]).find(".datepicker").datepicker("setDate",auto_date_select(num));
};
function auto_date_select(day){
    var now = new Date();
    if(day){
        now.setDate(now.getDate()-day);
    }
    var
    yy = now.getFullYear(),
    mm = now.getMonth()+1,
    dd = now.getDate();    
    mm = (mm < 10) ? '0' + mm : mm;
    dd = (dd < 10) ? '0' + dd : dd;
    return yy+'-'+mm+'-'+dd
}

/* ##################
    Window Popup Set
################## */
    var popArr = [];
    Array.prototype.check_exist = function(obj){
        for(var i=0; i<this.length;i++){
            if(this[i] === obj) return true;
        }
        return false;
    }
    function PopupCenter(url, title, w, h) {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var width = window.outerWidth ? window.outerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.outerHeight ? window.outerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        if(w =="full") var w = width-80;
        if(h =="full") var h = height-200;
        var left = (((width / 2) - (w / 2)) + dualScreenLeft);
        var top = (((height / 2) - (h / 2)) + dualScreenTop);
        var newWindow = window.open(url, title, 'scrollbars=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if(!popArr.check_exist(newWindow)) popArr.push(newWindow);
        // Puts focus on the newWindow        
        if (window.focus) {
            newWindow.focus();
        };
        return newWindow;
    }
    function Popupclose(){
        if(popArr.length > 0){
           $.each(popArr, function(idx,valu){
                valu.close();
            });
        }
    }

/* ##################
    jQuery UI Datepicker 설정변경
################## */
    var dateOptions = $.extend({},$.datepicker.regional["ja"],{
        clearText: 'クリア', clearStatus: '日付をクリアします',
        closeText: '閉じる', closeStatus: '変更せずに閉じます',
        prevText: '前月', prevStatus: '前月を表示します',
        prevBigText: '&#x3c;&#x3c;', prevBigStatus: '前年を表示します',
        nextText: '次月', nextStatus: '翌月を表示します',
        nextBigText: '&#x3e;&#x3e;', nextBigStatus: '翌年を表示します',
        currentText: '今月', currentStatus: '今月を表示します',
        monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        monthStatus: '表示する月を変更します', yearStatus: '表示する年を変更します',
        weekHeader: '週', weekStatus: '暦週で第何週目かを表します',
        dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
        dayNamesShort: ['日','月','火','水','木','金','土'],
        dayNamesMin: ['日','月','火','水','木','金','土'],
        dayStatus: '週の始まりをDDにします', dateStatus: 'Md日(D)',
        dateFormat: 'yy-mm-dd', firstDay: 0,
        initStatus: '日付を選択します', isRTL: false,showButtonPanel :true,showOn:'button',buttonImageOnly:true,changeMonth: true,changeYear: true,
        buttonImage:'/ec/resource/images/calendar.png',buttonText:'calendar',showMonthAfterYear: true, yearSuffix: '年'
    });
    $.datepicker.setDefaults(dateOptions);

/* ##################
    jQuery UI Tabs 설정변경
################## */
    var tabsOption = {
        beforeLoad: function( event, ui ) {
            var $panel = $(ui.panel);
            var loader = $(this).find(".loader");
            EcUi.closePannel();
            ui.ajaxSettings.async = false; // 동기/비동기 설정
            loader.show(); //로딩이미지 노출            
            if (!$panel.is(":empty")) { //탭 패널에 내용이 있으면 로딩이미지 숨김
                loader.hide();
            }
            ui.jqXHR.fail(function() { // 로드 실패 시 노출할 텍스트 설정
                loader.hide();
                ui.panel.html("Load error...");
            });            
        },
        load : function( event, ui ) {            
            var loader = $(this).find(".loader");
            loader.hide();
            if($(".datepicker").size()) $(".datepicker").datepicker();
        }
    }