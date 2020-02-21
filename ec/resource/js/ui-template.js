(function($){
    $.fn.extend({
        /* Scroll Table*/
        fixedTable: function(options) {
            var defaults = {
                scrollY : null,
                minWidth : null,
                scrollBody : ">.ui-scroll-table-body>.ui-scroll-content",
                fixHead : ">.ui-scroll-table-header"
			},options = $.extend(defaults, options);

            return this.each(function(){
                var
                _this = $(this),
                a = _this.find(options.scrollBody),
                b = _this.find(options.fixHead),
                c = b.find("ul"),
                preScroll = 0;
                if(options.scrollY){
                    //_this.height(options.scrollY);
                    _this.css('max-height',options.scrollY);
                    var ht = _this.height();
                    if(a.parent().height() >= options.scrollY) {
                        a.parent().innerHeight(ht);
                        c.addClass("over");
                    }

                    $(document).on("ready",function(){
                        _this.tableResize();
                    });
                }
                if(options.minWidth){
                    a.find("table").css("min-width",options.minWidth);
                    c.css("min-width",options.minWidth);
                };
                a.on("scroll",function(){
                    if(this.scrollLeft != preScroll){
                         b.scrollLeft(this.scrollLeft);
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
                        also.width(wt);
                        _this.tableResize();
                    }
                });
                $(window).on("resize",function(){
                    _this.tableResize();
                });
                $(document).on("ready",function(){
                    //_this.tableResize();
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
            menu.on("click",function(){
                var parentObj = $(this).closest("ul");
                /*
                var parentObj = $(this).closest("ul"),
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
            this.click(function(){
                parentObj.hide();
                $('.ui-scroll-table').tableResize();
                return false
            });
        }
    });

    // jQuery UI D 설정변경
    $.extend($.ui.dialog.prototype.options, {
        create : function(event,ui){
            var btns = $(event.target).parent().find(".ui-dialog-buttonset button") || null;
            if(btns) btns.eq(0).addClass("btn-blue");
        },
        close: function(event, ui ) {
            $(this).remove()
        }
    });
})(jQuery)