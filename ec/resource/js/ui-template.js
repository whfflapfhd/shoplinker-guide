(function($){
    $.fn.extend({
        /* Scroll Table*/
        fixedTable: function(options) {
            var defaults = {
                scrollY : null,
                minWidth : null,
                scrollBody : ".ui-scroll-content",
                fixHead : ".ui-scroll-table-header"
			},options = $.extend(defaults, options);

            return this.each(function(){
                var
                _this = $(this),
                a = _this.find(options.scrollBody),
                b = _this.find(options.fixHead),
                c = b.find("ul"),
                preScroll = 0;
                if(options.scrollY){
                    _this.height(options.scrollY);
                    c.addClass("over");
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
                var a = $(this).find(".ui-scroll-content"),
                b = $(this).find(".ui-scroll-table-header ul");
                console.log(a.find("table").width(),a.find("table").outerWidth());
                b.width(a.find("table").width());
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
                return false
            });
        }
    });
})(jQuery)