/**
 * @summary jQuery GG Notify
 * @description Show notification like Ubuntu or Growl
 * @version 1.1
 * @file jquery.ui.notify.js
 * @author Geoffrey GREBERT <geoffrey.grebert@gmail.com>
 * @link http://geoffrey-grebert.com
 * 
 * @require jQuery
 * @require jQuery UI core
 * @require jQuery UI widget
 *
 * @copyright Copyright 2012 Geoffrey GREBERT, all rights reserved.
 *
 * @licence http://opensource.org/licenses/GPL-3.0
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://geoffrey-grebert.com
 * 
 * TODO
 *  - buttons
 *  - alert
 *  - confirm
 * 
 */

/*jshint devel:true, jquery:true, unused:false */


(function ($) {
    "use strict";
    
    var
        index = 0,
        notyId = 0,
        modalQueue = [];
    
    function getNextIndex() {
        return ++index;
    }
    
    function getNextNotyId() {
        return ++notyId;
    }
    
    $.widget("gg.notify", {
        
        version: '1.0',
        
        /**
         * Defaut options 
         */
        options: {
            /*
             * Events to close the notifications
             * possible values click, hover, button
             * 
             * @var array
             */
            closeWith: ['click'],
            
            /*
             * @var boolean
             */
            debug: false,
            
            /*
             * Put the notification on the top of the queue
             * 
             * @var boolean
             */
            force: false,
            
            /*
             * block position
             * 
             * @var string
             */
            layout: 'inline',
            
            /*
             * make the box modal
             * 
             * @var boolean
             */
            modal: false,
            
            /*
             * Auto open the notification
             * 
             * @var boolean
             */
            show: true,
            
            /*
             * Notification content
             * 
             * @var string
             */
            text: '',
            
            /*
             * Notification lifetime in millisecond
             * 
             * @var int
             */
            timeout: false,
            
            /*
             * theme used
             * 
             * @var string
             */
            theme: 'base',
            
            /*
             * Notification type
             * possible value : alert, warning, information, error, success
             * 
             * @var string
             */
            type: 'alert',
            
            /*
             * TODO Add buttons on the bottom
             * 
             * @var array
             */
            buttons: [],
            
            // callback
            beforeShow: function (event, ui) {},
            
            afterShow: function (event, ui) {},
            
            beforeClose: function (event, ui) {},
            
            afterClose: function (event, ui) {}
        },
        
        inWaitingList: function () {
            var
                self = this,
                i;
            for (i = 0; i < modalQueue.length; i++) {
                if (modalQueue[i] === self) {
                    return true;
                }
            }
            return false;
        },
        
        themes: {
            base: {
                name: 'base',
                css: {
                    modal: {
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        zIndex: '1000',
                        opacity: '0.6',
                        display: 'none',
                        left: '0',
                        top: '0'
                    },
                    block: {
                        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==") repeat-x scroll left top #FFEAA8',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '10px',
                        zIndex: '300'
                    },
                    wrapper: {},
                    content: {},
                    buttonClose: {},
                    buttons: {}
                },
                animate: {
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
                    }
                },
                callback: {
                    initPlugin: function () {},
                    initBlock: function () {
                        var $this = this.element;
                        
                        if (this.options.modal) {
                            this.element.css({
                                zIndex: '1010'
                            });
                        }
                        
                        switch (this.options.layout.name) {
                            case 'top':
                                $this.css({
                                    borderRadius: '0px 0px 5px 5px',
                                    borderBottom: '2px solid #eee',
                                    borderLeft: '2px solid #eee',
                                    borderRight: '2px solid #eee',
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                });
                                break;
                            case 'bottom':
                                $this.css({
                                    borderRadius: '5px 5px 0 0',
                                    borderTop: '2px solid #eee',
                                    borderLeft: '2px solid #eee',
                                    borderRight: '2px solid #eee',
                                    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                                });
                                break;
                            default:
                                $this.css({
                                    borderRadius: '5px 5px 5px 5px',
                                    border: '2px solid #eee',
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    marginTop: '10px'
                                });
                                break;
                        }
                        
                        switch (this.options.type) {
                            case 'warning':
                                $this.css({
                                    backgroundColor: '#FFEAA8',
                                    borderColor: '#FFC237',
                                    color: '#826200'
                                });
                                break;
                            case 'error':
                                $this.css({
                                    backgroundColor: 'red',
                                    borderColor: 'darkred',
                                    color: '#FFF'
                                });
                                break;
                            case 'success':
                                $this.css({
                                    backgroundColor: 'lightgreen',
                                    borderColor: '#50C24E',
                                    color: 'darkgreen'
                                });
                                break;
                            case 'information':
                                $this.css({
                                    backgroundColor: '#57B7E2',
                                    borderColor: '#0B90C4',
                                    color: '#FFF'
                                });
                                break;
                            //case 'alert':
                            //case 'notification':
                            default:
                                $this.css({
                                    backgroundColor: '#FFF',
                                    borderColor: '#CCC',
                                    color: '#444'
                                });
                                break;
                        }
                    },
                    open: function () {
                        var
                            $this = this.element,
                            $close = $this.find('> .noty-wrapper > .noty-close');
                        
                        $close
                            .hide()
                            .css({
                                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                                position: 'absolute',
                                right: '5px',
                                top: '5px',
                                cursor: 'pointer',
                                width: '10px',
                                height: '10px'
                            });
                        
                        $this.bind({
                            mouseenter: function () {
                                $close.fadeIn();
                            },
                            mouseleave: function () {
                                $close.fadeOut();
                            }
                        });
                    },
                    close: function() {}
                }
            }
        },
        
        layouts: {
            inline: {
                name: 'inline',
                container: {
                    tag: '',
                    css: {}
                },
                parent: {
                    tag: '',
                    css: {}
                },
                callback: {
                    initPlugin: function () {},
                    initBlock: function () {},
                    open: function () {},
                    close: function () {}
                }
            }
        },
        
        open: function() {
            var
                self = this,
                $this = this.element;
            
            try {
                // temporisation des notification modal
                if (self.options.modal) {
                    if (!self.inWaitingList()) {
                        modalQueue.push(self);
                    }
                    if (modalQueue.length > 1) {
                        return self;
                    }
                }
                
                var $animateSelector = $this;
                
                if (self.options.layout.container.tag && self.options.layout.parent.tag) {
                    var $parentDom = $('<' + self.options.layout.parent.tag + '></' + self.options.layout.parent.tag + '>');
                    $parentDom
                        .hide()
                        .css(self.options.layout.parent.css);
                    $this.show();
                    
                    if (self.options.force) {
                       $parentDom.prependTo('#noty-container-' + self.options.layout.name);
                    } else {
                        $parentDom.appendTo('#noty-container-' + self.options.layout.name);
                    }
                    
                    $this.appendTo($parentDom);
                    
                    $animateSelector = $animateSelector.parent();
                }
                
                self._trigger('beforeShow', null, self._ui());
                
                $animateSelector.animate(
                    self.options.theme.animate.open.properties,
                    self.options.theme.animate.open.duration,
                    self.options.theme.animate.open.easing,
                    function() {
                        // callback theme
                        if (self.options.theme.callback.open) {
                            self.options.theme.callback.open.apply(self);
                        }
                        
                        // callback layout
                        if (self.options.layout.callback.open) {
                            self.options.layout.callback.open.apply(self);
                        }
                        
                        // show modal
                        if (self.options.modal) {
                            $('#noty-modal-' + self.options.theme.name).show();
                        }
                        
                        // callback user
                        self._trigger('afterShow', null, self._ui());
                        
                        // active Timeout
                        self._initTimeout();
                    }
                );
                
                return self;
            } catch (err) {
                if(err !== "error") {
                    if (self.options.debug) {
                        console.error("Error gg.notify : unknow error %s", err);
                    }
                }
                if (this._uiVersion < 1.9) {
                    return self.destroy();
                }
                return self._destroy();
            }
        },
        
        close: function() {
            var self = this;
            var $this = this.element;
            
            try {
                self._trigger('beforeClose', null, self._ui());
                
                var $animateSelector = $this;
                if (self.options.layout.container.tag && self.options.layout.parent.tag) {
                    $animateSelector = $animateSelector.parent();
                }
                
                $animateSelector.animate(
                    self.options.theme.animate.close.properties,
                    self.options.theme.animate.close.duration,
                    self.options.theme.animate.close.easing,
                    function() {
                        // callback theme
                        if (self.options.theme.callback.close) {
                            self.options.theme.callback.close.apply(self);
                        }
                        
                        // callback layout
                        if (self.options.layout.callback.close) {
                            self.options.layout.callback.close.apply(self);
                        }
                        
                        // callback user
                        self._trigger('afterClose', null, self._ui());
                        
                        // modal cleaning
                        if (self.options.modal) {
                            modalQueue.shift();
                            if (modalQueue.length) {
                                modalQueue[0].open();
                            } else {
                                $('#noty-modal-' + self.options.theme.name).hide();
                            }
                        }
                        
                        $animateSelector.remove();
                    }
                );
                
                return self;
            } catch (err) {
                if(err !== "error") {
                    if (self.options.debug) {
                        console.error("Error gg.notify : unknow error %s", err);
                    }
                }
                if (this._uiVersion < 1.9) {
                    return self.destroy();
                }
                return self._destroy();
            }
        },
        
        _create: function() {
            var self = this;
            var $this = this.element;
            $this.hide();
            var saveText = $this.html();
            try {
                self._index = getNextIndex();
                self._uiVersion = parseFloat($.ui.version);
                
                $this.html(
                    '<div class="noty-wrapper">' +
                        '<div class="noty-content">' + saveText + '</div>' +
                        '<div class="noty-close"></div>' +
                        '<div class="noty-buttons"></div>' +
                    '</div>'
                );
                
                self._$wrapper = $this.find('> .noty-wrapper');
                self._$content = self._$wrapper.find('> .noty-content');
                self._$close = self._$wrapper.find('> .noty-close');
                self._$buttons = self._$wrapper.find('> .noty-buttons');
                
                self._initLayout();
                self._initTheme();
                
                $this
                    .addClass('noty-block')
                    .addClass('noty-layout-' + self.options.layout.name)
                    .addClass('noty-type-' + self.options.type);
                
                if (self.options.text === '') {
                    self.options.text = saveText;
                } else {
                    self._$content.html(self.options.text);
                }
                
                self._initEvent();
                
                if (self.options.show) {
                    self.open();
                }
                
                return self;
            } catch (err) {
                if(err !== "error") {
                    if (self.options.debug) {
                        console.error("Error gg.notify : unknow error %s", err);
                    }
                }
                if (this._uiVersion < 1.9) {
                    return self.destroy();
                }
                return self._destroy();
            }
        },
        
        _ui: function() {
            return {
                index: this._index,
                content: this._$content
            };
        },
        
        _initTimeout: function (timeout) {
            var self = this;
            if (timeout === undefined){
                timeout = self.options.timeout; 
            }
            if (timeout) {
                self.element.delay(timeout).promise().done(function(){
                    self.close();
                });
            }
            return self;
        },
        
        _initLayout: function() {
            var self = this;
            
            if (!self.layouts[self.options.layout]) {
                if (self.options.debug) {
                    console.error("Error gg.notify : unknow layout %s", self.options.layout);
                }
                self.options.layout = 'inline';
            }
            
            self.options.layout = self.layouts[self.options.layout];
            
            if (self.options.layout.container.tag) {
                if (!$('#noty-container-' + self.options.layout.name).length) {
                    $('body').append(
                        '<' + self.options.layout.container.tag + ' id="noty-container-' + self.options.layout.name + '"></' + self.options.layout.container.tag + '>'
                    )
                    .find('#noty-container-' + self.options.layout.name).css(self.options.layout.container.css);
                    
                    if (self.options.layout.callback.initPlugin) {
                        self.options.layout.callback.initPlugin.apply(self);
                    }
                }
            } else {
                if (self.options.layout.callback.initPlugin) {
                    self.options.layout.callback.initPlugin.apply(self);
                }
            }
            
            if (self.options.layout.callback.initBlock) {
                self.options.layout.callback.initBlock.apply(self);
            }
            
            return self;
        },
        
        _initTheme: function() {
            var self = this;
            
            if (!self.themes[self.options.theme]) {
                if (self.options.debug) {
                    console.error("Error gg.notify : unknow theme %s", self.options.theme);
                }
                self.options.theme = 'base';
            }
            
            self.options.theme = self.themes[self.options.theme];
            
            if (!$('#noty-modal-' + self.options.theme.name).length) {
                $('body').append('<div id="noty-modal-' + self.options.theme.name + '" style="display:none;"></div>')
                         .find('#noty-modal-' + self.options.theme.name).css(self.options.theme.css.modal);
                if (self.options.theme.callback.initPlugin) {
                    self.options.theme.callback.initPlugin.apply(self);
                }
            }
            
            self.element.css(self.options.theme.css.block);
            self._$wrapper.css(self.options.theme.css.wrapper);
            self._$content.css(self.options.theme.css.content);
            if (self._$close && self._$close.length) {
                self._$close.css(self.options.theme.css.buttonClose);
            }
            self._$buttons.css(self.options.theme.css.buttons);
            
            if (self.options.theme.callback.initBlock) {
                self.options.theme.callback.initBlock.apply(self);
            }
            
            return self;
        },
        
        _initEvent: function() {
            var self = this;
            var $this = this.element;
            
            if ($.inArray('click', self.options.closeWith) > -1) {
                $this
                    .css('cursor', 'pointer')
                    .bind('click', function(){
                        self.close();
                    });
            }
            if ($.inArray('hover', self.options.closeWith) > -1) {
                $this.bind('mouseenter', function(){
                    self.close();
                });
            }
            if ($.inArray('button', self.options.closeWith) > -1) {
                self._$close.bind('click', function(){
                    self.close();
                });
            } else if ($.inArray('button', self.options.closeWith) === -1) {
                self._$close.remove();
            }
            
            return self;
        },
        
        _setOption: function(key, value) {
            var self = this;
            switch (key) {
                case 'theme':
                case 'layout':
                    if (!value) {
                        return this.options[key].name;
                    }
                    return this;
                case 'timeout':
                    if (value !== undefined) {
                        self._initTimeout(value);
                    }
                    break;
                case 'text':
                    if (value !== undefined) {
                        self.options.text = value;
                        self._$content.html(value);
                    }
                    break;
                case 'type':
                    if (value !== undefined) {
                        self.options.type = value;
                        if (self.options.theme.callback.initBlock) {
                            self.options.theme.callback.initBlock.apply(self);
                        }
                    }
                    break;
                default:
                    break;
            }
            
            if (this._uiVersion < 1.9) {
                $.Widget.prototype._setOption.apply(this, arguments);
            } else {
                this._super( "_setOption", key, value );
            }
        }
    });
    
    /**
     * Method call without HTML content
     * 
     * @param option
     * @return this
     * 
     * @since 1.0
     * @version 1.0
     * 
     */
    $.extend({
       notify: function(options) {
           var id = "noty-" + getNextNotyId();
           $('body').append('<div id="' + id + '"></div>');
           return $('#' + id).notify(options);
       }
    });
    
})( jQuery );
