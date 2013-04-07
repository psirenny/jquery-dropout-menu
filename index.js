;(function ($, window, document, undefined) {
  var activeContext = null;
  var pluginName = 'dropoutMenu';
  var defaults = {
    context: '.dropout-context',
    contextActiveCssClass: 'active',
    menu: '.dropout-menu',
    menuActiveCssClass: 'active',
    toggle: '.dropout-toggle',
    toggleActiveCssClass: 'active'
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    closeMenu: function (context) {
      if (!activeContext) return;
      var $context = $(activeContext.element);
      $context.removeClass(activeContext.options.contextActiveCssClass);
      $context.find(activeContext.options.menu).removeClass(activeContext.options.menuActiveCssClass);
      $context.find(activeContext.options.toggle).removeClass(activeContext.options.toggleActiveCssClass);
      activeContext = null;
    },
    init: function () {
      $(this.element).on('click', this.options.toggle, this, this.onToggleMenu);
      $('html').on('click', this, this.onCloseMenu);
    },
    onCloseMenu: function (event) {
      event.data.closeMenu();
    },
    onToggleMenu: function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.data === activeContext) {
        event.data.closeMenu();
      } else {
        event.data.closeMenu();
        event.data.openMenu(event.data);
      }
    },
    openMenu: function (context) {
      var $context = $(context.element);
      $context.addClass(context.options.contextActiveCssClass);
      $context.find(context.options.menu).addClass(context.options.menuActiveCssClass);
      $context.find(context.options.toggle).addClass(context.options.toggleActiveCssClass);
      activeContext = context;
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);