// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Service Event', {
	refresh: function(frm) {
		setTimeout(function(){
			if (frm.doc.__islocal && frm.doc.customer) {
				set_responsible(frm);
			}
		}, 500);
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

function set_responsible(frm) {
	frappe.call({
		'method': 'psag.psag.doctype.service_event.service_event.get_responsible',
		'args': {
			'customer': frm.doc.customer
		},
		'callback': function(response) {
			if (!frm.doc.responsible) {
				cur_frm.set_value('responsible', response.message);
			}
		}
	});
}
