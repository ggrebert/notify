(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        layouts: {
            bottomRight: {
                name: 'bottomRight',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        bottom: '20px',
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
                    },
                    initBlock: function() {
                    },
                    open: function() {
                    },
                    close: function() {
                    }
                }
            }
        }
    }, $.gg.notify.prototype.layouts);
})(jQuery);
