(function($){
    $.fn.extend({
        /* Scroll Table*/
        fixedTable: function(options) {
            var defaults = {
                scrollY : null,
                minWidth : null,
                fixedCell : null,
                scrollBody : ">.ui-scroll-table-body>.ui-scroll-content",
                fixHead : ">.ui-scroll-table-header"
			},options = $.extend(defaults, options);

            return this.each(function(){
                var
                _this = $(this),
                a = _this.find(options.scrollBody),
                b = _this.find(options.fixHead),
                c = b.find("ul"),
                d = a.find("> table"),
                e = null,
                preScroll = 0;
                if(options.scrollY){
                    if(a.parent().height() >= options.scrollY) {
                        _this.height(options.scrollY);
                        a.parent().innerHeight(_this.height());
                        c.addClass("over");
                        _this.tableResize();
                    }
                    /*
                    $(document).on("ready",function(){
                        _this.tableResize();
                    });
                    */
                }
                if(options.minWidth){
                    d.css("min-width",options.minWidth);
                    _this.tableResize();
                };
                if(options.fixedCell){
                    $(">tbody>tr:not(.toggle-content) > td:nth-child(-n+"+options.fixedCell+")",d).addClass("fixed-cell");
                    $("li:nth-child(-n+"+options.fixedCell+")",c).addClass("fixed-cell");
                    e = _this.find(".fixed-cell");
                };
                a.on("scroll",function(){
                    if(this.scrollLeft != preScroll){
                        b.scrollLeft(this.scrollLeft);
                        if(e) e.css({"transform":"translateX("+ this.scrollLeft + "px)"});
                        preScroll = this.scrollLeft;
                    }else{
                        return false
                    }
                });
                b.find("li").resizable({
                    handles: 'e',
                    helper: "ui-resizable-helper",
                    stop: function( event, ui ) {
                        var
                        idx = b.find("li").index(ui.element),
                        also = a.find("col").eq(idx),
                        wt = (idx == 0) ? ui.size.width-1 : ui.size.width-2;
                        d.width(d.width()+(wt-ui.originalSize.width));
                        also.width(wt);
                        _this.tableResize();
                    }
                });
                $(window).on("resize",function(){
                    _this.tableResize();
                });
                $(document).on("ready",function(){
                    _this.tableResize();
                });
            })
        },
        tableResize : function(){
            return this.each(function(){
            var
                a = $(this).find(".ui-scroll-content"),
                b = a.find("table"),
                c = $(this).find(".ui-scroll-table-header ul");
                c.width(b.width());
            });
        },
        leftMenu : function(){
            var menu = this.find(">li>a");
            var pathName = window.location.href.split("/");
            pathName = pathName[pathName.length-1].split(".")[0];
            $.each(this.find("ul a"),function(i,e){
                var idx = $(this).attr('href').indexOf(pathName);
                if(idx > 0){
                    $(this).addClass("active");
                    $(this).parents('ul').prev().addClass("active");
                    return false
                }
            });
            menu.on("click",function(){
                var parentObj = $(this).closest("ul");
                /*
                var
                parentObj = $(this).closest("ul"),
                findCid = (parentObj[0].className == "ec-menu-2depth")  ? ">li>a" : "a";
                */
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }else{
                    parentObj.find("a").removeClass("active");
                    $(this).addClass("active");
                };
                return false;
            });
        },
        closeBox : function(){
            var parentObj = this.parent();
            parentObj.hide();
            if($('.ui-scroll-table').size()) $('.ui-scroll-table').tableResize();
        }
    });

    // jQuery UI Dialog 설정변경
    $.extend($.ui.dialog.prototype.options, {
        modal : true,
        create : function(event,ui){
            var btns = $(event.target).parent().find(".ui-dialog-buttonset button") || null;
            if(btns) btns.eq(0).addClass("btn-blue");
        },
        close : function(event,ui){
            $(event.target).remove();
        }
    });
})(jQuery)