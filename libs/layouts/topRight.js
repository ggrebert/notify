(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        layouts: {
            topRight: {
                name: 'topRight',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        listStyle: 'none',
                        margin: '0',
                        padding: '0',
                        width: '310px'
                    }
                },
                parent: {
                    tag: 'li',
                    css: {
                        
                    }
                },
                addClass: '',
                callback: {
                    initPlugin: function() {
                        if($.browser.msie && parseInt($.browser.version, 10) < 7) {
                            // HACK MSIE6 position fixed
                            var $container = $('#noty-container-topRight');
                            $container.css('position', 'absolute');
                            $(window).scroll(function(){
                                $container.css('top', $(window).scrollTop() + 20 + "px");
                            });
                        }
                    },
                    initBlock: function() {},
                    open: function() {},
                    close: function() {}
                }
            }
        }
    }, $.gg.notify.prototype.layouts);
})(jQuery);
