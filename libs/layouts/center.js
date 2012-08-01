(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        layouts: {
            center: {
                name: 'center',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        listStyle: 'none',
                        margin: '0',
                        padding: '0',
                        width: '80%',
                        left: '10%'
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
                        var self = this;
                        var $container = self.element.parent().parent();
                        var height = $(window).height() - $container.height();
                        $container.animate(
                            {top: parseInt(height/2)},
                            'slow',
                            'easeOutBounce'
                        );
                        $(window).resize(function(){
                            var height = $(window).height() - self.element.height();
                            $container.css('top', parseInt(height/2));
                        });
                    },
                    close: function() {
                        var self = this;
                        var $container = self.element.parent().parent();
                        var height = $(window).height() - $container.height() - self.element.height();
                        $container.animate(
                            {top: parseInt(height/2)},
                            'slow',
                            'easeOutBounce',
                            function() {
                                if (!$container.find('> li').length) {
                                    $container.remove();
                                }
                            }
                        );
                    }
                }
            }
        }
    }, $.gg.notify.prototype.layouts);
})(jQuery);
