// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Maintenance Event', {
	before_save: function(frm) {
		set_address_display(frm);
	}
});

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
