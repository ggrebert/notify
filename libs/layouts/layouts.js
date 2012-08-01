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
            },
            bottomLeft: {
                name: 'bottomLeft',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
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
            },
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
            },
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
            },
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
            },
            topLeft: {
                name: 'topLeft',
                container: {
                    tag: 'ul',
                    css: {
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
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
                            var $container = $('#noty-container-topLeft');
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
            },
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
