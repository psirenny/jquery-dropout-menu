;(function ($, window, document, undefined) {
  var pluginName = "dropoutMenu";
  var defaults = {
    menu: '.dropout-menu',
    on: 'click',
    toggle: '.dropout-menu-toggle'
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      console.log(this.element);
    },
    yourOtherFunction: function () {
      // some logic
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);