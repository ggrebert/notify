(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        layouts: {
            bottom: {
                name: 'bottom',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        bottom: 0,
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
                    initPlugin: function() {},
                    initBlock: function() {},
                    open: function() {},
                    close: function() {}
                }
            }
        }
    }, $.gg.notify.prototype.layouts);
})(jQuery);
