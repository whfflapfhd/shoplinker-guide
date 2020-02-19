var EcUi = EcUi || {};
$(function(){
    // Menu Event
    $(".ec-menu").leftMenu();

    // close btn event
    if($(".btn-close").length) $(".btn-close").closeBox();

    $(document.body).on("click",".ec-toggle-help",function(){
        $(".ec-help-content").toggle()
    }).on("click",".ui-btn-toggle",function(){
        var idx = $(".ui-btn-toggle").index(this);
        $(this).toggleClass("active");
        $(".toggle-content").eq(idx).toggleClass("active");
        return false;
    }).on("click",".select-only-one .ui-check input",function(event){
        var parentObj = $(this).parents("table");
        parentObj.find(".ui-check input").not(this).prop("checked",false);
        event.stopPropagation();
    }).on("click",".data-table tbody tr",function(event){
        var p = $(this).closest('tbody'),
            inputObj = p.find('.ui-check'),
            idx = p.find("> tr:not('.toggle-content')").index(this),
            el = inputObj.eq(idx).find('input');
        el.click();
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
    }).on("click",".toggle-lnb",function(){
        /* event : toggle Menu Wrap */
        EcUi.toggleWrap();
        return false
    }).addKey("186",function(){EcUi.toggleWrap()},{ctrl:true}).hotkeyOn();/* Add Hot Key*/

    // 테이블 th sort 버튼 액션
    EcUi.sortTable =function(e){
        $(e).closest('ul').find('span').not(e).removeAttr('class');
        $(e).addClass('srot-on').toggleClass('sort-type1');
    };

    /* function : toggle Menu Wrap*/
    EcUi.toggleWrap = function(){
        $(".toggle-lnb").toggleClass("active");
        $(".ec-lnb-wrap").toggleClass("hidden");
        $(".ec-wrap").toggleClass("expend");
        $(".ui-scroll-table-header ul").removeAttr("style");
        setTimeout(function(){
            $('.ui-scroll-table').tableResize()
        },250);
    };

    /*datepicker*/
    if($(".datepicker").size()) $(".datepicker").datepicker();

    
    
});

// jQuery UI Datepicker 설정변경
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

    var tabsOption = {
        beforeLoad: function( event, ui ) {
            ui.ajaxSettings.async = false; // 동기/비동기 설정
            $(".loader").show(); //로딩이미지 노출
            var $panel = $(ui.panel);
            if (!$panel.is(":empty")) { //탭 패널에 내용이 있으면 로딩이미지 숨김
                $(".loader").hide();
            }
            ui.jqXHR.fail(function() { // 로드 실패 시 노출할 텍스트 설정
                $(".loader").hide();
                ui.panel.html("Load error...");
            });
        },
        load : function( event, ui ) {
            $(".loader").hide();
            if($(".datepicker").size()) $(".datepicker").datepicker();
        }
    }