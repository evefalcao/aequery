aeq.ui = (function (my) {
	my.Container = function(obj) {
		this.obj = obj;
	};

	my.Container.prototype = {
		get : function() {
			return this.obj;
		},

		set: function(options) {
			my.set(this.obj, options);
		},

		_add: function(type, options) {
		  if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1)) {
		    options = options.arg1;
				options.arg1 = options.text || options.items;
		  }

			var obj = this.obj.add(type, options.bounds, options.arg1, options.properties);
			my.set(obj, options);
			return obj;
		},

		addButton: function(arg1, onClick, properties) {
			return this._add('button', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addCheckbox: function(arg1, onClick, properties) {
			return this._add('checkbox', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addDropdownList: function(arg1, onChange, properties) {
			return this._add('dropdownlist', {
				arg1: arg1,
				properties: properties,
				onChange: onChange
			});
		},

		addEditText: function(arg1, onChange, onChanging, properties) {
			return this._add('edittext', {
				arg1: arg1,
				properties: properties,
				onChange: onChange,
				onChanging: onChanging
			});
		},

		addGroup: function(options) {
			var group = this.obj.add('group');
			group = new my.Container(group);
			if (options) {
				group.set(options);
			}
			return group;
		},

		addIconButton: function(arg1, onClick, properties) {
			var options = {
				arg1: arg1,
				onClick: onClick,
				properties: properties
			};
			if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1) &&
				!(options.arg1 instanceof File) && options.arg1.format === undefined) {
					// Check options.arg1.format to see if it is ScriptUIImage
				options = options.arg1;
				options.arg1 = options.image || undefined;
			}

			var obj = this.obj.add("iconbutton", options.bounds, options.arg1, options.properties);
			my.set(obj, options);
			return obj;
		},

		addListbox: function(arg1, onChange, onDoubleClick, properties) {
			return this._add('listbox', {
				arg1: arg1,
				properties: properties,
				onChange: onChange,
				onDoubleClick: onDoubleClick
			});
		},

		addPanel : function(arg1, properties) {
			var panel = this._add('panel', {
				arg1: arg1,
				properties: properties,
			});
			return new my.Container(panel);
		},

		addProgressbar: function(value, maxValue) {
			return this.obj.add('progressbar', undefined, value, maxValue);
		},

		addRadioButton: function(arg1, onClick, properties) {
			return this._add('radiobutton', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addScrollbar: function(value, maxValue, onChange, onChanging) {
			var scrollbar = this.obj.add('scrollbar', undefined, value, maxValue);
			scrollbar.onChange = onChange;
			scrollbar.onChanging = onChanging;
			return scrollbar;
		},

		addSlider: function(value, minValue, maxValue, onChange, onChanging) {
			var slider = this.obj.add('slider', undefined, value, minValue, maxValue);
			slider.onChange = onChange;
			slider.onChanging = onChanging;
			return slider;
		},

		addStatictext: function(arg1, properties) {
			return this._add('statictext', {
				arg1: arg1,
				properties: properties
			});
		},

		addTab: function(text) {
			var tab = this.obj.add('tab', undefined, text);
			return new my.Container(tab);
		},

		addTabbedPanel: function() {
			var tabbedpanel = this.obj.add('tabbedpanel');
			return new my.Container(tabbedpanel);
		},

		addTreeview: function(arg1, onChange, properties) {
			return this._add('treeview', {
				arg1: arg1,
				properties: properties,
				onChange: onChange
			});
		},
	};

	(function createControllerSetters() {
		var oneParameters = ['enabled', 'helpTip', 'orientation', 'text', 'visible'],
			twoParameters = [
				'alignChildren',
				'alignment',
				'location',
				'maximumSize',
				'minimumSize',
				'preferredSize',
				'size'
			],
			fourParameters = ['bounds', 'margins'];

		aeq.arrayEx(oneParameters).forEach(function(type) {
			my.Container.prototype[type] = function(newValue) {
				if ( newValue !== undefined ) {
					return this.obj[type];
				}
				this.obj[type] = newValue;
			};
		});

		function multiParameter(type, numParameters) {
			return function(newValue) {
				if ( newValue !== undefined ) {
					return this.obj[type];
				}
				newValue = arguments.length === numParameters ? Array.apply(null, arguments) : arguments[0];
				this.obj[type] = newValue;
			};
		}

		aeq.arrayEx(twoParameters).forEach(function(type) {
			my.Container.prototype[type] = multiParameter(type, 2);
		});

		aeq.arrayEx(fourParameters).forEach(function(type) {
			my.Container.prototype[type] = multiParameter(type, 4);
		});

	})();

	return my;
}(aeq.ui || {}));