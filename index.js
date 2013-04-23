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
    closeMenu: function (data) {
      if (!activeContext) return;
      var $context = $(activeContext);
      var options = data.options;
      $context.removeClass(options.contextActiveCssClass);
      $context.find(options.menu).removeClass(options.menuActiveCssClass);
      $context.find(options.toggle).removeClass(options.toggleActiveCssClass);
      activeContext = null;
    },
    init: function () {
      $(document).off('click.dropout-menu-context').on('click.dropout-menu-context', this.options.context, this, this.onToggleMenu);
      $(document).off('click.dropout-menu-html').on('click.dropout-menu-html', this, this.onCloseMenu);
    },
    onCloseMenu: function (event) {
      event.data.closeMenu(event.data);
    },
    onToggleMenu: function (event) {
      var context = event.currentTarget
      var found = false;

      $(context).find(event.data.options.toggle).each(function () {
        if (!$.contains(this, event.target)) return;
        found = true;
        return false;
      });

      if (!found) return;
      event.preventDefault();
      event.stopPropagation();

      if (context === activeContext) {
        event.data.closeMenu(event.data);
      } else {
        event.data.closeMenu(event.data);
        event.data.openMenu(context, event.data);
      }
    },
    openMenu: function (context, data) {
      var $context = $(context);
      var $menu = $context.find(data.options.menu);
      $context.addClass(data.options.contextActiveCssClass);
      $context.find(data.options.toggle).addClass(data.options.toggleActiveCssClass);
      $menu.addClass(data.options.menuActiveCssClass);
      activeContext = context;

      if (!($menu.offset().top > $(document).scrollTop() + $(window).height() / 2)) {
        $menu.css('bottom', -1 * $menu.height());
      } else {
        $menu.css('top', -1 * $menu.height());
      }

      if (!($menu.offset().left > $(document).scrollLeft() + $(window).width() / 2)) {
        $menu.css('left', 0);
      } else {
        $menu.css('right', 0);
      }
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