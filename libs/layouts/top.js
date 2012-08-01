(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        layouts: {
            top: {
                name: 'top',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        top: 0,
                        left: '5%',
                        listStyle: 'none',
                        margin: '0',
                        padding: '0',
                        width: '90%'
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
                            var $container = $('#noty-container-top');
                            $container.css('position', 'absolute');
                            $(window).scroll(function(){
                                $container.css('top', $(window).scrollTop() + "px");
                            });
                        }
                    },
                    initBlock: function() {},
                    open: function() {},
                    close: function() {}
                }
            }
        }
    });
})(jQuery);
