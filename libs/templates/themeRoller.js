(function($){
    $.fn.extend(true, $.gg.notify.prototype, {
        themes: {
            themeRoller: {
                name: 'themeRoller',
                modal: {
                    zIndex: '1000'
                },
                open: {
                    properties: {
                        height: 'toggle'
                    },
                    duration: 500,
                    easing: 'linear'
                },
                close: {
                    properties: {
                        height: 'toggle'
                    },
                    duration: 500,
                    easing: 'linear'
                },
                callback: {
                    initPlugin: function() {
                        $('#noty-modal-' + $.gg.notify.prototype.themes.themeRoller.name)
                            .addClass('ui-widget-overlay');
                    },
                    initBlock: function() {
                        var $this = this.element;
                        
                        $this
                            .addClass('ui-widget-content')
                            .css({
                                position: 'relative',
                                overflow: 'hidden',
                                padding: '10px',
                                zIndex: '300'
                            });
                        
                        if (this.options.modal) {
                            if ($.browser.msie && parseInt($.browser.version) < 8) {
                                $('#noty-modal-' + $.gg.notify.prototype.themes.themeRoller.name).css({
                                    zIndex: '0'
                                });
                            }
                            $this.css({
                                zIndex: '99999'
                            });
                        }
                        
                        switch (this.options.layout.name) {
                            case 'top':
                                $this.addClass('ui-corner-bottom');
                                break;
                            case 'bottom':
                                $this.addClass('ui-corner-top');
                                break;
                            default:
                                $this.addClass('ui-corner-all')
                                     .css({
                                         marginTop: '10px'
                                     });
                                break;
                        }
                        
                        switch (this.options.type) {
                            case 'warning':
                            case 'error':
                                $this.addClass('ui-state-error');
                                break;
                            case 'information':
                            case 'notification':
                                $this.addClass('ui-state-highlight');
                                break;
                            case 'alert':
                            default:
                                break;
                                break;
                        }
                    },
                    open: function() {
                        var $this = this.element;
                        var $close = $this.find('> .noty-wrapper > .noty-close');
                        
                        $close
                            .html('<span class="ui-icon ui-icon-closethick"></span>')
                            .css({
                                position: 'absolute',
                                right: '5px',
                                top: '5px',
                                cursor: 'pointer'
                            });
                    },
                    close: function() {
                    }
                }
            }
        }
    });
})(jQuery);
