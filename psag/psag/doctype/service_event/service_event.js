// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Service Event', {
	before_save: function(frm) {
		set_address_display(frm);
	},
	planned_start: function(frm) {
		set_default_end(frm);
	}
});

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function set_default_end(frm) {
	var start = frm.doc.planned_start;
	if (start) {
		var end = start.addHours(2);
		cur_frm.set_value('planned_end', end);
	}
}

function set_address_display(frm) {
	if (frm.doc.site_address) {
		frappe.call({
			'method': 'psag.psag.doctype.application_site.application_site.set_address_display',
			'args': {
				'address': frm.doc.site_address
			},
			'callback': function(response) {
				cur_frm.set_value('address_display', response.message);
			}
		});
	} else {
		cur_frm.set_value('address_display', "");
	}
}
