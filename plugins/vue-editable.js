(function() {
	var VueEditable = {
		install: function(Vue) {
			Vue.prototype.$editable = function(e,callback) {
				var target=e.target,value=target.innerText;
				target.innerHTML = "<Input class='ivu-input' v-model='va' value='" + value + "' id='_editable' style='font-size:13px;color:red;text-align:center'></Input>";
				var input = document.getElementById('_editable');
				input.focus();
				var len = input.value.length;

				if (document.selection) {
					var sel = input.createTextRange();
					// sel.moveStart('character', len);
					sel.collapse();
					sel.select();
				}
				if(input.focus){
					input.select()
				}
				var action = function() {
					if (value != this.value && this.value != '') {
						target.innerHTML = this.value;
						callback(this.value)
					} else {
						target.innerHTML = value;
					}
					input.removeEventListener("blur", action, false);
				};
				input.addEventListener("blur", action, false);
			}
		}
	}

	if (typeof exports == "object") {
		module.exports = VueEditable;
	} else if (typeof define == "function" && define.amd) {
		define([], function() {
			return VueEditable;
		});
	} else if (window.Vue) {
		window.VueEditable = VueEditable;
		Vue.use(VueEditable);
	};
})();
