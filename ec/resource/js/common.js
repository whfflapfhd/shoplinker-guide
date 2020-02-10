$(function(){
    /* Menu Event*/
    $(".ec-menu").leftMenu();
    
    /* event : toggle Menu Wrap */
    $(".toggle-lnb").on("click",toggleWrap);

    /* Add Hot Key*/
    $(document.body).addKey("186",toggleWrap,{ctrl:true}).hotkeyOn();

    /* function : toggle Menu Wrap*/
    function toggleWrap(){
        $(".toggle-lnb").toggleClass("active");
        $(".ec-lnb-wrap").toggleClass("hidden");
        $(".ec-wrap").toggleClass("expend");
        $(".ui-scroll-table-header ul").removeAttr("style");
        setTimeout(function(){
            $('.ui-scroll-table').tableResize()
        },250);
    }

    /* close btn event */
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
    }).on("click","table tbody tr",function(event){
        var p = $(this).closest('tbody'),
            inputObj = p.find('.ui-check'),
            idx = p.find("tr:not('.toggle-content')").index(this),
            el = inputObj.eq(idx).find('input');
        el.click();
        event.stopPropagation();
    }).on("click","table td a",function(event){
        event.stopPropagation();
    }).on("click",".check-all",function(){
        var el = $(this).closest('table').find('input:checkbox');            
        ($(this).hasClass('all')) ? el.prop('checked',false) : el.prop('checked',true);
        $(this).toggleClass('all');
        return false
    }).on("click",".ui-scroll-table-header span",function(e){
        sortTable(e.target);
    });

    function sortTable(e){
        $(e).closest('ul').find('span').not(e).removeAttr('class');
        $(e).addClass('srot-on').toggleClass('sort-type1');
    }
});

